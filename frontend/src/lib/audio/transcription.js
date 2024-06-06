/**
 * Call the backend to get the transcription for a given audio sample
 * @param buffer
 * @returns {Promise<any>}
 */
export async function fetchTranscript(buffer) {
    const blob = new Blob([buffer], { type: "audio/float32" });

    console.log(`backend API: `, process.env.NEXT_PUBLIC_BACKEND_API_URL)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/transcribe`, {
        method: "POST",
        body: blob,
        headers: { "Content-Type": "audio/float32" },
    });

    if (!response.ok) {
        console.error("Error occurred during transcription: " + response.status);
    }

    return await response.json();
}