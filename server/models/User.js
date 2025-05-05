import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  lobbyId: {
    type: String,
    required: true
  },
  isCreator: {
    type: Boolean
  },
  token: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true })

export default mongoose.model('User', UserSchema);