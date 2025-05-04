import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Notification from '../components/Notification';

const JoinLobby = () => {
  const [lobbyId, setLobbyId] = useState('');
  const [pin, setPin] = useState('');
  const [userName, setUserName] = useState('');
  const [notification, setNotification] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = [];

    if(lobbyId.trim() === '') {
      errors.push('Lobby ID jest wymagane.');
    }

    const isValidPin = /^\d{6}$/.test(pin.trim());
    if(pin.trim() === '') {
      errors.push('PIN jest wymagany.');
    } else if(!isValidPin) {
      errors.push('PIN musi być 6-cyfrowy.');
    }

    const storedLobby = localStorage.getItem(lobbyId.trim());
    if (!storedLobby) {
      errors.push("Lobby ID jest błędne.");
    } else {
      const parsedLobby = JSON.parse(storedLobby);
      if (pin.trim() !== parsedLobby.pin) {
        errors.push("Nieprawidłowy PIN.");
      }
    }

    if(userName.trim() === '') {
      errors.push('Nickname jest wymagany.');
    }

    if(errors.length > 0) {
      setNotification({
        'message': errors.join(' '),
        'type': 'error'
      })
    } else {
      setNotification();
      navigate('/lobby-page', { state: { lobbyId, userName, isCreator: false } });
    }
  };

  return <>
    <h1>Dołącz do lobby</h1>
    <Notification notification={notification} />
    <form onSubmit={handleSubmit}>
      <div>Lobby ID: <input type="text" value={lobbyId} onChange={(e) => setLobbyId(e.target.value)} placeholder="Lobby ID" required /></div>
      <div>PIN (hasło): <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="PIN do dołączenia do lobby" required /></div>
      <div>Twój nick: <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Twój nick" required /></div>
      <div>
        <button type="submit">Dołącz</button>
      </div>
    </form>
  </>;
};
  
export default JoinLobby;