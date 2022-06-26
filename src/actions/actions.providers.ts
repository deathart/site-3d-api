import { Connection, Model } from 'mongoose';
import { ActionsSchema } from '../shareds/schemas/actions.schema';
import { ACTIONS_MODEL_PROVIDER, DB_PROVIDER } from '../constants';
import { Actions } from '../shareds/interfaces/actions.interface';

export const ActionsProviders = [
  {
    provide: ACTIONS_MODEL_PROVIDER,
    useFactory: (connection: Connection): Model<Actions> =>
      connection.model('Actions', ActionsSchema),
    inject: [DB_PROVIDER],
  },
];
