function JobCard({ job }) {
    return (
        <div style={{
            border: '1px solid #e0e0f0',
            borderRadius: '10px',
            padding: '16px',
            marginBottom: '12px',
            backgroundColor: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
        }}>
            <h3>{job.title}</h3>
            <p><strong>{job.company}</strong> — {job.location}</p>
            <p style={{ fontSize: '0.85em', color: '#666' }}>{job.skills_text}</p>
            <a href={job.apply_link} target="_blank" rel="noopener noreferrer">
                View / Apply
            </a>
        </div>
    );
}

export default JobCard;