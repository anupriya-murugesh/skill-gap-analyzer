import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function DemandChart() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/demand-ranking/')
      .then(response => {
        setRanking(response.data.slice(0, 10));
      })
      .catch(error => console.error('Error fetching demand ranking:', error));
  }, []);

  return (
    <div style={{ marginBottom: '30px' }}>
      <h2>Top In-Demand Skills</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={ranking}>
          <XAxis dataKey="skill" />
          <YAxis label={{ value: '% of postings', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey="percentage" fill="#3E7BFA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DemandChart;