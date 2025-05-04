import mongoose from 'mongoose';

const LobbySchema = new mongoose.Schema({
  lobbyId: { 
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  pin: {
    type: String,
    length: 6,
    required: true
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: User}]
}, { timestamps: true });

export default mongoose.model('Lobby', LobbySchema);