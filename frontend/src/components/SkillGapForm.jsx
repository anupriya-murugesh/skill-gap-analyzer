import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

function SkillGapForm({ defaultSkills = '' }) {
  const [skillInput, setSkillInput] = useState(defaultSkills);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (defaultSkills) {
      setSkillInput(defaultSkills);
      analyzeSkills(defaultSkills);
    }
  }, [defaultSkills]);

  const analyzeSkills = (input) => {
    const skillsArray = input.split(',').map(s => s.trim()).filter(s => s.length > 0);
    if (skillsArray.length === 0) return;

    setLoading(true);
    axios.post('http://127.0.0.1:8000/api/skill-gap/', { skills: skillsArray })
      .then(response => {
        setResult(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching skill gap:', error);
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    analyzeSkills(skillInput);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          Enter your skills, separated by commas:
        </label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Python, React, SQL, Docker, AWS"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            style={{ flex: '1 1 300px' }}
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <Sparkles size={16} />
            {loading ? 'Analyzing...' : 'Analyze My Gaps'}
          </button>
        </div>
      </form>

      {loading && (
        <div className="skeleton" style={{ height: '180px', width: '100%', borderRadius: '10px' }} />
      )}

      {result && (
        <div style={{
          marginTop: '10px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {/* Matched Skills */}
          <div style={{
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(16, 185, 129, 0.05)',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <CheckCircle2 size={18} color="#34d399" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#34d399', margin: 0 }}>
                Matched Skills ({result.matched_skills.length})
              </h3>
            </div>
            
            {result.matched_skills.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                No direct matches found in current job postings. Try expanding your list.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {result.matched_skills.map((s, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '8px 12px',
                      backgroundColor: 'rgba(15, 23, 42, 0.6)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <strong style={{ textTransform: 'capitalize', color: '#f8fafc' }}>{s.skill}</strong>
                    <span className="badge badge-emerald">{s.percentage}% of roles</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Missing Skills */}
          <div style={{
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(244, 63, 94, 0.05)',
            border: '1px solid rgba(244, 63, 94, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <AlertTriangle size={18} color="#fb7185" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fb7185', margin: 0 }}>
                High Demand Missing Skills ({result.missing_skills.length})
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {result.missing_skills.slice(0, 10).map((s, i) => (
                <div 
                  key={i} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '8px 12px',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem'
                  }}
                >
                  <strong style={{ textTransform: 'capitalize', color: '#f8fafc' }}>{s.skill}</strong>
                  <span className="badge badge-rose">{s.percentage}% of roles</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SkillGapForm;