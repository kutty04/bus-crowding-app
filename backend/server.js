const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.query('SELECT NOW()', (err, result) => {
  if (err) console.error('Database connection failed:', err);
  else console.log('Database connected:', result.rows[0]);
});

// ✅ ROOT ROUTE (for browser test)
app.get('/', (req, res) => {
  res.send('Bus Crowding Backend Running 🚀');
});

// ✅ PING ROUTE (for cron / uptime)
app.get('/ping', (req, res) => {
  res.status(200).send('alive');
});

// ✅ HEALTH CHECK (API style)
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// POST: Submit crowding report
app.post('/api/reports', async (req, res) => {
  try {
    const { busRoute, crowdingLevel, boardingStop, justLeft, reporterName } = req.body;

    if (!busRoute) {
      return res.status(400).json({ error: 'Missing bus route' });
    }

    const query = `
      INSERT INTO crowding_reports 
      (bus_route, crowding_level, boarding_stop, just_left, reporter_name, helpful_count, timestamp)
      VALUES ($1, $2, $3, $4, $5, 0, NOW())
      RETURNING *;
    `;

    const result = await pool.query(query, [
      busRoute,
      justLeft ? 0 : crowdingLevel,
      boardingStop || null,
      justLeft ? true : false,
      reporterName ? reporterName.trim().slice(0, 50) : 'Anonymous',
    ]);

    res.json({ success: true, report: result.rows[0] });
  } catch (error) {
    console.error('Error inserting report:', error);
    res.status(500).json({ error: 'Failed to submit report' });
  }
});

// GET: Fetch reports for a route
app.get('/api/reports/:busRoute', async (req, res) => {
  try {
    const { busRoute } = req.params;

    const query = `
      SELECT * FROM crowding_reports
      WHERE bus_route = $1
        AND timestamp > NOW() - INTERVAL '30 minutes'
      ORDER BY timestamp DESC
      LIMIT 10;
    `;

    const result = await pool.query(query, [busRoute]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// POST: Mark report as helpful
app.post('/api/reports/:id/helpful', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`
      UPDATE crowding_reports
      SET helpful_count = helpful_count + 1
      WHERE id = $1
      RETURNING helpful_count;
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json({
      success: true,
      helpful_count: result.rows[0].helpful_count
    });
  } catch (error) {
    console.error('Error updating helpful count:', error);
    res.status(500).json({ error: 'Failed to update' });
  }
});

// GET: Admin — fetch all reports (last 24 hours)
app.get('/api/admin/reports', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM crowding_reports
      WHERE timestamp > NOW() - INTERVAL '24 hours'
      ORDER BY timestamp DESC
      LIMIT 200;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Admin fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

// 🧹 Auto-delete reports older than 1 hour — runs every 30 mins
setInterval(async () => {
  try {
    const result = await pool.query(`DELETE FROM crowding_reports WHERE timestamp < NOW() - INTERVAL '1 hour'`);
    console.log(`Cleanup: deleted ${result.rowCount} old reports`);
  } catch (e) {
    console.error('Cleanup failed:', e);
  }
}, 30 * 60 * 1000);

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));