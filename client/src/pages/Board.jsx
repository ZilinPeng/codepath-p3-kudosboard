import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NewCardForm from '../components/NewCardForm';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';

const remotUrl = 'https://codepath-p3-kudosboard-back.onrender.com'

export default function Board() {
  const { id } = useParams();
  const boardId = Number(id);

  const [board, setBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [showCardModal, setShowCardModal] = useState(false);

  // Fetch board and cards
  useEffect(() => {
    fetch(`${remotUrl}/boards/${boardId}`)
      .then((res) => res.json())
      .then((data) => {
        setBoard(data);
        setCards(data.cards || []);
      })
      .catch((err) => console.error('Failed to load board:', err));
  }, [boardId]);

  const handleAddCard = (card) => {
    fetch(`${remotUrl}/cards/board/${boardId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card)
    })
      .then((res) => res.json())
      .then((newCard) => {
        setCards((prev) => [...prev, newCard]);
        setShowCardModal(false);
      })
      .catch((err) => console.error('Failed to add card:', err));
  };

  const handleUpvote = (cardId) => {
    const card = cards.find((c) => c.id === cardId);
    const updatedCard = { ...card, upvotes: card.upvotes + 1 };
  
    fetch(`${remotUrl}/cards/${cardId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCard)
    })
      .then((res) => res.json())
      .then((savedCard) => {
        setCards((prev) =>
          prev.map((c) => (c.id === cardId ? savedCard : c))
        );
      })
      .catch((err) => console.error('Failed to update upvote:', err));
  };

  const handleDelete = (cardId) => {
    fetch(`${remotUrl}/cards/${cardId}`, {
      method: 'DELETE'
    })
      .then(() => {
        setCards((prev) => prev.filter((c) => c.id !== cardId));
      })
      .catch((err) => console.error('Failed to delete card:', err));
  };

  return (
    <>
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <Link to="/">click: Back to Home</Link>
        <h2>{board ? board.title : 'Loading...'}</h2>
      </div>

      <Button onClick={() => setShowCardModal(true)}>+ Add Card</Button>

      <Modal isOpen={showCardModal} onClose={() => setShowCardModal(false)}>
        <NewCardForm onAdd={handleAddCard} />
      </Modal>

      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onUpvote={handleUpvote}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
}