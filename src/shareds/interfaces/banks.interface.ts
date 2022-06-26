import { Document } from 'mongoose';

export interface Banks extends Document {
  readonly accountId: string;
  readonly name: string;
  readonly description: string;
}
