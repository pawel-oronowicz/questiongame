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

const joinLobby = async ({lobbyId, pin, username}) => {
  const response = await axios.post(`${baseUrl}/join`, { lobbyId, pin, username });
  return response.data;
}

export default { getLobby, createLobby, joinLobby }