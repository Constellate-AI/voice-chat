from transformers import VitsModel, AutoTokenizer
import torch

def set_pytorch_backend ():
    if torch.cuda.is_available():
        torch.set_default_device('cuda')
        print('using CUDA as pytorch backend')
    elif torch.backends.mps.is_available():
        torch.set_default_device('mps')
        print('Using Apple Silicon (MPS) as pytorch backend')
    else:
        torch.set_default_device('cpu')
        print('Using CPU as pytorch backend')

model = VitsModel.from_pretrained("facebook/mms-tts-eng")
tokenizer = AutoTokenizer.from_pretrained("facebook/mms-tts-eng")
set_pytorch_backend()

def synthesize_speech(text: str):

    print('Synthesizing speech for ', text)
    inputs = tokenizer(text, return_tensors="pt")

    with torch.no_grad():
        output = model(**inputs).waveform

    print('synthesized speech!')