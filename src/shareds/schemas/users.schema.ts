import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  setup: {
    type: Boolean,
    required: false,
    default: false,
  },
});
