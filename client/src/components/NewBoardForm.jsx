import { useState } from 'react';

export default function NewBoardForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Select category');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !category) return;

    const newBoard = {
      title: title.trim(),
      category,
      author: author.trim(),
      imageUrl: `https://via.placeholder.com/300x150?text=${encodeURIComponent(title)}`,
    };

    onAdd(newBoard);
    setTitle('');
    setCategory('Celebration');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title (required): </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Category (required): </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select category</option>
          <option value="Celebration">Celebration</option>
          <option value="Thank you">Thank you</option>
          <option value="Inspiration">Inspiration</option>
        </select>
      </div>

      <div>
        <label>Author (optional): </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <button type="submit">Create Board</button>
    </form>
  );
}