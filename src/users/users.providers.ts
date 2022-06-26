import { Connection, Model } from 'mongoose';
import { UsersSchema } from '../shareds/schemas/users.schema';
import { DB_PROVIDER, USERS_MODEL_PROVIDER } from '../constants';
import { Users } from '../shareds/interfaces/users.interface';

export const usersProviders = [
  {
    provide: USERS_MODEL_PROVIDER,
    useFactory: (connection: Connection): Model<Users> =>
      connection.model('Users', UsersSchema),
    inject: [DB_PROVIDER],
  },
];
