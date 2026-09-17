import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Globe, Shield, ArrowUpRight, Terminal, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-subtle)',
      padding: '48px 24px 32px',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '40px',
        marginBottom: '40px'
      }}>
        {/* Brand Summary */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Cpu size={18} color="#ffffff" />
            </div>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
              Skill<span className="gradient-text">Gap</span> Analyzer
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
            An intelligent full-stack analytics engine benchmarking candidate skill sets against real-time job market demand scraped from live technical postings.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span className="badge badge-emerald">Django 6.1 REST</span>
            <span className="badge badge-indigo">React 19 & Vite</span>
          </div>
        </div>

        {/* Quick Navigation */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
            Platform Modules
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                Market Overview Dashboard
              </Link>
            </li>
            <li>
              <Link to="/analyzer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                Personalized Skill Gap Diagnostic
              </Link>
            </li>
            <li>
              <Link to="/jobs" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                Live Tech Job Explorer
              </Link>
            </li>
            <li>
              <Link to="/trends" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                In-Demand Skill Trends & Rankings
              </Link>
            </li>
          </ul>
        </div>

        {/* Data Source & Architecture */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
            Data Pipeline & Ingestion
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
            Powered by live postings from <strong>Arbeitnow Job Board API</strong> with continuous token normalization and deduplication in SQLite.
          </p>
          <div style={{
            padding: '10px 14px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-app)',
            border: '1px solid var(--border-subtle)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: '#a5b4fc',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Terminal size={14} />
            <span>python manage.py fetch_jobs</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        paddingTop: '24px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <p>© {new Date().getFullYear()} Skill Gap Analyzer. Full-Stack Career Intelligence Engine.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>Production Ready Demo</span>
          <span>•</span>
          <span>REST API v1</span>
        </div>
      </div>
    </footer>
  );
}
