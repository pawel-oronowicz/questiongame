import { useLocation } from "react-router-dom";

const LobbyPage = () => {
  const location = useLocation();
  const { lobbyId, userName, isCreator } = location.state || {};

  return <>
    <h1>Lobby nazwa</h1>
    <div>ID: {lobbyId}</div>
    <div>Twój nick: {userName}</div>
    <div>Gospodarz: {isCreator}</div>
  </>
};

export default LobbyPage;