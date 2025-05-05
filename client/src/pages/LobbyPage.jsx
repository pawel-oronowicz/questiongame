import { useEffect, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";
import lobbyService from '../services/lobbyService';

const LobbyPage = () => {
  const location = useLocation();
  const { userName, isCreator } = location.state || {};
  const { lobbyId } = useParams();
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
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </>
  )
};

export default LobbyPage;