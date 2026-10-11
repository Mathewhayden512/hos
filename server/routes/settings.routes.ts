import { Router } from 'express';
import { queryAll, runExecute } from '../db/database.js';

const router = Router();

// GET /api/settings
router.get('/', async (req, res) => {
  try {
    const rows = await queryAll('SELECT setting_key, setting_value FROM website_settings');
    const settings: Record<string, string> = {};
    for (const r of rows) {
      settings[r.setting_key] = r.setting_value;
    }
    res.json(settings);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/settings (Admin Save Settings)
router.post('/', async (req, res) => {
  try {
    const settingsObj = req.body;
    if (typeof settingsObj !== 'object') {
      return res.status(400).json({ error: 'Payload must be an object of key-value settings' });
    }

    for (const [key, val] of Object.entries(settingsObj)) {
      const stringVal = String(val);
      const existing = await queryAll('SELECT setting_key FROM website_settings WHERE setting_key = ?', [key]);
      if (existing.length > 0) {
        await runExecute('UPDATE website_settings SET setting_value = ? WHERE setting_key = ?', [stringVal, key]);
      } else {
        await runExecute('INSERT INTO website_settings (setting_key, setting_value) VALUES (?, ?)', [key, stringVal]);
      }
    }

    const rows = await queryAll('SELECT setting_key, setting_value FROM website_settings');
    const updatedSettings: Record<string, string> = {};
    for (const r of rows) {
      updatedSettings[r.setting_key] = r.setting_value;
    }

    res.json(updatedSettings);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
