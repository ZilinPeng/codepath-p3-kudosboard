import { useNavigate } from 'react-router-dom';

export default function BoardCard({ board, onDelete }) {
  const navigate = useNavigate();
  const randomImage = `https://picsum.photos/seed/${board.id}-static/300/200.jpg`;
  
  const handleView = () => {
    navigate(`/boards/${board.id}`);
  };

  const handleDelete = () => {
    onDelete(board.id);

  };

  return (
    <div className="board-preview">
      <img src={randomImage} alt={board.title} />
      <h3>{board.title}</h3>
      <p>Category: {board.category}</p>
      {board.author && <p>Author: {board.author}</p>}

      <div>
        <button className="view-board" onClick={handleView}>View</button>
        <button className="delete-board" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}