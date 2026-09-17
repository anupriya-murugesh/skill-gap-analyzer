import React from 'react';
import DemandChart from '../components/DemandChart';
import { BarChart3 } from 'lucide-react';

export default function TrendsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-indigo">
            <BarChart3 size={13} /> Market Observatory
          </span>
        </div>
        <h1 className="page-title">Technical Skill Trends & Market Share</h1>
        <p className="page-subtitle">
          Explore statistical distribution and hiring frequency of programming languages, frameworks, and infrastructure tools.
        </p>
      </div>

      <div className="glass-card">
        <DemandChart />
      </div>
    </div>
  );
}
