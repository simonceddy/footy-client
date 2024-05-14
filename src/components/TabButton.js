function TabButton({ children, onClick, selected = false }) {
  return (
    <button
      type="button"
      className={`text-lg font-bold my-2 capitalize border p-1 border-green-800 ${selected ? 'bg-green-800 text-pink-300' : ''}`}
      onClick={onClick}
      disabled={selected}
    >
      {children}
    </button>
  );
}

export default TabButton;
