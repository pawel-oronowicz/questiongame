import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import HomePage from './pages/HomePage';
import CreateLobby from './pages/CreateLobby';
import JoinLobby from './pages/JoinLobby';
import LobbyPage from './pages/LobbyPage';
import LobbyJoinPage from './pages/LobbyJoinPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/create-lobby" element={<CreateLobby />} />
          <Route path="/join-lobby" element={<JoinLobby />} />
          <Route path="/lobby/:lobbyId" element={<LobbyPage />} />
          <Route path="/lobby/:lobbyId/join" element={<LobbyJoinPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
  
export default App;