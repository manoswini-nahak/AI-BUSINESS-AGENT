import { useState } from 'react'
import FileUpload from './components/FileUpload'
import Dashboard from './components/Dashboard'

function App() {
  const [analysisData, setAnalysisData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleUploadSuccess = (data) => {
    // Ideally we would fetch analysis here
    // For now, let's assume the upload analysis returns everything or we call analyze
    setAnalysisData(data) 
  }

  return (
    <div className="app-container">
      <header style={{ padding: '2rem 2rem 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', margin: 0, background: 'linear-gradient(to right, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AI Business Agent
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '0.5rem' }}>
          Your data, deciphered. Actionable insights in seconds.
        </p>
      </header>
      
      <main style={{ padding: '2rem' }}>
        {!analysisData && (
          <div style={{ maxWidth: '600px', margin: '4rem auto' }}>
            <FileUpload 
              onAnalysisComplete={setAnalysisData} 
              setLoading={setLoading}
              setError={setError}
            />
            {loading && <p style={{textAlign: 'center', marginTop: '1rem'}}>Crunching the numbers...</p>}
            {error && <p style={{textAlign: 'center', color: '#ef4444', marginTop: '1rem'}}>{error}</p>}
          </div>
        )}

        {analysisData && (
          <Dashboard data={analysisData} onReset={() => setAnalysisData(null)} />
        )}
      </main>
    </div>
  )
}

export default App
