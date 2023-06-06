import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import "../config.js";
import { graphqlUploadExpress } from "graphql-upload";
import schema from "./modules/index.js";
import path from "path";
(async function () {
  const app = express();
  app.use(graphqlUploadExpress());
  app.use(express.json());
  app.use(express.static(path.join(process.cwd(), "uploads")));

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    context: ({ req }) => {
      return req.headers;
    },
    introspection: true,
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  app.listen(process.env.EPORT || 4040, () =>
    console.log(
      `Express server is running http://localhost:${process.env.EPORT || 4040}`
    )
  );

  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT || 4000}${
      server.graphqlPath
    }`
  );
})();

("https://sketchfab.com/models/d7038e94a65b4445b07edc4c5523aaf7/embed");
