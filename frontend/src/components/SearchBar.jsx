import React, { useState, useEffect } from 'react';
import { Search, MapPin, Tag } from 'lucide-react';

function SearchBar({ onSearch, initialSkill = '' }) {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [skill, setSkill] = useState(initialSkill);

  useEffect(() => {
    if (initialSkill) {
      setSkill(initialSkill);
    }
  }, [initialSkill]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ keyword, location, skill });
  };

  const handleReset = () => {
    setKeyword('');
    setLocation('');
    setSkill('');
    onSearch({});
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px'
      }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
            Job Title / Keyword
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Frontend Developer"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
            Location
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Remote, Berlin, US"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
            Required Skill Tag
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Python, React, AWS"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button type="button" onClick={handleReset} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
          Reset Filters
        </button>
        <button type="submit" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.875rem' }}>
          <Search size={15} />
          Search Jobs
        </button>
      </div>
    </form>
  );
}

export default SearchBar;