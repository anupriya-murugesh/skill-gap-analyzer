import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import { Briefcase } from 'lucide-react';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const initialSkill = searchParams.get('skill') || '';

  const fetchJobs = (filters = {}) => {
    setLoading(true);
    axios.get('http://127.0.0.1:8000/api/jobs/', { params: filters })
      .then(response => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (initialSkill) {
      fetchJobs({ skill: initialSkill });
    } else {
      fetchJobs();
    }
  }, [initialSkill]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-indigo">
            <Briefcase size={13} /> Job Explorer
          </span>
        </div>
        <h1 className="page-title">Live Tech Job Opportunities</h1>
        <p className="page-subtitle">
          Search and filter real-time tech vacancies scraped directly from live employer postings.
        </p>
      </div>

      <div className="glass-card">
        <SearchBar onSearch={fetchJobs} initialSkill={initialSkill} />
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Showing <strong>{jobs.length}</strong> active job posting(s)
          </p>
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="skeleton" style={{ height: '110px', width: '100%', borderRadius: '12px' }} />
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {jobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="glass-card" style={{ padding: '48px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              No matching jobs found for your criteria. Try adjusting your search filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
