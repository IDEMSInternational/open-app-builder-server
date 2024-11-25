import { Hono } from "hono";
import deployment from "./routes/deployment/index.ts";
import { auth } from "./middleware/auth.ts";
import { runMigrations } from "./migration/index.ts";

const app = new Hono();

app.use(auth);

app.route("/deployment", deployment);

app.get("/", async (c) => {
  return c.json("api running");
});

await runMigrations();

Deno.serve({ port: 3000, hostname: "127.0.0.1" }, app.fetch);
