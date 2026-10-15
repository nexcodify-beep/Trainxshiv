const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const {
  initMySQL,
  isMySQLConnected,
  getFullContentFromMySQL,
  saveFullContentToMySQL,
  addInquiryMySQL,
  updateInquiryMySQL,
  deleteInquiryMySQL,
} = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'content.json');
const INITIAL_DATA_FILE = path.join(DATA_DIR, 'initialData.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadFileContent() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch (err) {
    console.error('Error reading fallback file:', err.message);
  }
  if (fs.existsSync(INITIAL_DATA_FILE)) {
    const raw = fs.readFileSync(INITIAL_DATA_FILE, 'utf-8');
    fs.writeFileSync(DATA_FILE, raw);
    return JSON.parse(raw);
  }
  return {};
}

function saveFileContent(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing file backup:', err.message);
  }
}

// Health check with DB status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'TrainXShiv API',
    database: isMySQLConnected() ? 'MySQL' : 'Local Fallback',
    mysqlConnected: isMySQLConnected(),
    dbHost: process.env.DB_HOST || '127.0.0.1',
    dbName: process.env.DB_NAME || 'trainxshiv_db',
    time: new Date().toISOString(),
  });
});

// GET all content
app.get('/api/content', async (req, res) => {
  try {
    if (isMySQLConnected()) {
      const dbData = await getFullContentFromMySQL();
      if (dbData) {
        saveFileContent(dbData); // Keep local backup in sync
        return res.json({ success: true, source: 'mysql', data: dbData });
      }
    }
  } catch (err) {
    console.warn('MySQL read failed, serving from fallback:', err.message);
  }

  const local = loadFileContent();
  res.json({ success: true, source: 'local', data: local });
});

// PUT full content
app.put('/api/content', async (req, res) => {
  const payload = req.body;
  let savedToMySQL = false;

  try {
    if (isMySQLConnected()) {
      await saveFullContentToMySQL(payload);
      savedToMySQL = true;
    }
  } catch (err) {
    console.error('Failed to save to MySQL:', err.message);
  }

  saveFileContent(payload);

  res.json({
    success: true,
    message: savedToMySQL ? 'Content saved to MySQL Database' : 'Content saved to local fallback',
    source: savedToMySQL ? 'mysql' : 'local',
    data: payload,
  });
});

// GET inquiries / leads
app.get('/api/inquiries', async (req, res) => {
  try {
    if (isMySQLConnected()) {
      const dbData = await getFullContentFromMySQL();
      if (dbData && dbData.inquiries) {
        return res.json({ success: true, source: 'mysql', data: dbData.inquiries });
      }
    }
  } catch (err) {
    console.warn('Failed to fetch inquiries from MySQL:', err.message);
  }

  const local = loadFileContent();
  res.json({ success: true, source: 'local', data: local.inquiries || [] });
});

// POST new inquiry
app.post('/api/inquiries', async (req, res) => {
  const newInquiry = {
    id: 'INQ-' + Date.now().toString().slice(-5),
    name: req.body.name || 'Anonymous',
    phone: req.body.phone || '',
    email: req.body.email || '',
    goal: req.body.goal || 'General Fitness',
    plan: req.body.plan || 'Online Coaching',
    notes: req.body.notes || '',
    status: 'New',
    createdAt: new Date().toISOString(),
  };

  try {
    if (isMySQLConnected()) {
      await addInquiryMySQL(newInquiry);
    }
  } catch (err) {
    console.error('Failed to insert inquiry to MySQL:', err.message);
  }

  // Also update file backup
  const local = loadFileContent();
  local.inquiries = local.inquiries || [];
  local.inquiries.unshift(newInquiry);
  saveFileContent(local);

  res.status(201).json({ success: true, message: 'Inquiry received', data: newInquiry });
});

// PATCH inquiry status or notes
app.patch('/api/inquiries/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (isMySQLConnected()) {
      await updateInquiryMySQL(id, req.body);
    }
  } catch (err) {
    console.error('Failed to update inquiry in MySQL:', err.message);
  }

  const local = loadFileContent();
  const inquiries = local.inquiries || [];
  const idx = inquiries.findIndex((i) => i.id === id);
  if (idx !== -1) {
    inquiries[idx] = { ...inquiries[idx], ...req.body, updatedAt: new Date().toISOString() };
    local.inquiries = inquiries;
    saveFileContent(local);
  }

  res.json({ success: true, message: 'Inquiry updated' });
});

// DELETE inquiry
app.delete('/api/inquiries/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (isMySQLConnected()) {
      await deleteInquiryMySQL(id);
    }
  } catch (err) {
    console.error('Failed to delete inquiry from MySQL:', err.message);
  }

  const local = loadFileContent();
  local.inquiries = (local.inquiries || []).filter((i) => i.id !== id);
  saveFileContent(local);

  res.json({ success: true, message: 'Inquiry deleted' });
});

// Reset to factory defaults
app.post('/api/reset', async (req, res) => {
  if (fs.existsSync(INITIAL_DATA_FILE)) {
    const raw = fs.readFileSync(INITIAL_DATA_FILE, 'utf-8');
    const initial = JSON.parse(raw);

    try {
      if (isMySQLConnected()) {
        await saveFullContentToMySQL(initial);
      }
    } catch (err) {
      console.error('Failed to reset MySQL data:', err.message);
    }

    saveFileContent(initial);
    res.json({ success: true, message: 'Content reset to default settings', data: initial });
  } else {
    res.status(500).json({ success: false, message: 'Initial seed file missing' });
  }
});

// Stats summary
app.get('/api/stats', async (req, res) => {
  let content = loadFileContent();
  if (isMySQLConnected()) {
    try {
      const dbContent = await getFullContentFromMySQL();
      if (dbContent) content = dbContent;
    } catch {}
  }

  res.json({
    success: true,
    data: {
      database: isMySQLConnected() ? 'MySQL' : 'Local Fallback',
      totalPrograms: content.programs?.length || 0,
      totalTrainers: (content.teamTrainers?.length || 0) + 1,
      totalTransforms: content.transforms?.length || 0,
      totalTestimonials: content.testimonials?.length || 0,
      totalBlogs: content.blog?.length || 0,
      totalInquiries: content.inquiries?.length || 0,
      newInquiries: (content.inquiries || []).filter((i) => i.status === 'New').length,
    },
  });
});

app.listen(PORT, async () => {
  console.log(`🚀 TrainXShiv Backend running on http://localhost:${PORT}`);
  // Attempt MySQL initialization
  await initMySQL();
});
