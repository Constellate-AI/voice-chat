/**
 * Get the LLM generation? I don't understand how this is being used by the app yet;
 * this will probably be replaced by the Vercel AI SDK...
 * @param noop
 * @param input
 * @param history
 * @param isTortoiseOn
 * @returns {AsyncGenerator<{payload: any, type: any}, void, *>}
 */
export async function* fetchGeneration(noop, input, history, isTortoiseOn) {
    const body = noop
        ? { noop: true, tts: isTortoiseOn }
        : { input, history, tts: isTortoiseOn };

    const response = await fetch("/generate", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        console.error("Error occurred during submission: " + response.status);
    }

    if (noop) {
        return;
    }

    const readableStream = response.body;
    const decoder = new TextDecoder();

    const reader = readableStream.getReader();

    while (true) {
        const { done, value } = await reader.read();

        if (done) {
            break;
        }

        for (let message of decoder.decode(value).split("\x1e")) {
            if (message.length === 0) {
                continue;
            }

            const { type, value: payload } = JSON.parse(message);

            yield { type, payload };
        }
    }

    reader.releaseLock();
}