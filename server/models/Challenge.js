import mongoose from 'mongoose';

const ChallengeSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  lobbyId: { 
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true,
    default: 5
  }
}, { timestamps: true });

export default mongoose.model('Challenge', ChallengeSchema);