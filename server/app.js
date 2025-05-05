import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import lobbyRoutes from './routes/lobby.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/lobbies', lobbyRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3001, () => console.log('Server running on port 3001'));
  })
  .catch(err => console.error(err));
