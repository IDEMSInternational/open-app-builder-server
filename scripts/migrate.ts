import { resolveBinary } from "npm:dbmate";
import { copy, readerFromStreamReader } from "jsr:@std/io";

/**
 * WiP - attempt to use dbmate via cli triggered from Deno
 * This could be useful for generating new migration files during development,
 * but likely less preferred than calling from docker container image
 */

if (import.meta.main) {
  const commonArgs = ["--migrations-dir", "./migrations"];
  dbMateExec(commonArgs.concat(Deno.args));
}

/**
 * Execute a cli command with dbmate
 * https://github.com/amacneil/dbmate?tab=readme-ov-file#commands
 */
async function dbMateExec(args: string[]) {
  const cliPath = resolveBinary();
  const { stdout, stderr, status } = new Deno.Command(
    cliPath,
    { args, stdout: "piped", stderr: "piped" },
  ).spawn();
  copy(readerFromStreamReader(stdout.getReader()), Deno.stdout);
  copy(readerFromStreamReader(stderr.getReader()), Deno.stderr);
  await status;
}
