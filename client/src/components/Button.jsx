export default function Button({ children, onClick, type = 'button', className = '' }) {
    return (
      <button type={type} onClick={onClick} className={`button-common`}>
        {children}
      </button>
    );
  }