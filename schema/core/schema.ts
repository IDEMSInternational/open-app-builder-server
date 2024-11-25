import {
	bigint,
	getTableConfig,
	pgSchema,
	pgTable,
	serial,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const openAppBuilder = pgSchema("open_app_builder");

export const migrationsInOpenAppBuilder = openAppBuilder.table("migrations", {
	id: serial().primaryKey().notNull(),
	hash: text().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	createdAt: bigint("created_at", { mode: "number" }),
});

export const deploymentsInOpenAppBuilder = openAppBuilder.table("deployments", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
		.defaultNow().notNull(),
});

// TODO - public deployment (base/default) and then possible clone management
const clone: typeof deploymentsInOpenAppBuilder = {
	...deploymentsInOpenAppBuilder,
	_: {
		...deploymentsInOpenAppBuilder._,
		schema: "another_schema" as any,
	},
};
