import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [skill, setSkill] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ keyword, location, skill });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Keyword (e.g. developer)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Skill (e.g. python)"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;