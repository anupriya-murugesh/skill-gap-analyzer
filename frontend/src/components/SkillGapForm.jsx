import { useState } from 'react';
import axios from 'axios';

function SkillGapForm() {
  const [skillInput, setSkillInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = skillInput.split(',').map(s => s.trim()).filter(s => s.length > 0);

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

  return (
    <div style={{ marginBottom: '30px' }}>
      <h2>Find Your Skill Gap</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your skills, comma separated (e.g. python, html, css)"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          style={{ width: '400px' }}
        />
        <button type="submit">Analyze</button>
      </form>

      {loading && <p>Analyzing...</p>}

      {result && (
        <div style={{ marginTop: '16px' }}>
          <h3 style={{ color: 'green' }}>You already have ({result.matched_skills.length}):</h3>
          <ul>
            {result.matched_skills.map((s, i) => (
              <li key={i}>{s.skill} — {s.percentage}% of postings</li>
            ))}
          </ul>

          <h3 style={{ color: 'crimson' }}>Missing, ranked by demand ({result.missing_skills.length}):</h3>
          <ul>
            {result.missing_skills.slice(0, 10).map((s, i) => (
              <li key={i}>{s.skill} — {s.percentage}% of postings</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SkillGapForm;