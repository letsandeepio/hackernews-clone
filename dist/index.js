"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
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
let idCount = links.length;
const resolvers = {
    Query: {
        info: () => 'Hello, World',
        feed: () => links
    },
    Mutation: {
        post: (_, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            };
            links.push(link);
            return link;
        },
        updateLink: (_, args) => {
            const linkToUpdate = links.findIndex((i) => i.id === args.id);
            links[linkToUpdate] = {
                id: args.id,
                description: args.description,
                url: args.url
            };
            return links[linkToUpdate];
        },
        deleteLink: (_, args) => {
            const linkToDelete = links.findIndex((i) => i.id === args.id);
            const link = links.splice(linkToDelete, 1)[0];
            return link;
        }
    }
};
const server = new graphql_yoga_1.GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
//# sourceMappingURL=index.js.map