import * as mongoose from 'mongoose';

export const PostsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  valid: {
    type: Boolean,
    default: false,
  },
});
