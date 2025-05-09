import Lobby from '../models/Lobby.js';
import Question from '../models/Question.js';
import Challenge from '../models/Challenge.js';
import User from '../models/User.js';

export const createLobby = async (req, res) => {
  try {
    const { lobbyId, name, pin, username, token } = req.body;

    // Sprawdź, czy lobby o takim ID już istnieje
    const existingLobby = await Lobby.findOne({ lobbyId });
    if (existingLobby) {
      return res.status(400).json({ error: 'Lobby ID already exists' });
    }

    // Stwórz nowego użytkownika
    const user = new User({
      username,
      lobbyId,
      isCreator: true,
      token
    });
    await user.save();

    // Stwórz lobby z tym użytkownikiem
    const lobby = new Lobby({
      lobbyId,
      name,
      pin,
      users: [user._id]
    });
    await lobby.save();

    res.status(201).json({ message: 'Lobby created successfully', lobbyId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const joinLobby = async (req, res) => {
  try {
    const { lobbyId, pin, username, token } = req.body;

    // Sprawdź, czy lobby o takim ID już istnieje
    const lobby = await Lobby.findOne({ lobbyId });
    if (!lobby) {
      return res.status(404).json({ error: 'Lobby ID does not exist' });
    }

    // Sprawdź czy PIN jest ok
    if(lobby.pin !== pin) {
      return res.status(401).json({ error: 'PIN is invalid' });
    }

    // Sprawdź czy ten użytkownik już istnieje w lobby
    const usernameExists = await User.findOne({ lobbyId, username });
    if(usernameExists) {
      return res.status(409).json({ error: 'This username is already taken in this lobby' });
    }

    // Stwórz nowego użytkownika
    const user = new User({
      username,
      lobbyId,
      isCreator: false,
      token
    });
    await user.save();

    lobby.users.push(user._id);
    await lobby.save();

    res.status(200).json({
      message: 'Joined lobby successfully',
      userId: user._id,
      isCreator: false
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getLobby = async (req, res) => {
  try {
    const { lobbyId } = req.params;
    
    // Sprawdź, czy lobby o takim ID już istnieje
    const lobby = await Lobby.findOne({ lobbyId }).populate('users');
    if (!lobby) {
      return res.status(400).json({ error: 'Lobby ID does not exist' });
    }

    res.status(200).json({
      lobbyId: lobby.lobbyId,
      name: lobby.name,
      users: lobby.users, // pełne dane użytkowników dzięki populate
      createdAt: lobby.createdAt
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const addQuestion = async (req, res) => {
  try {
    const { text, lobbyId } = req.body;

    const question = new Question({
      text,
      lobbyId
    });
    await question.save();

    res.status(200).json({
      message: 'Question added successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addChallenge = async (req, res) => {
  try {
    const { text, lobbyId, weight } = req.body;

    const challenge = new Challenge({
      text,
      lobbyId,
      weight
    });
    await challenge.save();

    res.status(200).json({
      message: 'Challenge added successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const { lobbyId } = req.params;
    const questions = await Question.find({ lobbyId }).exec();

    res.status(200).json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const getChallenges = async (req, res) => {
  try {
    const { lobbyId } = req.params;
    const challenges = await Challenge.find({ lobbyId }).exec();
    
    res.status(200).json(challenges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}