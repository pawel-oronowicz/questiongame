import express from 'express';
import {
  createLobby,
  joinLobby,
  getLobby,
  addQuestion,
  addChallenge
} from '../controllers/lobbyController.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/create', createLobby);
router.post('/join', joinLobby);
router.get('/:lobbyId', getLobby);
router.post('/verify', async (req, res) => {
  const { lobbyId, token } = req.body;

  try {
    const user = await User.findOne({ lobbyId, token });
    if (!user) return res.status(404).json({ error: 'Użytkownik nie znaleziony' });

    res.json({
      username: user.username,
      isCreator: user.isCreator
    });
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera' });
  }
});
router.post('/add-question', addQuestion);
router.post('/add-challenge', addChallenge);

export default router;