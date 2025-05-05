import express from 'express';
import {
  createLobby,
  joinLobby,
  getLobby
} from '../controllers/lobbyController.js';
import Lobby from '../models/Lobby.js';

const router = express.Router();

router.post('/create', createLobby);
router.post('/join', joinLobby);
router.get('/:lobbyId', getLobby);

export default router;