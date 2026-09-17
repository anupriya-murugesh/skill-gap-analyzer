import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SkillGapForm from '../components/SkillGapForm';
import { Sparkles } from 'lucide-react';

export default function AnalyzerPage() {
  const [searchParams] = useSearchParams();
  const initialSkills = searchParams.get('skills') || '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-indigo">
            <Sparkles size={13} /> Diagnostic Workspace
          </span>
        </div>
        <h1 className="page-title">Personalized Skill Gap Diagnostic</h1>
        <p className="page-subtitle">
          Benchmark your tech stack against current vacancies to see your market coverage and highest-demand missing skills.
        </p>
      </div>

      <div className="glass-card">
        <SkillGapForm defaultSkills={initialSkills} />
      </div>
    </div>
  );
}
