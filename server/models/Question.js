import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  lobbyId: { 
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Question', QuestionSchema);