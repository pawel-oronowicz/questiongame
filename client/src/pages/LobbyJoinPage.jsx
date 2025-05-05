import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import lobbyService from '../services/lobbyService';

const LobbyJoinPage = () => {
  const { lobbyId } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const userData = await lobbyService.verifyToken({ lobbyId, token });

        localStorage.setItem('userName', userData.username);
        localStorage.setItem('lobbyId', lobbyId);
        localStorage.setItem('userToken', token);

        navigate('/lobby/' + lobbyId, { state: { lobbyId, userName: userData.username, isCreator: userData.isCreator } });
      } catch (err) {
        console.error(err);
        setError('Nieprawidłowy link lub wygasły token.');
        setLoading(false);
      }
    };

    if (lobbyId && token) verifyUser();
    else setError('Brak wymaganych danych w linku.');
  }, [lobbyId, token, navigate]);

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>{error}</div>;

  return null;
}

export default LobbyJoinPage;