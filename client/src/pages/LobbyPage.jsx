import { useEffect, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";
import lobbyService from '../services/lobbyService';
import Notification from '../components/Notification';
import getWeightedRandomChallenge from '../utils/getWeightedRandomChallenge';

const LobbyPage = () => {
  const location = useLocation();
  const { userName, isCreator } = location.state || {};
  const { lobbyId } = useParams();
  const [lobby, setLobby] = useState(null);
  const [question, setQuestion] = useState('');
  const [challenge, setChallenge] = useState('');
  const [weight, setWeight] = useState('');
  const [notification, setNotification] = useState({});
  const [questions, setQuestions] = useState([]);
  let [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [challenges, setChallenges] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [gameInProgress, setGameInProgress] = useState(false);

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

    let errors = [];

    if(challenge.trim() === '') {
      errors.push('Zadanie nie może być puste.');
    }

    if(errors.length > 0) {
      setNotification({
        'message': errors.join(' '),
        'type': 'error'
      })
    } else {
      setNotification();

      const challengeData = {
        text: challenge.trim(),
        lobbyId,
        weight
      };

      lobbyService
      .addChallenge(challengeData)
      .then(() => {
        setNotification({
          'message': 'Zadanie dodane pomyślnie',
          'type': 'success'
        })
        setTimeout(() => {
          setNotification({})
        }, 5000)
        setChallenge('');
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

  const startGame = async () => {
    setCurrentQuestionIndex(0);
    const questions = await lobbyService.getQuestions(lobbyId);
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);

    const challenges = await lobbyService.getChallenges(lobbyId);
    setChallenges(challenges);

    setGameInProgress(true);
  }

  const nextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
  }

  const drawChallenge = () => {
    const challenge = getWeightedRandomChallenge(challenges);
    setCurrentChallenge(challenge);
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

      <button onClick={startGame}>Start</button>
      {gameInProgress && questions.length > 0 && (
        <>
          <div>
            Pytanie: {questions[currentQuestionIndex]?.text}
          </div>
          <button onClick={nextQuestion}>Następne pytanie</button>
          <div>
            Zadanie: {currentChallenge?.text}
          </div>
          <button onClick={drawChallenge}>Wylosuj zadanie</button>
        </>
      )}

    </>
  )
};

export default LobbyPage;