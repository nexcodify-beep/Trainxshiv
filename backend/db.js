const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const INITIAL_DATA_FILE = path.join(__dirname, 'data', 'initialData.json');

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'trainxshiv_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool = null;
let isConnected = false;

function loadInitialSeed() {
  try {
    if (fs.existsSync(INITIAL_DATA_FILE)) {
      return JSON.parse(fs.readFileSync(INITIAL_DATA_FILE, 'utf-8'));
    }
  } catch (err) {
    console.error('Error reading initial seed data:', err.message);
  }
  return {};
}

async function initMySQL() {
  try {
    // 1. Try connecting without specifying database first to create database if not exists
    const rootConn = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
    });
    await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await rootConn.end();

    // 2. Create the connection pool with the target database
    pool = mysql.createPool(dbConfig);
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();

    isConnected = true;
    console.log(`✅ Connected to MySQL Database "${dbConfig.database}" at ${dbConfig.host}:${dbConfig.port}`);

    // 3. Create tables if they do not exist
    await createTables();

    // 4. Seed initial data if tables are empty
    await seedIfEmpty();

    return true;
  } catch (err) {
    isConnected = false;
    console.warn(`⚠️ MySQL Connection notice: ${err.message}`);
    console.warn(`💡 Backend is currently running in Standalone Fallback mode. When your MySQL service is started, it will connect automatically.`);
    return false;
  }
}

async function createTables() {
  if (!pool) return;
  const queries = [
    `CREATE TABLE IF NOT EXISTS \`site_settings\` (
      \`setting_key\` VARCHAR(64) PRIMARY KEY,
      \`setting_value\` JSON NOT NULL,
      \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`programs\` (
      \`id\` VARCHAR(64) PRIMARY KEY,
      \`cat\` VARCHAR(100),
      \`icon\` VARCHAR(50) DEFAULT 'Laptop',
      \`title\` VARCHAR(255) NOT NULL,
      \`tag\` TEXT,
      \`weeks\` VARCHAR(50),
      \`level\` VARCHAR(50),
      \`img\` VARCHAR(255),
      \`from_price\` INT DEFAULT 0,
      \`featured\` BOOLEAN DEFAULT TRUE,
      \`features\` JSON,
      \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`plans\` (
      \`id\` VARCHAR(64) PRIMARY KEY,
      \`name\` VARCHAR(100) NOT NULL,
      \`price\` INT DEFAULT 0,
      \`duration\` VARCHAR(50),
      \`workout\` BOOLEAN DEFAULT TRUE,
      \`diet\` BOOLEAN DEFAULT TRUE,
      \`support\` VARCHAR(100),
      \`tracking\` BOOLEAN DEFAULT TRUE,
      \`icon\` VARCHAR(50) DEFAULT 'Laptop',
      \`popular\` BOOLEAN DEFAULT FALSE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`paid_diets\` (
      \`id\` VARCHAR(64) PRIMARY KEY,
      \`name\` VARCHAR(100) NOT NULL,
      \`price\` INT DEFAULT 0,
      \`weeks\` VARCHAR(50),
      \`popular\` BOOLEAN DEFAULT FALSE,
      \`items\` JSON
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`trainers\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`name\` VARCHAR(100) NOT NULL,
      \`badge\` VARCHAR(100),
      \`badge_icon\` VARCHAR(50) DEFAULT 'Dumbbell',
      \`role\` VARCHAR(100),
      \`tags\` JSON,
      \`img\` VARCHAR(255),
      \`bio\` TEXT,
      \`is_head\` BOOLEAN DEFAULT FALSE,
      \`socials\` JSON
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`transforms\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`name\` VARCHAR(100) NOT NULL,
      \`goal\` VARCHAR(100),
      \`type\` VARCHAR(50) DEFAULT 'fat',
      \`result\` VARCHAR(50),
      \`period\` VARCHAR(50),
      \`image\` VARCHAR(255),
      \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`video_reviews\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`name\` VARCHAR(100) NOT NULL,
      \`result\` VARCHAR(100),
      \`poster\` VARCHAR(255),
      \`video\` VARCHAR(255),
      \`youtube\` VARCHAR(255) DEFAULT ''
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`testimonials\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`name\` VARCHAR(100) NOT NULL,
      \`rating\` INT DEFAULT 5,
      \`text\` TEXT NOT NULL,
      \`img\` VARCHAR(255)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`steps\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`icon\` VARCHAR(50) DEFAULT 'Target',
      \`t\` VARCHAR(100) NOT NULL,
      \`d\` TEXT NOT NULL,
      \`step_order\` INT DEFAULT 0
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`blogs\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`cat\` VARCHAR(50) DEFAULT 'Nutrition',
      \`title\` VARCHAR(255) NOT NULL,
      \`read_time\` VARCHAR(50) DEFAULT '4 min',
      \`published\` BOOLEAN DEFAULT TRUE,
      \`date\` VARCHAR(50) DEFAULT 'Oct 2026',
      \`body\` JSON,
      \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`faqs\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`q\` TEXT NOT NULL,
      \`a\` TEXT NOT NULL,
      \`faq_order\` INT DEFAULT 0
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`inquiries\` (
      \`id\` VARCHAR(64) PRIMARY KEY,
      \`name\` VARCHAR(100) NOT NULL,
      \`phone\` VARCHAR(50),
      \`email\` VARCHAR(100),
      \`goal\` VARCHAR(100),
      \`plan\` VARCHAR(100),
      \`notes\` TEXT,
      \`status\` VARCHAR(50) DEFAULT 'New',
      \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
  ];

  for (const q of queries) {
    await pool.query(q);
  }
}

async function seedIfEmpty() {
  if (!pool) return;
  const [rows] = await pool.query('SELECT COUNT(*) as count FROM `programs`');
  if (rows[0].count === 0) {
    console.log('🌱 Seeding initial website content into MySQL...');
    const seed = loadInitialSeed();
    await saveFullContentToMySQL(seed);
  }
}

async function saveFullContentToMySQL(data) {
  if (!pool) return false;
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // 1. Site Settings (brand, hero)
    if (data.brand) {
      await conn.query('REPLACE INTO `site_settings` (`setting_key`, `setting_value`) VALUES (?, ?)', ['brand', JSON.stringify(data.brand)]);
    }
    if (data.hero) {
      await conn.query('REPLACE INTO `site_settings` (`setting_key`, `setting_value`) VALUES (?, ?)', ['hero', JSON.stringify(data.hero)]);
    }

    // 2. Programs
    if (Array.isArray(data.programs)) {
      await conn.query('DELETE FROM `programs`');
      for (const p of data.programs) {
        await conn.query(
          'INSERT INTO `programs` (`id`, `cat`, `icon`, `title`, `tag`, `weeks`, `level`, `img`, `from_price`, `featured`, `features`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [p.id, p.cat, p.icon || 'Laptop', p.title, p.tag, p.weeks, p.level, p.img, p.from || p.from_price || 0, p.featured !== false, JSON.stringify(p.features || [])]
        );
      }
    }

    // 3. Plans
    if (Array.isArray(data.plans)) {
      await conn.query('DELETE FROM `plans`');
      for (const pl of data.plans) {
        await conn.query(
          'INSERT INTO `plans` (`id`, `name`, `price`, `duration`, `workout`, `diet`, `support`, `tracking`, `icon`, `popular`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [pl.id, pl.name, pl.price, pl.duration, !!pl.workout, !!pl.diet, pl.support, !!pl.tracking, pl.icon || 'Laptop', !!pl.popular]
        );
      }
    }

    // 4. Paid Diets
    if (Array.isArray(data.paidDiets)) {
      await conn.query('DELETE FROM `paid_diets`');
      for (const d of data.paidDiets) {
        await conn.query(
          'INSERT INTO `paid_diets` (`id`, `name`, `price`, `weeks`, `popular`, `items`) VALUES (?, ?, ?, ?, ?, ?)',
          [d.id, d.name, d.price, d.weeks, !!d.popular, JSON.stringify(d.items || [])]
        );
      }
    }

    // 5. Trainers (Head + Team)
    if (data.headTrainer || Array.isArray(data.teamTrainers)) {
      await conn.query('DELETE FROM `trainers`');
      if (data.headTrainer) {
        const ht = data.headTrainer;
        await conn.query(
          'INSERT INTO `trainers` (`id`, `name`, `badge`, `badge_icon`, `role`, `tags`, `img`, `bio`, `is_head`, `socials`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [1, ht.name, ht.badge, 'Crown', ht.role, JSON.stringify(ht.tags || []), ht.img, ht.bio, true, JSON.stringify(ht.socials || {})]
        );
      }
      if (Array.isArray(data.teamTrainers)) {
        for (const t of data.teamTrainers) {
          await conn.query(
            'INSERT INTO `trainers` (`id`, `name`, `badge`, `badge_icon`, `role`, `tags`, `img`, `bio`, `is_head`, `socials`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [t.id, t.name, t.badge, t.badgeIcon || 'Dumbbell', t.role, JSON.stringify(t.tags || []), t.img, t.bio, false, JSON.stringify(t.socials || {})]
          );
        }
      }
    }

    // 6. Transformations
    if (Array.isArray(data.transforms)) {
      await conn.query('DELETE FROM `transforms`');
      for (const tr of data.transforms) {
        await conn.query(
          'INSERT INTO `transforms` (`id`, `name`, `goal`, `type`, `result`, `period`, `image`) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [tr.id, tr.name, tr.goal, tr.type || 'fat', tr.result, tr.period, tr.image]
        );
      }
    }

    // 7. Video Reviews
    if (Array.isArray(data.videoReviews)) {
      await conn.query('DELETE FROM `video_reviews`');
      for (const v of data.videoReviews) {
        await conn.query(
          'INSERT INTO `video_reviews` (`id`, `name`, `result`, `poster`, `video`, `youtube`) VALUES (?, ?, ?, ?, ?, ?)',
          [v.id, v.name, v.result, v.poster, v.video, v.youtube || '']
        );
      }
    }

    // 8. Testimonials
    if (Array.isArray(data.testimonials)) {
      await conn.query('DELETE FROM `testimonials`');
      for (const t of data.testimonials) {
        await conn.query(
          'INSERT INTO `testimonials` (`id`, `name`, `rating`, `text`, `img`) VALUES (?, ?, ?, ?, ?)',
          [t.id || null, t.name, t.rating || 5, t.text, t.img]
        );
      }
    }

    // 9. Steps
    if (Array.isArray(data.steps)) {
      await conn.query('DELETE FROM `steps`');
      for (let i = 0; i < data.steps.length; i++) {
        const s = data.steps[i];
        await conn.query(
          'INSERT INTO `steps` (`icon`, `t`, `d`, `step_order`) VALUES (?, ?, ?, ?)',
          [s.icon, s.t, s.d, i]
        );
      }
    }

    // 10. Blogs
    if (Array.isArray(data.blog)) {
      await conn.query('DELETE FROM `blogs`');
      for (const b of data.blog) {
        await conn.query(
          'INSERT INTO `blogs` (`id`, `cat`, `title`, `read_time`, `published`, `date`, `body`) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [b.id, b.cat, b.title, b.read, b.published !== false, b.date || 'Oct 2026', JSON.stringify(b.body || [])]
        );
      }
    }

    // 11. FAQs
    if (Array.isArray(data.faq)) {
      await conn.query('DELETE FROM `faqs`');
      for (let i = 0; i < data.faq.length; i++) {
        const item = data.faq[i];
        const q = Array.isArray(item) ? item[0] : item.q;
        const a = Array.isArray(item) ? item[1] : item.a;
        await conn.query(
          'INSERT INTO `faqs` (`id`, `q`, `a`, `faq_order`) VALUES (?, ?, ?, ?)',
          [item.id || i + 1, q, a, i]
        );
      }
    }

    // 12. Inquiries
    if (Array.isArray(data.inquiries)) {
      for (const inq of data.inquiries) {
        await conn.query(
          'REPLACE INTO `inquiries` (`id`, `name`, `phone`, `email`, `goal`, `plan`, `notes`, `status`, `created_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [inq.id, inq.name, inq.phone || '', inq.email || '', inq.goal || '', inq.plan || '', inq.notes || '', inq.status || 'New', inq.createdAt ? new Date(inq.createdAt) : new Date()]
        );
      }
    }

    await conn.commit();
    return true;
  } catch (err) {
    await conn.rollback();
    console.error('Error saving content to MySQL:', err);
    throw err;
  } finally {
    conn.release();
  }
}

async function getFullContentFromMySQL() {
  if (!pool) return null;
  const conn = await pool.getConnection();
  try {
    // 1. Settings
    const [settingsRows] = await conn.query('SELECT `setting_key`, `setting_value` FROM `site_settings`');
    const settings = {};
    for (const r of settingsRows) {
      settings[r.setting_key] = typeof r.setting_value === 'string' ? JSON.parse(r.setting_value) : r.setting_value;
    }

    // 2. Programs
    const [programRows] = await conn.query('SELECT * FROM `programs`');
    const programs = programRows.map((p) => ({
      ...p,
      from: p.from_price,
      featured: !!p.featured,
      features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features || [],
    }));

    // 3. Plans
    const [planRows] = await conn.query('SELECT * FROM `plans`');
    const plans = planRows.map((pl) => ({
      ...pl,
      workout: !!pl.workout,
      diet: !!pl.diet,
      tracking: !!pl.tracking,
      popular: !!pl.popular,
    }));

    // 4. Paid Diets
    const [dietRows] = await conn.query('SELECT * FROM `paid_diets`');
    const paidDiets = dietRows.map((d) => ({
      ...d,
      popular: !!d.popular,
      items: typeof d.items === 'string' ? JSON.parse(d.items) : d.items || [],
    }));

    // 5. Trainers
    const [trainerRows] = await conn.query('SELECT * FROM `trainers`');
    let headTrainer = null;
    const teamTrainers = [];
    for (const t of trainerRows) {
      const parsedTrainer = {
        ...t,
        tags: typeof t.tags === 'string' ? JSON.parse(t.tags) : t.tags || [],
        socials: typeof t.socials === 'string' ? JSON.parse(t.socials) : t.socials || {},
        badgeIcon: t.badge_icon || 'Dumbbell',
      };
      if (t.is_head) {
        headTrainer = parsedTrainer;
      } else {
        teamTrainers.push(parsedTrainer);
      }
    }

    // 6. Transforms
    const [transforms] = await conn.query('SELECT * FROM `transforms` ORDER BY `id` ASC');

    // 7. Video Reviews
    const [videoReviews] = await conn.query('SELECT * FROM `video_reviews` ORDER BY `id` ASC');

    // 8. Testimonials
    const [testimonials] = await conn.query('SELECT * FROM `testimonials` ORDER BY `id` ASC');

    // 9. Steps
    const [stepRows] = await conn.query('SELECT `icon`, `t`, `d` FROM `steps` ORDER BY `step_order` ASC');

    // 10. Blogs
    const [blogRows] = await conn.query('SELECT * FROM `blogs` ORDER BY `id` DESC');
    const blog = blogRows.map((b) => ({
      id: b.id,
      cat: b.cat,
      title: b.title,
      read: b.read_time,
      published: !!b.published,
      date: b.date,
      body: typeof b.body === 'string' ? JSON.parse(b.body) : b.body || [],
    }));

    // 11. FAQs
    const [faqRows] = await conn.query('SELECT * FROM `faqs` ORDER BY `faq_order` ASC');
    const faq = faqRows.map((f) => ({ id: f.id, q: f.q, a: f.a }));

    // 12. Inquiries
    const [inquiryRows] = await conn.query('SELECT * FROM `inquiries` ORDER BY `created_at` DESC');
    const inquiries = inquiryRows.map((i) => ({
      ...i,
      createdAt: i.created_at,
    }));

    return {
      brand: settings.brand,
      hero: settings.hero,
      programs,
      plans,
      paidDiets,
      headTrainer: headTrainer || loadInitialSeed().headTrainer,
      teamTrainers,
      transforms,
      videoReviews,
      testimonials,
      steps: stepRows,
      blog,
      faq,
      inquiries,
    };
  } finally {
    conn.release();
  }
}

async function addInquiryMySQL(inq) {
  if (!pool) return false;
  await pool.query(
    'INSERT INTO `inquiries` (`id`, `name`, `phone`, `email`, `goal`, `plan`, `notes`, `status`, `created_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())',
    [inq.id, inq.name, inq.phone, inq.email, inq.goal, inq.plan, inq.notes, inq.status || 'New']
  );
  return true;
}

async function updateInquiryMySQL(id, fields) {
  if (!pool) return false;
  const updates = [];
  const values = [];
  for (const [k, v] of Object.entries(fields)) {
    if (['status', 'notes', 'name', 'phone', 'email', 'goal', 'plan'].includes(k)) {
      updates.push(`\`${k}\` = ?`);
      values.push(v);
    }
  }
  if (updates.length === 0) return false;
  values.push(id);
  await pool.query(`UPDATE \`inquiries\` SET ${updates.join(', ')} WHERE \`id\` = ?`, values);
  return true;
}

async function deleteInquiryMySQL(id) {
  if (!pool) return false;
  await pool.query('DELETE FROM `inquiries` WHERE `id` = ?', [id]);
  return true;
}

module.exports = {
  initMySQL,
  isMySQLConnected: () => isConnected,
  getFullContentFromMySQL,
  saveFullContentToMySQL,
  addInquiryMySQL,
  updateInquiryMySQL,
  deleteInquiryMySQL,
};

