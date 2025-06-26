// WYN Remnants backend (scaffolding)
// Basic Express server that will later proxy Firebase Admin SDK requests.

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ status: 'WYN Remnants backend running' });
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
