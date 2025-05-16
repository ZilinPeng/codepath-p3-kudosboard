import { useState } from 'react';

export default function NewCardForm({ onAdd }) {
  const [message, setMessage] = useState('');
  const [gifQuery, setGifQuery] = useState('');
  const [gifResults, setGifResults] = useState([]);
  const [gifUrl, setGifUrl] = useState('');
  const [author, setAuthor] = useState('');

  const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

  const searchGifs = async () => {
    if (!gifQuery.trim()) return;
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${gifQuery}&limit=5`
    );
    const data = await res.json();
    setGifResults(data.data);
  };

  const handleGifSelect = (gif) => {
    const url = gif.images.fixed_height.url;
    setGifUrl(url); 
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || !gifUrl.trim()) return;

    onAdd({
      message: message.trim(),
      gifUrl: gifUrl.trim(),
      author: author.trim(),
      upvotes: 0,
    });


    setMessage('');
    setGifQuery('');
    setGifResults([]);
    setGifUrl('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Message (required): </label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Search GIPHY (optional): </label>
        <input
          type="text"
          placeholder="Search for a GIF"
          value={gifQuery}
          onChange={(e) => setGifQuery(e.target.value)}
        />
        <button type="button" onClick={searchGifs}>Search</button>
      </div>

      <div>
        <label>GIF URL (required): </label>
        <input
          type="text"
          placeholder="Paste a GIF URL or select from search results"
          value={gifUrl}
          onChange={(e) => setGifUrl(e.target.value)}
          required
        />
      </div>

      <div>
        {gifResults.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.fixed_height.url}
            alt="gif"
            onClick={() => handleGifSelect(gif)}
            style={{
              width: '100px',
              border: gifUrl === gif.images.fixed_height.url ? '2px solid blue' : '1px solid gray',
              cursor: 'pointer',
              marginRight: '8px'
            }}
          />
        ))}
      </div>

      <div>
        <label>Author (optional): </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <button type="submit">Add Card</button>
    </form>
  );
}