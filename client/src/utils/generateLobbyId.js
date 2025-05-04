const generateLobbyId = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // bez O, 0, I, l
    let id = '';
    for (let i = 0; i < 8; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

export default generateLobbyId;