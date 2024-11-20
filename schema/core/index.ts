import { pgSchema, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Create custom schema namespace for storing open_app_builder metadata
 * https://orm.drizzle.team/docs/schemas
 */
export const openAppBuilderSchema = pgSchema("open_app_builder");

export const deployments = openAppBuilderSchema.table("deployments", {
    id: serial("id").primaryKey(),
    name: text("name"),
    created_at: timestamp().defaultNow(),
});
