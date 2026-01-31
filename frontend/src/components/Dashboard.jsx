import { useEffect } from 'react'

export default function Dashboard({ data, onReset }) {
    const { analysis, recommendations } = data

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val)
    }

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1280px', margin: '0 auto 2rem' }}>
                <h2>Business Insights</h2>
                <button onClick={onReset} style={{ background: 'transparent', border: '1px solid var(--text-muted)', color: 'var(--text-muted)', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
                    Upload New File
                </button>
            </div>

            <div className="dashboard-grid">
                {/*
                 Metrics */}
                <div className="glass-panel metric-card">
                    <span style={{ color: 'var(--text-muted)' }}>Total Revenue</span>
                    <span className="metric-value">{formatCurrency(analysis.total_revenue)}</span>
                </div>

                <div className="glass-panel metric-card">
                    <span style={{ color: 'var(--text-muted)' }}>Sales Growth</span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                        <span className="metric-value">{analysis.sales_growth_percentage}%</span>
                        <span style={{ color: analysis.sales_growth_percentage >= 0 ? '#4ade80' : '#ef4444' }}>
                            {analysis.sales_growth_percentage >= 0 ? '↑' : '↓'}
                        </span>
                    </div>
                </div>

                <div className="glass-panel metric-card">
                    <span style={{ color: 'var(--text-muted)' }}>Avg Order Value</span>
                    <span className="metric-value">{formatCurrency(analysis.average_order_value)}</span>
                </div>

                {/* Top Product */}
                <div className="glass-panel metric-card">
                    <span style={{ color: 'var(--text-muted)' }}>Top Product</span>
                    <span className="metric-value" style={{ fontSize: '1.8rem' }}>
                        {analysis.top_products ? Object.keys(analysis.top_products)[0] : 'N/A'}
                    </span>
                </div>
            </div>

            {/* Recommendations */}
            <div style={{ maxWidth: '1280px', margin: '2rem auto' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>AI Recommendations</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                    {recommendations.map((rec, idx) => (
                        <div key={idx} className={`glass-panel recommendation-card ${rec.type}`}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <strong style={{ fontSize: '1.1rem' }}>{rec.title}</strong>
                                <span style={{ fontSize: '0.8rem', opacity: 0.7, padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }}>{rec.type.toUpperCase()}</span>
                            </div>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>
                                {rec.action}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
