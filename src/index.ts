import { GraphQLServer } from 'graphql-yoga';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for Graphql'
  },
  {
    id: 'link-1',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for Graphql'
  }
];

interface ILink {
  id: string;
  description: string;
  url: string;
}

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => 'Hello, World',
    feed: () => links
  },
  Mutation: {
    post: (_: any, args: ILink) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (_: any, args: ILink) => {
      const linkToUpdate = links.findIndex((i) => i.id === args.id);
      links[linkToUpdate] = {
        id: args.id,
        description: args.description,
        url: args.url
      };
      return links[linkToUpdate];
    },
    deleteLink: (_: any, args: ILink) => {
      const linkToDelete = links.findIndex((i) => i.id === args.id);
      const link = links.splice(linkToDelete, 1)[0];
      return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: prisma
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
