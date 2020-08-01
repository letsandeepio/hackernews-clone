import { GraphQLServer, PubSub } from 'graphql-yoga';
import { PrismaClient } from '@prisma/client';

import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Link from './resolvers/Link';
import Vote from './resolvers/Vote';

import Subscription from './resolvers/Subscription';

const prisma = new PrismaClient();
const pubsub = new PubSub();

interface Context {
  prisma: typeof prisma;
  db: any;
}

const resolvers: any = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
      pubsub
    };
  }
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
