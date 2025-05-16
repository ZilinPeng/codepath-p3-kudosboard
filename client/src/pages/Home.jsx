import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import BoardCard from '../components/BoardCard';
import Button from '../components/Button';
import Modal from '../components/Modal';
import NewBoardForm from '../components/NewBoardForm';

export default function Home() {
  const [boards, setBoards] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showBoardModal, setShowBoardModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/boards')
      .then((res) => res.json())
      .then((data) => setBoards(data))
      .catch((err) => console.error('Failed to fetch boards:', err));
  }, []);

  const handleAddBoard = (board) => {
    fetch('http://localhost:3001/boards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(board)
    })
      .then((res) => res.json())
      .then((newBoard) => {
        setBoards((prev) => [...prev, newBoard]);
        setShowBoardModal(false);
      })
      .catch((err) => console.error('Failed to add board:', err));
  };

  const handleDeleteBoard = (boardId) => {
    fetch(`http://localhost:3001/boards/${boardId}`, {
      method: 'DELETE'
    })
      .then(() => {
        setBoards((prev) => prev.filter((b) => b.id !== boardId));
      })
      .catch((err) => console.error('Failed to delete board:', err));
  };

  const filteredBoards = category === 'Recent'
    ? [...boards]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6)
    : category === 'All'
      ? boards
      : boards.filter((b) => b.category === category);

  const displayedBoards = search
    ? filteredBoards.filter((b) =>
        b.title.toLowerCase().includes(search.toLowerCase())
      )
    : filteredBoards;

  return (
    <>
      <Banner />

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Button onClick={() => setShowBoardModal(true)}>+ New Board</Button>
      </div>

      <Modal isOpen={showBoardModal} onClose={() => setShowBoardModal(false)}>
        <NewBoardForm onAdd={handleAddBoard} />
      </Modal>

      <div className="controls">
        <FilterBar category={category} onFilter={setCategory} />
        <SearchBar value={search} onSearch={setSearch} />
      </div>

      <div className="board-grid">
        {displayedBoards.map((board) => (
          <BoardCard key={board.id} board={board} onDelete={handleDeleteBoard} />
        ))}
      </div>
    </>
  );
}