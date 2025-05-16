export default function FilterBar({ category, onFilter }) {
    const options = ['All', 'Recent', 'Celebration', 'Thank you', 'Inspiration'];
  
    return (
      <select
        className="filter-bar"
        value={category}
        onChange={e => onFilter(e.target.value)}
      >
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }