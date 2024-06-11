
export const INDICATOR_TYPE = {
    TALKING: "talking",
    SILENT: "silent",
    GENERATING: "generating",
    IDLE: "idle",
};



export class PlayQueue {
    constructor(audioContext, onChange) {
        this.call_ids = [];
        this.audioContext = audioContext;
        this._onChange = onChange;
        this._isProcessing = false;
        this._indicators = {};
    }

    async add(item) {
        this.call_ids.push(item);
        this.play();
    }

    _updateState(idx, indicator) {
        this._indicators[idx] = indicator;
        this._onChange(this._indicators);
    }

    _onEnd(idx) {
        this._updateState(idx, INDICATOR_TYPE.IDLE);
        this._isProcessing = false;
        this.play();
    }

    //
    async play() {
        if (this._isProcessing || this.call_ids.length === 0) {
            return;
        }

        this._isProcessing = true;

        const [payload, idx, isTts] = this.call_ids.shift();
        this._updateState(idx, INDICATOR_TYPE.GENERATING);

        if (!isTts) {
            const audio = new SpeechSynthesisUtterance(payload);
            audio.onend = () => this._onEnd(idx);
            this._updateState(idx, INDICATOR_TYPE.TALKING);
            window.speechSynthesis.speak(audio);
            return;
        }

        const call_id = payload;
        console.log("Fetching audio for call", call_id, idx);

        let response;
        let success = false;

        // TODO implement this API endpoint
        while (true) {
            console.log(`getting audio for ${call_id}...`)
            response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/audio/${call_id}`);
            if (response.status === 404) {
                continue;
            } else if (response.status === 204) {
                console.error("No audio found for call: " + call_id);
                break;
            } else if (!response.ok) {
                console.error("Error occurred fetching audio: " + response.status);
            } else if (response.status === 200) {
                success = true;
                break;
            }
        }

        if (!success) {
            this._onEnd(idx);
            return;
        }

        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioContext.destination);

        source.onended = () => this._onEnd(idx);

        this._updateState(idx, INDICATOR_TYPE.TALKING);
        source.start();
    }

    // TODO implement this endpoint
    clear() {
        for (const [call_id, _, isTts] of this.call_ids) {
            if (isTts) {
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/audio/${call_id}`, {method: "DELETE"});
            }
        }
        this.call_ids = [];
    }
}
