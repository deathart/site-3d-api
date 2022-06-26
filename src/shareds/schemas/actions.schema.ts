import * as mongoose from 'mongoose';

export const ActionsSchema = new mongoose.Schema({
  bankId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  titre: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  montant: {
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
