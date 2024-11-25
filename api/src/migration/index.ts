import { resolveBinary } from "dbmate";
import { spawnAndReturn } from "../utils/cli.ts";

/** Run DB migrations, calling DBMate CLI to manage from migrations directory */
export async function runMigrations() {
    console.log("[DB Migration] Start");
    const { output, status } = await migrateCore();
    if (!status.success) {
        Deno.exit(1);
    }
    if (output === "") {
        console.log("[DB Migration] Complete (0 Changes)");
    } else {
        console.log("[DB Migration] Complete");
    }
    return;
}

async function migrateCore() {
    const args = [
        "--migrations-dir",
        "../migrations/core",
        "--migrations-table",
        "",
        "migrate",
    ];
    const { output, status } = await dbMateExec(args);
    return { output, status };
}

/**
 * Execute a cli command with dbmate
 * https://github.com/amacneil/dbmate?tab=readme-ov-file#commands
 */
function dbMateExec(args: string[]) {
    const cliPath = resolveBinary();
    // when connecting to db disable sslmode
    // TODO - how can it be enabled??? (will also need to change common.config.ts)
    const DATABASE_URL = `${Deno.env.get("DATABASE_URL")}?sslmode=disable`;
    return spawnAndReturn(cliPath, {
        args,
        env: { DATABASE_URL },
    });
}
