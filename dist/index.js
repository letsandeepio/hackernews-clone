"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const typeDefs = `
type Query {
  info: String!
}`;
const resolvers = {
    Query: {
        info: () => `This is the API of Hackernews Clone`
    }
};
const server = new graphql_yoga_1.GraphQLServer({
    typeDefs,
    resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
//# sourceMappingURL=index.js.map