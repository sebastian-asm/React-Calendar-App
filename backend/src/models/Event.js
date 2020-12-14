import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  start: {
    type: Date,
    trim: true,
    required: true,
  },
  end: {
    type: Date,
    trim: true,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Event = mongoose.model('Event', EventSchema);

export default Event;
