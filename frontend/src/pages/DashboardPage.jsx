import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Sparkles, 
  Briefcase, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Database, 
  Layers, 
  Search, 
  AlertCircle,
  ExternalLink,
  MapPin,
  Building2,
  Calendar,
  Flame,
  Target
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [ranking, setRanking] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quickSkillInput, setQuickSkillInput] = useState('');

  const API_BASE = 'http://127.0.0.1:8000/api';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [rankingRes, jobsRes] = await Promise.all([
          axios.get(`${API_BASE}/demand-ranking/`),
          axios.get(`${API_BASE}/jobs/`)
        ]);
        setRanking(rankingRes.data || []);
        setJobs(jobsRes.data || []);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Unable to connect to Django API backend. Ensure python manage.py runserver is running on port 8000.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleQuickAudit = (e) => {
    e.preventDefault();
    if (!quickSkillInput.trim()) return;
    navigate(`/analyzer?skills=${encodeURIComponent(quickSkillInput.trim())}`);
  };

  const topSkills = ranking.slice(0, 8);
  const recentJobs = jobs.slice(0, 3);
  const topSkill = ranking.length > 0 ? ranking[0] : null;

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
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
            Market Share: <strong>{payload[0].value}%</strong> of postings
          </p>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
            Found in {payload[0].payload.count} active roles
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* Error Alert Banner if backend is disconnected */}
      {error && (
        <div style={{
          padding: '16px 20px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--accent-rose-bg)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#fb7185'
        }}>
          <AlertCircle size={20} />
          <div style={{ flex: 1 }}>
            <strong style={{ display: 'block', fontSize: '0.9rem' }}>Backend Connection Notice</strong>
            <span style={{ fontSize: '0.85rem' }}>{error}</span>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '36px 32px',
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.95) 100%)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Glow ambient circle */}
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '-40px',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span className="badge badge-indigo">
              <Sparkles size={13} /> Live Technical Labor Intelligence
            </span>
            <span className="badge badge-emerald">
              <span className="pulse-indicator" style={{ width: '6px', height: '6px' }} /> Updated Today
            </span>
          </div>

          <h1 className="page-title" style={{ fontSize: '2.75rem', lineHeight: 1.15, marginBottom: '16px' }}>
            Benchmark Your Tech Stack Against <span className="gradient-text">Live Market Demand</span>
          </h1>

          <p className="page-subtitle" style={{ fontSize: '1.1rem', marginBottom: '28px' }}>
            Analyze real-time developer job postings, diagnose critical skill gaps in your profile, and discover exactly what tools top tech employers are hiring for today.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            <Link to="/analyzer" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '1rem' }}>
              <Sparkles size={18} />
              Run Skill Gap Diagnostic
            </Link>
            <Link to="/jobs" className="btn btn-secondary" style={{ padding: '12px 22px', fontSize: '1rem' }}>
              <Briefcase size={18} />
              Explore {jobs.length > 0 ? `${jobs.length} Active Jobs` : 'Live Jobs'}
            </Link>
          </div>
        </div>
      </section>

      {/* KPI Metrics Grid */}
      <section>
        <div className="metric-grid">
          {/* Metric 1 */}
          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Active Roles Tracked</span>
              <div className="metric-icon-wrap" style={{ color: '#818cf8' }}>
                <Briefcase size={18} />
              </div>
            </div>
            <div className="metric-value">
              {loading ? <div className="skeleton" style={{ height: '36px', width: '80px' }} /> : jobs.length}
            </div>
            <div className="metric-detail" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={13} color="#34d399" />
              <span>Real-time scraped vacancies</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">#1 In-Demand Tech Skill</span>
              <div className="metric-icon-wrap" style={{ color: '#38bdf8' }}>
                <Flame size={18} />
              </div>
            </div>
            <div className="metric-value" style={{ textTransform: 'capitalize' }}>
              {loading ? (
                <div className="skeleton" style={{ height: '36px', width: '120px' }} />
              ) : topSkill ? (
                topSkill.skill
              ) : (
                'N/A'
              )}
            </div>
            <div className="metric-detail">
              {topSkill ? `${topSkill.percentage}% of all job postings` : 'Analyzing frequency...'}
            </div>
          </div>

          {/* Metric 3 */}
          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Cataloged Skills</span>
              <div className="metric-icon-wrap" style={{ color: '#34d399' }}>
                <Layers size={18} />
              </div>
            </div>
            <div className="metric-value">
              {loading ? <div className="skeleton" style={{ height: '36px', width: '70px' }} /> : ranking.length}
            </div>
            <div className="metric-detail">
              <span>Extracted & parsed skill tags</span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Data Pipeline</span>
              <div className="metric-icon-wrap" style={{ color: '#f59e0b' }}>
                <Database size={18} />
              </div>
            </div>
            <div className="metric-value" style={{ fontSize: '1.45rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Arbeitnow API</span>
            </div>
            <div className="metric-detail" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="pulse-indicator" style={{ width: '6px', height: '6px' }} />
              <span>Continuous SQLite Ingestion</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Split: Top Skills Chart & Quick Audit Form */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        
        {/* Left Column: Top In-Demand Skills Chart */}
        <section className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={18} color="#818cf8" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                  Top Skills in Demand
                </h2>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Percentage of active job postings requiring each skill
              </p>
            </div>
            <Link to="/trends" className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
              Full Trends <ArrowRight size={13} />
            </Link>
          </div>

          {loading ? (
            <div className="skeleton" style={{ height: '280px', width: '100%', borderRadius: '12px' }} />
          ) : topSkills.length > 0 ? (
            <div>
              <div style={{ height: '280px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topSkills} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <XAxis 
                      dataKey="skill" 
                      tick={{ fill: '#94a3b8', fontSize: 12 }} 
                      interval={0}
                      angle={-25}
                      textAnchor="end"
                      height={45}
                    />
                    <YAxis 
                      tick={{ fill: '#94a3b8', fontSize: 12 }} 
                      unit="%" 
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
                      {topSkills.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={index === 0 ? '#4f46e5' : index < 3 ? '#6366f1' : '#38bdf8'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Quick Skill Tags */}
              <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {topSkills.map((s, idx) => (
                  <Link
                    key={idx}
                    to={`/jobs?skill=${encodeURIComponent(s.skill)}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <span 
                      className="badge badge-indigo" 
                      style={{ 
                        cursor: 'pointer',
                        padding: '6px 10px',
                        fontSize: '0.8rem',
                        transition: 'transform 0.15s, border-color 0.15s'
                      }}
                    >
                      <strong>{s.skill}</strong> • {s.percentage}%
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No skills data available. Please check backend database.
            </div>
          )}
        </section>

        {/* Right Column: Quick Skill Gap Audit Launchpad */}
        <section className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Target size={18} color="#06b6d4" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                Instant Skill Gap Audit
              </h2>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              Enter your current technical skills below to see your immediate market match score, identified strengths, and high-priority missing requirements.
            </p>

            <form onSubmit={handleQuickAudit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Your Current Tech Stack (comma-separated):
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Python, React, Docker, PostgreSQL"
                  value={quickSkillInput}
                  onChange={(e) => setQuickSkillInput(e.target.value)}
                />
              </div>

              {/* Sample Preset Chips */}
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Or try a sample profile:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {[
                    'Python, Django, SQL',
                    'React, TypeScript, CSS',
                    'Node.js, AWS, Docker'
                  ].map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setQuickSkillInput(preset)}
                      className="btn-outline"
                      style={{
                        padding: '4px 8px',
                        fontSize: '0.75rem',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '8px', width: '100%' }}>
                <Sparkles size={16} />
                Run Instant Diagnostic
              </button>
            </form>
          </div>

          <div style={{
            marginTop: '24px',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(99, 102, 241, 0.06)',
            border: '1px solid rgba(99, 102, 241, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'rgba(99, 102, 241, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#a5b4fc',
              flexShrink: 0
            }}>
              <CheckCircle2 size={16} />
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Calculates your live market alignment against <strong>{jobs.length}</strong> active tech job vacancies.
            </p>
          </div>
        </section>
      </div>

      {/* Recent Live Job Postings Section */}
      <section className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={18} color="#38bdf8" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                Recent Market Openings
              </h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Latest developer jobs ingested from the live labor market
            </p>
          </div>
          <Link to="/jobs" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            View All {jobs.length} Postings <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[1, 2, 3].map((n) => (
              <div key={n} className="skeleton" style={{ height: '90px', width: '100%', borderRadius: '10px' }} />
            ))}
          </div>
        ) : recentJobs.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentJobs.map((job) => (
              <div
                key={job.id}
                style={{
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  transition: 'border-color 0.2s, background 0.2s'
                }}
              >
                <div style={{ flex: '1 1 300px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                    {job.title}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Building2 size={13} color="#94a3b8" />
                      <strong>{job.company}</strong>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} color="#94a3b8" />
                      {job.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} color="#94a3b8" />
                      {job.posting_date}
                    </span>
                  </div>

                  {job.skills_text && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                      {job.skills_text.split(',').slice(0, 5).map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="badge" 
                          style={{ 
                            backgroundColor: 'rgba(255,255,255,0.05)', 
                            color: '#cbd5e1',
                            border: '1px solid rgba(255,255,255,0.08)',
                            fontSize: '0.725rem'
                          }}
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <a
                  href={job.apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                >
                  Apply Role <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No recent job postings found.
          </div>
        )}
      </section>

      {/* 3 Core Architecture Pillars */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        <div className="glass-card">
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            color: '#818cf8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <Database size={22} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
            1. Automated Ingestion
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Django management pipelines automatically pull active listings from leading technical job boards and extract structured skill requirements into normalized entities.
          </p>
        </div>

        <div className="glass-card">
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: 'rgba(6, 182, 212, 0.15)',
            color: '#22d3ee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <Sparkles size={22} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
            2. Algorithmic Gap Scoring
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Performs set difference and frequency weighting between user-provided tech stacks and real job vacancies to identify high-ROI missing technologies.
          </p>
        </div>

        <div className="glass-card">
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            color: '#34d399',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <TrendingUp size={22} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
            3. Actionable Career Trajectory
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Ranked missing skills allow candidates to focus their study on tools with highest job coverage percentage, cutting months off their job search.
          </p>
        </div>
      </section>

    </div>
  );
}
