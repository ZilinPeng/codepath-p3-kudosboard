import { useState } from 'react';

export default function SearchBar({ value, onSearch }) {
  const [input, setInput] = useState(value);

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(input);
  };

  const handleClear = () => {
    setInput('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search boards..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button className="button-common" type="submit"> Search </button>
      <button className="button-common" type="button" onClick={handleClear}> Clear </button>
    </form>
  );
}