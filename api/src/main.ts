import { Hono } from "hono";
import deployment from "./routes/deployment/index.ts";
import { auth } from "./middleware/auth.ts";
import { getDB } from "./utils/db.ts";
import { SCHEMA } from "./schema/index.ts";

const app = new Hono();

app.use(auth);

app.route("/deployment", deployment);

app.get("/", (c) => {
  const db = getDB();
  const deployments = db.select().from(SCHEMA.deployments);

  return c.json({ deployments });
});

Deno.serve({ port: 3000, hostname: "127.0.0.1" }, app.fetch);
