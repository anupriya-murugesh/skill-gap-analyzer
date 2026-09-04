import { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './components/JobCard';
import SearchBar from './components/SearchBar';
import DemandChart from './components/DemandChart';
import SkillGapForm from './components/SkillGapForm';

function App() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = (filters = {}) => {
    axios.get('http://127.0.0.1:8000/api/jobs/', { params: filters })
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching jobs:', error));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <h1>Skill Gap Analyzer</h1>
      <DemandChart />
      <SkillGapForm />
      <SearchBar onSearch={fetchJobs} />
      <p>{jobs.length} job(s) found</p>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default App;