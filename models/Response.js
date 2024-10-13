/
import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  summary: {
    type: String,
    required: true,
  },
  result_text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
});

const Response = mongoose.model('Response', responseSchema);
export default Response;
