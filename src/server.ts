import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(process.cwd(), "data");
const STARTUP_LOG = path.join(DATA_DIR, "started.txt");

app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(STARTUP_LOG, `started at ${new Date().toISOString()}\n`, { flag: "a" });
  console.log(`listening on ${PORT}`);
});
