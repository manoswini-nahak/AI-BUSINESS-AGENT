from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
from analyzer import analyze_sales_data, generate_recommendations

app = FastAPI(title="AI Business Agent API")

# Allow CORS for Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "AI Business Agent Backend is Running"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename.endswith(('.csv', '.xlsx')):
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload CSV or Excel.")
    
    try:
        content = await file.read()
        if file.filename.endswith('.csv'):
            df = pd.read_csv(io.BytesIO(content))
        else:
            df = pd.read_excel(io.BytesIO(content))
            
        # Basic validation
        if 'Date' not in df.columns or 'Sales' not in df.columns:
             return {"error": "Dataset must contain 'Date' and 'Sales' columns"}

        return {"message": "File processed successfully", "columns": df.columns.tolist(), "rows": len(df)}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    # In a real app, we might store the file ID and retrieve it.
    # For this simple agent, we'll re-process the upload for analysis to keep it stateless for now
    # or arguably, we could accept JSON data. Let's stick to file upload for simplicity/robustness.
    
    # Actually, receiving the file again is cumbersome. 
    # Let's pivot: The /analyze endpoint will accept the file just like /upload, 
    # but return the full analysis.
    
    if not file.filename.endswith(('.csv', '.xlsx')):
        raise HTTPException(status_code=400, detail="Invalid file format")

    content = await file.read()
    if file.filename.endswith('.csv'):
        df = pd.read_csv(io.BytesIO(content))
    else:
        df = pd.read_excel(io.BytesIO(content))
    
    try:
        # standardizing columns for analysis
        df.columns = [c.strip() for c in df.columns] 
        
        analysis_result = analyze_sales_data(df)
        busi_recommendations = generate_recommendations(analysis_result)
        
        return {
            "analysis": analysis_result,
            "recommendations": busi_recommendations
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
