import { makeExecutableSchema } from "@graphql-tools/schema";
import users from "./users/index.js";
import types from "./types/index.js";

export default makeExecutableSchema({
  typeDefs: [users.typeDefs, types.typeDefs],
  resolvers: [users.resolvers, types.resolvers],
});
