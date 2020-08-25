"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const client_1 = require("@prisma/client");
const Query_1 = __importDefault(require("./resolvers/Query"));
const Mutation_1 = __importDefault(require("./resolvers/Mutation"));
const User_1 = __importDefault(require("./resolvers/User"));
const Link_1 = __importDefault(require("./resolvers/Link"));
const Vote_1 = __importDefault(require("./resolvers/Vote"));
const Subscription_1 = __importDefault(require("./resolvers/Subscription"));
const prisma = new client_1.PrismaClient();
const pubsub = new graphql_yoga_1.PubSub();
const resolvers = {
    Query: Query_1.default,
    Mutation: Mutation_1.default,
    Subscription: Subscription_1.default,
    User: User_1.default,
    Link: Link_1.default,
    Vote: Vote_1.default
};
const server = new graphql_yoga_1.GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: (request) => {
        return Object.assign(Object.assign({}, request), { prisma,
            pubsub });
    }
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
//# sourceMappingURL=index.js.map