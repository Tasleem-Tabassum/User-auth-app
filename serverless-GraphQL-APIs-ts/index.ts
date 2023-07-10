import { ApolloServer } from "apollo-server-lambda";
import { resolvers } from "./src/graphql/resolvers";
import { typeDefs } from "./src/graphql/schema.graphql";

const server = new ApolloServer({ 
    typeDefs, 
    resolvers
});

export const graphqlHandler = server.createHandler();


// const express = require('express');
// const serverless = require('serverless-express');
// const { ApolloServer } = require('apollo-server-express');

// const startServer = async () => {

//   const app = express();

//   // Enable CORS
  // app.use((req: any, res: { header: (arg0: string, arg1: string) => void; }, next: () => void) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type');
  //   next();
  // });

//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });

//   await server.start()

//   server.applyMiddleware({ app });

//   // Create the serverless handler
//   const graphqlHandler = serverless(app);

//   return graphqlHandler;

// };

// const graphqlHandler = startServer();
// module.exports = { graphqlHandler };

// import { resolvers } from "./src/graphql/resolvers";
// import { typeDefs } from "./src/graphql/schema.graphql";

// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const serverless = require('serverless-express');

// const app = express();

// // Enable CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// server.start().then(() => {
//   // Apply the Apollo Server middleware to Express
//   server.applyMiddleware({ app });

//   // Create the serverless handler
//   const graphqlHandler = serverless.createServer(app);

//   // Export the serverless handler
//   module.exports.graphqlHandler = (event, context) => serverless.proxy(graphqlHandler, event, context);
// });

// import { resolvers } from "./src/graphql/resolvers";
// import { typeDefs } from "./src/graphql/schema.graphql";

// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const serverless = require('serverless-http');

// const app = express();

// // Enable CORS
// app.use((req: any, res: { header: (arg0: string, arg1: string) => void; }, next: () => void) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// server.start().then(() => {
//   // Apply the Apollo Server middleware to Express
//   server.applyMiddleware({ app });

//   // Create the serverless handler
//   const graphqlHandler = serverless(app);

//   // Export the serverless handler
//   module.exports.graphqlHandler = graphqlHandler;
// });