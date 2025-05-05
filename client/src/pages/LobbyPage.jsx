import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import lobbyService from '../services/lobbyService';

const LobbyPage = () => {
  const location = useLocation();
  const { lobbyId, userName, isCreator } = location.state || {};
  const [lobby, setLobby] = useState(null);
  
  useEffect(() => {
    if(lobbyId) {
      lobbyService.getLobby(lobbyId).then(data => setLobby(data));
    }
  }, [lobbyId]);

  if (!lobby) return <div>Ładowanie...</div>;

  return (
    <>
      <h1>Lobby {lobby.name}</h1>
      <div>ID: {lobby.lobbyId}</div>
      <div>Twój nick: {userName}</div>
      <div>Gospodarz: {isCreator ? 'Tak' : 'Nie'}</div>
      <h2>Uczestnicy:</h2>
      <ul>
        {lobby.users.map(user => (
          <li key={user.id}>{user.userName}</li>
        ))}
      </ul>
    </>
  )
};

export default LobbyPage;