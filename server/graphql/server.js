import { ApolloServer } from "@apollo/server";
import { resolver } from "./resolvers.js";
import { schema } from "./schema.js";

// createing GRaphQl Server
export const connectGraphQl = () => {
   const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolver,
  });

 return server;

};
