"use client";
import { useState } from 'react';

export default function VectorSearchDemo() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    const response = await fetch('/api/vector-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });
    const data = await response.json();
    setResults(data);
  };

  return (
    <div>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search for similar entries..."
      />
      <button onClick={handleSearch}>Search</button>
      
      <ul>
        {results.map((item, index) => (
          <li key={index}>
            <strong>{item.title}</strong>: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}