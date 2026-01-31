# AI Business Agent 🤖💼

An intelligent interface that transforms raw sales data into actionable business insights. This application allows users to upload sales CSV files and receive instant analysis, visual metrics, and strategic recommendations to improve business performance.

## 🚀 Features

- **Instant Data Analysis**: Upload your `sales_data.csv` and get immediate results.
- **Key Performance Indicators**: Visual breakdown of Total Revenue, Sales Growth, Average Order Value, and Top Products.
- **AI-Driven Recommendations**: Smart, actionable advice categorized by impact (Critical, Opportunity, Action).
- **Secure & Private**: Data is processed locally on your machine.
- **Modern UI**: A dark-themed, glassmorphic interface built for clarity and aesthetics.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, CSS (Glassmorphism)
- **Backend**: Python, FastAPI
- **Data Processing**: Pandas, NumPy

## 🏃‍♂️ How to Run

### Prerequisites
- Node.js installed
- Python installed

### 1. Start the Backend Server
Navigate to the `backend` folder and run:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
The API will start at `http://127.0.0.1:8000`.

### 2. Start the Frontend Application
Open a new terminal, navigate to the `frontend` folder and run:
```bash
cd frontend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.

## 📂 Project Structure

```
AI BUSINESS AGENT/
├── backend/            # Python FastAPI server
│   ├── main.py        # API endpoints
│   └── analyzer.py    # Data analysis logic
├── frontend/           # React application
│   ├── src/           # Source code
│   └── public/        # Static assets
└── sales_data.csv      # Example dataset
```

## 📝 License
This project is open source and available under the [MIT License](LICENSE).
