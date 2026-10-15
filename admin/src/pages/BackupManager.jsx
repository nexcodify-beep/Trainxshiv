import { useState } from 'react';
import { Database, Download, Upload, RotateCcw, CheckCircle, AlertTriangle } from 'lucide-react';
import { resetContent, checkBackendStatus } from '../api';

export default function BackupManager({ data, updateData, showToast, dbStatus = {}, setDbStatus }) {
  const [checking, setChecking] = useState(false);

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `trainxshiv_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Backup JSON downloaded successfully');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        updateData(parsed);
        showToast('Backup JSON imported successfully!');
      } catch (err) {
        alert('Invalid JSON file format');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = async () => {
    if (confirm('Are you sure you want to reset all content back to factory defaults? Any unsaved edits will be replaced.')) {
      const def = await resetContent();
      updateData(def);
      showToast('Reset to original website defaults');
    }
  };

  const handleCheckConnection = async () => {
    setChecking(true);
    const status = await checkBackendStatus();
    if (setDbStatus) setDbStatus(status);
    setChecking(false);
    if (status.mysqlConnected) {
      showToast('MySQL Database connected successfully!');
    } else if (status.online) {
      showToast('Backend online (Local Fallback mode)');
    } else {
      showToast('Backend is currently offline', 'error');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Data Backup &amp; Synchronization</h2>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Export, restore, or reset the website data and check API connection health
        </p>
      </div>

      <div className="grid-2">
        {/* Export / Backup */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">
              <Download size={20} color="var(--primary)" />
              Export Website Data
            </div>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
            Download a complete JSON snapshot of all programs, pricing, trainers, before/after stories, blog articles, and leads.
          </p>
          <button onClick={handleExport} className="btn btn-primary" style={{ width: '100%' }}>
            <Download size={16} />
            Download Full JSON Backup
          </button>
        </div>

        {/* Import / Restore */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">
              <Upload size={20} color="var(--primary)" />
              Import &amp; Restore
            </div>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
            Upload a previously exported backup file to restore your website configuration.
          </p>
          <label className="btn btn-secondary" style={{ width: '100%', cursor: 'pointer' }}>
            <Upload size={16} />
            Upload JSON File
            <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
          </label>
        </div>

        {/* Backend & MySQL Connectivity */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">
              <Database size={20} color="var(--primary)" />
              Database &amp; API Status
            </div>
            <span className={`badge ${dbStatus.mysqlConnected ? 'badge-green' : dbStatus.online ? 'badge-yellow' : 'badge-gray'}`}>
              {dbStatus.mysqlConnected ? '● MySQL Connected' : dbStatus.online ? '○ Local Fallback Store' : '✕ API Offline'}
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
            Database: <strong>{dbStatus.mysqlConnected ? 'MySQL (`trainxshiv_db`)' : 'Standalone File Store'}</strong>
            <br />
            API Server: <code>http://localhost:5000/api</code>
            <br />
            {dbStatus.mysqlConnected
              ? 'Changes sync directly to your relational MySQL database tables.'
              : 'When MySQL is started, all content will auto-sync with MySQL tables without data loss.'}
          </p>
          <button onClick={handleCheckConnection} disabled={checking} className="btn btn-secondary" style={{ width: '100%' }}>
            {checking ? 'Checking Connection...' : 'Test MySQL Connection'}
          </button>
        </div>

        {/* Reset to Factory Defaults */}
        <div className="admin-card" style={{ borderColor: '#fecaca' }}>
          <div className="admin-card-header">
            <div className="admin-card-title" style={{ color: 'var(--danger)' }}>
              <AlertTriangle size={20} />
              Reset to Original Defaults
            </div>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
            Reset all content (programs, trainers, before/after stories) back to the clean default seed data.
          </p>
          <button onClick={handleReset} className="btn btn-danger" style={{ width: '100%' }}>
            <RotateCcw size={16} />
            Reset to Default Content
          </button>
        </div>
      </div>
    </div>
  );
}

