from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import ollama

# Load BLIP model and processor
model_name = "Salesforce/blip-image-captioning-base"  # You can also try 'blip-image-captioning-large'
processor = BlipProcessor.from_pretrained(model_name)
model = BlipForConditionalGeneration.from_pretrained(model_name)

# Load an image
image_path = input("Enter Path: ")  # Replace with your image path
try:
    image = Image.open(image_path).convert("RGB")  # Ensure the image is in RGB format

    # Prepare inputs for the model
    inputs = processor(images=image, return_tensors="pt")

    # Generate a caption
    output_ids = model.generate(**inputs)
    caption = processor.decode(output_ids[0], skip_special_tokens=True)
    response = ollama.chat(
    model="llama3.2",
    messages=[{
        "role": "user",
        "content": f"how to recycle {caption} if it can be otherwise how to properly dispose it.",
    }]
)
    print(response['message']['content'])
except OSError:
    print("File not found")

except Exception as e:
    print(e)
