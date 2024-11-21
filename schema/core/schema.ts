import { pgTable, pgSchema, serial, text, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const openAppBuilder = pgSchema("open_app_builder");


export const deploymentsInOpenAppBuilder = openAppBuilder.table("deployments", {
	id: serial().primaryKey().notNull(),
	name: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});
