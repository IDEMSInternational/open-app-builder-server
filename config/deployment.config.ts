import { defineConfig } from "drizzle-kit";

import { commonConfig } from "./common.config.ts";

/**
 * Core config used to manage `open_app_builder` schema namespace
 */
export default defineConfig({
    ...commonConfig,
    schema: "./schema/deployment/schema.ts",
    schemaFilter: ["deployment"],
    out: "./schema/deployment",
    migrations: { schema: "deployment", table: "migrations" },
    entities: {
        // https://orm.drizzle.team/docs/drizzle-config-file#roles
        roles: {
            provider: "supabase",
        },
    },
});
