import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers, typeDefs } from "./root-schema.js";

// Environment Varibles
dotenv.config();
const port = parseInt(process.env.PORT ?? "4000");

// Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers
});
const { url } = await startStandaloneServer(server, {
    listen: { port: port }
});
console.log(url);
