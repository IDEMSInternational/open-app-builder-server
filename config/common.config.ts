import { Config } from "drizzle-kit";

const url = Deno.env.get("DATABASE_URL")!;

/**
 * Core config used to manage `open_app_builder` schema namespace
 */
export const commonConfig: Config = {
    dialect: "postgresql",
    dbCredentials: {
        url,
        ssl: false,
    },
};
