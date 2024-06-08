# voice-chat
Chat with AI using whisper, LLMs, and TTS

## Setup
### Cloning
```shell
git clone --recurse-submodules https://github.com/constellate-ai/voice-chat
```

### LLM Inference with llama.cpp
* This repo uses `llama.cpp` for LLM inference which is optimize for Apple Silicon.
* If you have a CUDA device available to you, I recommend using [vLLM](https://github.com/vllm-project/vllm) for inference

* download a model GGUF from huggingface. The following command assumes using Nous Research's Hermes 2 Pro Llama 3 8B model,
but you can use whatever you'd like (for vLLM, you'll use full-precision, or a BNB or AWQ quant)
* this starts the server on port 9000, but use whatever you'd like
```shell
cd llama.cpp
make
./server \
  --port 9000 \
  --host 0.0.0.0 \
  -m ~/path/to/model/probably-at-least-Q4.gguf \
  -cb \
  -c 8096 \  # model context length here
  -ngl -1 \  # offload all layers to GPU; change depending on your model size & available shared memory
  --chat-template chatml # your model's chat template; see the llama.cpp repo for supported formats
```

### Speech-to-text Transcription with whisper.cpp
* this assumes a english-only model; choose a different one for your use-case if you want

Configure the whisper.cpp repo/submodule:
```shell 
cd whisper.cpp
make
```
Download the english model:
```shell
bash ./models/download-ggml-model.sh base.en
```

Start the server to accept WAV files; this will automatically try to use the `base.en`
model which we downloaded in the previous step, BUT, you can download and/or use
a different one if so you choose. 
```shell 
cd whisper.cpp
./server \
  --prompt 'User input is presented as text.' \  # condition the model to use proper english and punctuation
  --host 0.0.0.0
  --port 9001 
```

Or, for better quality:
```shell
make medium.en  # bigger, higher-quality model
./server \ 
  --prompt 'User input is presented as text.' \
  --host 0.0.0.0 \
  --port 9001 \
  --model models/ggml-medium.en.bin
  
```