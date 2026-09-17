import React from 'react';
import { Building2, MapPin, Calendar, ExternalLink } from 'lucide-react';

function JobCard({ job }) {
  const skillsList = job.skills_text 
    ? job.skills_text.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="glass-card" style={{
      padding: '20px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '16px'
    }}>
      <div style={{ flex: '1 1 300px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
          {job.title}
        </h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Building2 size={14} color="#818cf8" />
            <strong style={{ color: '#e2e8f0' }}>{job.company}</strong>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <MapPin size={14} color="#38bdf8" />
            {job.location}
          </span>
          {job.posting_date && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Calendar size={14} color="#94a3b8" />
              {job.posting_date}
            </span>
          )}
        </div>

        {skillsList.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
            {skillsList.map((skill, idx) => (
              <span
                key={idx}
                className="badge"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#cbd5e1',
                  fontSize: '0.75rem'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      <a
        href={job.apply_link}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
        style={{ padding: '8px 16px', fontSize: '0.875rem' }}
      >
        Apply Now <ExternalLink size={14} />
      </a>
    </div>
  );
}

export default JobCard;