import express from "express";
import pg from "pg";

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/visits", async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE IF NOT EXISTS visits (id SERIAL PRIMARY KEY, seen_at TIMESTAMPTZ DEFAULT now())"
    );
    await pool.query("INSERT INTO visits DEFAULT VALUES");
    const result = await pool.query("SELECT COUNT(*) FROM visits");
    res.json({ visits: Number(result.rows[0].count) });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
