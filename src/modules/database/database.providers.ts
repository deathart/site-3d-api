import * as mongoose from 'mongoose';
import { DB_PROVIDER } from '../../constants';
import { ConfigService } from '../config/config.service';

const db = new ConfigService(`.env.${process.env.NODE_ENV}`);

export const databaseProviders = [
  {
    provide: DB_PROVIDER,
    useFactory: async (): Promise<typeof mongoose> => {
      (mongoose as any).Promise = global.Promise;
      return await mongoose.connect(`mongodb://${encodeURIComponent(db.get('MONGO_USER'))}:${encodeURIComponent(
        db.get('MONGO_PASS')
      )}@${db.get('MONGO_HOST')}/${db.get('MONGO_DATABASE')}`, {
        retryWrites: true,
        w: 'majority',
        authSource: 'admin',
      });
    },
  },
];
