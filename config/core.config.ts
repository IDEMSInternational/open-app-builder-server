import { defineConfig } from "drizzle-kit";
import { commonConfig } from "./common.config.ts";

/**
 * Core config used to manage `open_app_builder` schema namespace
 */
export default defineConfig({
    ...commonConfig,
    schema: "./schema/core/index.ts",
    schemaFilter: ["open_app_builder"],
    out: "./migrations/core",
    migrations: { schema: "open_app_builder", table: "migrations" },
    entities: {
        // https://orm.drizzle.team/docs/drizzle-config-file#roles
        roles: {
            provider: "supabase",
        },
    },
});
