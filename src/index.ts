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

const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}
type Link {
  id: ID!
  description: String!
  url: String!
}`;

interface ILink {
  id: number;
  description: string;
  url: string;
}

const resolvers = {
  Query: {
    info: () => 'Hello, World',
    feed: () => links
  },
  Link: {
    id: (parent: ILink) => parent.id,
    description: (parent: ILink) => parent.description,
    url: (parent: ILink) => parent.url
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
