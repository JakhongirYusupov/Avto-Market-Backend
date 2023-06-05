import { makeExecutableSchema } from "@graphql-tools/schema";
import users from "./users/index.js";
import types from "./types/index.js";
import Category from "./Category/index.js";
import Cars from "./Cars/index.js";
import Korzina from "./Korzina/index.js";

export default makeExecutableSchema({
  typeDefs: [
    users.typeDefs,
    types.typeDefs,
    Category.typeDefs,
    Cars.typeDefs,
    Korzina.typeDefs,
  ],
  resolvers: [
    users.resolvers,
    types.resolvers,
    Category.resolvers,
    Cars.resolvers,
    Korzina.resolvers,
  ],
});
