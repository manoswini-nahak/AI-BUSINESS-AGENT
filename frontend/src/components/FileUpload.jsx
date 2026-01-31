import { useState, useRef } from 'react'

export default function FileUpload({ onAnalysisComplete, setLoading, setError }) {
    const [dragActive, setDragActive] = useState(false)
    const inputRef = useRef(null)

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }

    const onButtonClick = () => {
        inputRef.current.click()
    }

    const handleFile = async (file) => {
        setLoading(true)
        setError(null)

        // Create FormData
        const formData = new FormData()
        formData.append('file', file)

        try {
            // Analyze directly
            const response = await fetch('http://127.0.0.1:8000/analyze', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Analysis failed')
            }

            const data = await response.json()
            onAnalysisComplete(data)

        } catch (err) {
            console.error(err)
            setError("Failed to upload or analyze file. Is the backend running?")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className={`glass-panel upload-zone ${dragActive ? "drag-active" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input
                ref={inputRef}
                type="file"
                className="input-file"
                style={{ display: 'none' }}
                onChange={handleChange}
                accept=".csv, .xlsx"
            />

            <div style={{ pointerEvents: 'none' }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                    Drag & Drop your Sales CSV here
                </p>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    or
                </p>
                <button
                    className="btn-primary"
                    style={{ pointerEvents: 'auto' }}
                    onClick={onButtonClick}
                >
                    Select File
                </button>
            </div>
        </div>
    )
}
