import { db } from "ponder:api";
import schema from "ponder:schema";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { client, graphql } from "ponder";

const app = new Hono();

// Run before GraphQL/SQL middleware so OPTIONS is answered without querying the DB.
app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type"],
  maxAge: 86400,
}));
app.use("/graphql", graphql({ db, schema }));
app.use("/sql/*", client({ db, schema }));

// /health, /ready and /status are Ponder's built-in routes.
export default app;
