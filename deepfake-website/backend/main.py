from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

app = FastAPI()

# Allowing CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory where uploaded videos will be saved
UPLOAD_DIRECTORY = "uploads"

# Ensure the upload directory exists
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

@app.post("/upload/")
async def upload_video(video: UploadFile = File(...)):
    try:
        # Save the uploaded video to the specified directory
        with open(os.path.join(UPLOAD_DIRECTORY, video.filename), "wb") as buffer:
            shutil.copyfileobj(video.file, buffer)
        
        # Call function to perform inference on the uploaded video
        is_fake = perform_inference(os.path.join(UPLOAD_DIRECTORY, video.filename))
        
        # Delete the uploaded file after processing
        os.remove(os.path.join(UPLOAD_DIRECTORY, video.filename))
        
        # Return the result of the inference
        if is_fake:
            return {"result": "The video is detected as FAKE."}
        else:
            return {"result": "The video is detected as REAL."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def perform_inference(video_path):
    # Your ML inference code here
    # This function should take the video path as input,
    # perform inference using your ML model, and return a boolean indicating
    # whether the video is detected as fake or real.
    # Example:
    # result = ml_model.predict(video_path)
    # return result
    # For the sake of demonstration, let's assume it's random
    import random
    return random.choice([True, False])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
