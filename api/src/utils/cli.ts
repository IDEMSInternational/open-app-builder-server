/**
 * Create a spawned child process for a command that simultaneously pipes stdout and stderr
 * both to the deno console and to in-memory variables so the full output can be returned
 *
 * This is useful as using chained pipeThrough or copy commands on will lock stdout
 * and prevent unified spawn.output() from being called
 *
 * Adapted from:
 * https://medium.com/deno-the-complete-reference/a-beginners-guide-to-streams-in-deno-760d51750763
 * https://medium.com/deno-the-complete-reference/readable-streams-in-deno-e5d707735a77
 * https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/pipeThrough
 * https://stackoverflow.com/a/67024737
 */
export async function spawnAndReturn(
    cmd: string,
    options: Deno.CommandOptions = {},
) {
    // spawn the child process for the given command and options
    const process = new Deno.Command(
        cmd,
        { ...options, stdout: "piped", stderr: "piped" },
    ).spawn();

    // setup variables to store text output from stdout and stderr
    const decoder = new TextDecoder();
    const outputChunks: string[] = [];

    // pipe stdout to both console and variable
    const outputStream = new WritableStream({
        write: (chunk) => {
            Deno.stdout.write(chunk);
            outputChunks.push(decoder.decode(chunk));
        },
    });
    process.stdout.pipeTo(outputStream);

    // pipe stderr to both console and variable
    const stdErrStream = new WritableStream({
        write: (chunk) => {
            Deno.stderr.write(chunk);
            outputChunks.push(decoder.decode(chunk));
        },
    });
    process.stderr.pipeTo(stdErrStream);

    // await process to complete and return
    const status = await process.status;
    return { status, output: outputChunks.join("") };
}
