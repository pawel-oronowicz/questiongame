import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Notification from '../components/Notification';
import generateLobbyId from '../utils/generateLobbyId';
import lobbyService from '../services/lobbyService';

const CreateLobby = () => {
  const [lobbyName, setLobbyName] = useState('');
  const [pin, setPin] = useState('');
  const [userName, setUserName] = useState('');
  const [notification, setNotification] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = [];

    if(lobbyName.trim() === '') {
      errors.push('Nazwa lobby jest wymagana.');
    }

    const isValidPin = /^\d{6}$/.test(pin.trim());
    if(pin.trim() === '') {
      errors.push('PIN jest wymagany.');
    } else if(!isValidPin) {
      errors.push('PIN musi być 6-cyfrowy.');
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
      const lobbyId = generateLobbyId();

      const lobbyData = {
        lobbyId,
        name: lobbyName.trim(),
        pin: pin.trim(),
        username: userName.trim()
      };

      lobbyService
      .createLobby(lobbyData)
      .then(() => { 
        navigate('/lobby-page', { state: { lobbyId, userName, isCreator: true } }) 
      });
    }
  };

  return <>
    <h1>Utwórz nowe lobby</h1>
    <Notification notification={notification} />
    <form onSubmit={handleSubmit}>
      <div>Nazwa lobby: <input type="text" value={lobbyName} onChange={(e) => setLobbyName(e.target.value)} placeholder="Nazwa twojego lobby" required /></div>
      <div>PIN (hasło): <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="PIN do dołączenia do lobby" required /></div>
      <div>Twój nick: <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Twój nick" required /></div>
      <div>
        <button type="submit">Utwórz</button>
      </div>
    </form>
  </>;
};
  
export default CreateLobby;