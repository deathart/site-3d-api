import { Connection, Model } from 'mongoose';
import { PostsSchema } from '../shareds/schemas/posts.schema';
import { POSTS_MODEL_PROVIDER, DB_PROVIDER } from '../constants';
import { Posts } from '../shareds/interfaces/posts.interface';

export const PostsProviders = [
  {
    provide: POSTS_MODEL_PROVIDER,
    useFactory: (connection: Connection): Model<Posts> =>
      connection.model('Posts', PostsSchema),
    inject: [DB_PROVIDER],
  },
];
