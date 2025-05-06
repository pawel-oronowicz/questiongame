import { useEffect, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";
import lobbyService from '../services/lobbyService';
import Notification from '../components/Notification';

const LobbyPage = () => {
  const location = useLocation();
  const { userName, isCreator } = location.state || {};
  const { lobbyId } = useParams();
  const [lobby, setLobby] = useState(null);
  const [question, setQuestion] = useState('');
  const [challenge, setChallenge] = useState('');
  const [weight, setWeight] = useState('');
  const [notification, setNotification] = useState({});

  const handleSubmitQuestion = (e) => {
    e.preventDefault();

    let errors = [];

    if(question.trim() === '') {
      errors.push('Pytanie nie może być puste.');
    }

    if(errors.length > 0) {
      setNotification({
        'message': errors.join(' '),
        'type': 'error'
      })
    } else {
      setNotification();

      const questionData = {
        text: question.trim(),
        lobbyId
      };

      lobbyService
      .addQuestion(questionData)
      .then(() => {
        setNotification({
          'message': 'Pytanie dodane pomyślnie',
          'type': 'success'
        })
        setTimeout(() => {
          setNotification({})
        }, 5000)
        setQuestion('');
      })
      .catch((err) => {
        console.error(err)
        setNotification({
          'message': err.response.data.error,
          'type': 'error'
        })
      });
    }
  }

  const handleSubmitChallenge = (e) => {
    e.preventDefault();
  }
  
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
      <Notification notification={notification} />
      <h2>Dodaj pytanie:</h2>
      <form onSubmit={handleSubmitQuestion}>
        <div>Treść: <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Treść pytania" required /></div>
        <div>
          <button type="submit">Dodaj</button>
        </div>
      </form>

      <h2>Dodaj zadanie:</h2>
      <form onSubmit={handleSubmitChallenge}>
        <div>Treść: <input type="text" value={challenge} onChange={(e) => setChallenge(e.target.value)} placeholder="Treść zadania" required /></div>
        <div>Prawdopodobieństwo: <input type="range" value={weight} min="1" max="10" onChange={(e) => setWeight(e.target.value)} /> <span>{weight}</span></div>
        <div>
          <button type="submit">Dodaj</button>
        </div>
      </form>
    </>
  )
};

export default LobbyPage;