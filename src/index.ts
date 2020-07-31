import { GraphQLServer } from 'graphql-yoga';

const links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for Graphql'
  },
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for Graphql'
  }
];

interface ILink {
  id: number;
  description: string;
  url: string;
}

const resolvers = {
  Query: {
    info: () => 'Hello, World',
    feed: () => links
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
