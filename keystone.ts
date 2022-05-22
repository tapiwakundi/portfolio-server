import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';
require('dotenv').config({})

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: process.env.DB_URL!
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
    server: {
      cors: {
        origin: ['http://localhost:3000', 'https://tapiwakundi.com']
      }
    }
  })
);
