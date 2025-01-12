import whisper, pyaudio, wave
import tempfile
import os, pyttsx3
import ollama

# Initialize the Whisper model
model = whisper.load_model("base")  # Adjust model size as needed

# Set up PyAudio to record from the microphone
p = pyaudio.PyAudio()

# Set recording parameters
RATE = 16000  # Sample rate
CHANNELS = 1  # Mono audio
FORMAT = pyaudio.paInt16  # Audio format
CHUNK = 1024  # Size of each audio chunk

# Open a new stream for microphone input
stream = p.open(format=FORMAT,
                channels=CHANNELS,
                rate=RATE,
                input=True,
                frames_per_buffer=CHUNK)

print("Recording...")

# Record a few seconds of audio (e.g., 5 seconds)
frames = []
try:
    for i in range(0, int(RATE / CHUNK * 5)):  # Record for 5 seconds
        data = stream.read(CHUNK)
        frames.append(data)
    print("Recording finished.")
finally:
    # Stop the recording stream
    stream.stop_stream()
    stream.close()
    p.terminate()

# Save the recorded data to a temporary WAV file
with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as temp_wav:
    temp_wav_path = temp_wav.name
    with wave.open(temp_wav_path, 'wb') as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(p.get_sample_size(FORMAT))
        wf.setframerate(RATE)
        wf.writeframes(b''.join(frames))

# Use Whisper to transcribe the recorded audio
result = model.transcribe(temp_wav_path)
transcribed_text = result.get('text', '').strip()

# Ensure the transcription is not empty
if not result:
    print("No speech detected.")
else:
    # Add specific instructions for LLaMA
    instructions = (
        "You are an expert in nature, the environment, and sustainability. "
        "Focus your responses on topics related to nature, wildlife, climate change, "
        "conservation, and environmental protection."
    )
    
    # Send the transcription to LLaMA
    response = ollama.chat(
        model="llama3.2",
        messages=[
            {"role": "system", "content": instructions},
            {"role": "user", "content": transcribed_text},
        ]
    )

# Cleanup the temporary file
os.unlink(temp_wav_path)
pyttsx3.speak(response['message'].content)