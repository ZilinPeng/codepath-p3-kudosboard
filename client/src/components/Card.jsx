export default function Card({ card, onUpvote, onDelete }) {
    return (
        <div className="card">
            <p className="card-message">{card.message}</p>
            <img src={card.gifUrl} alt={card.message} className="card-gif" />
            <button className="upvote-button" onClick={() => onUpvote(card.id)}>Upvotes: {card.upvotes}</button>
            <button className="delete-button" onClick={() => onDelete(card.id)}> Delete</button>
        </div>
    );
}