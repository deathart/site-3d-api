import * as mongoose from 'mongoose';

export const BanksSchema = new mongoose.Schema({
  accountId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
