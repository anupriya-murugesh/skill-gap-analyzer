import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { TrendingUp, Layers, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

function DemandChart() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(15);

  useEffect(() => {
    setLoading(true);
    axios.get('http://127.0.0.1:8000/api/demand-ranking/')
      .then(response => {
        setRanking(response.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching demand ranking:', error);
        setLoading(false);
      });
  }, []);

  const displayedRanking = ranking.slice(0, limit);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#1e293b',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '10px 14px',
          borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
        }}>
          <p style={{ fontWeight: 700, color: '#f8fafc', marginBottom: '4px', textTransform: 'capitalize' }}>
            {payload[0].payload.skill}
          </p>
          <p style={{ fontSize: '0.85rem', color: '#818cf8', margin: 0 }}>
            Market Share: <strong>{payload[0].value}%</strong>
          </p>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
            Appears in {payload[0].payload.count} vacancies
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
            Market Skill Frequency Distribution
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Analyzing top technical skills across all ingested job postings
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {[10, 15, 25].map(cnt => (
            <button
              key={cnt}
              type="button"
              onClick={() => setLimit(cnt)}
              className={limit === cnt ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            >
              Top {cnt}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="skeleton" style={{ height: '360px', width: '100%', borderRadius: '12px' }} />
      ) : displayedRanking.length > 0 ? (
        <>
          <div style={{ height: '380px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={displayedRanking} margin={{ top: 10, right: 10, left: -15, bottom: 30 }}>
                <XAxis 
                  dataKey="skill" 
                  tick={{ fill: '#94a3b8', fontSize: 11 }} 
                  interval={0}
                  angle={-35}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  unit="%" 
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
                  {displayedRanking.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index < 3 ? '#4f46e5' : index < 7 ? '#6366f1' : '#38bdf8'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ marginTop: '16px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '10px' }}>
              Ranked Skills Breakdown:
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '8px'
            }}>
              {displayedRanking.map((s, idx) => (
                <Link
                  key={idx}
                  to={`/jobs?skill=${encodeURIComponent(s.skill)}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'border-color 0.15s, transform 0.15s'
                  }}>
                    <span style={{ fontSize: '0.85rem', color: '#f8fafc', fontWeight: 600, textTransform: 'capitalize' }}>
                      #{idx + 1} {s.skill}
                    </span>
                    <span className="badge badge-indigo" style={{ fontSize: '0.75rem' }}>
                      {s.percentage}%
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          No demand ranking records found.
        </div>
      )}
    </div>
  );
}

export default DemandChart;