import axios from 'axios';
const baseUrl = import.meta.env.VITE_BACKEND_URL;

const getLobby = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
}

const createLobby = async (newLobby) => {
  const response = await axios.post(`${baseUrl}/create`, newLobby);
  return response.data;
}

const joinLobby = async ({ lobbyId, pin, username, token }) => {
  const response = await axios.post(`${baseUrl}/join`, { lobbyId, pin, username, token });
  return response.data;
}

const verifyToken = async ({ lobbyId, token }) => {
  const response = await axios.post(`${baseUrl}/verify`, { lobbyId, token });
  return response.data;
};

const addQuestion = async ({ text, lobbyId }) => {
  const response = await axios.post(`${baseUrl}/add-question`, { text, lobbyId });
  return response.data;
}

const addChallenge = async ({ text, weight, lobbyId }) => {
  const response = await axios.post(`${baseUrl}/add-challenge`, { text, weight, lobbyId });
  return response.data;
}

const getQuestions = async(lobbyId) => {
  const response = await axios.get(`${baseUrl}/get-questions/${lobbyId}`);
  return response.data;
}

const getChallenges = async(lobbyId) => {
  const response = await axios.get(`${baseUrl}/get-challenges/${lobbyId}`);
  return response.data;
}

export default { getLobby, createLobby, joinLobby, verifyToken, addQuestion, addChallenge, getQuestions, getChallenges }