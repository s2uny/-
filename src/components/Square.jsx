function Square({ value, onClick }) {
  return (
    <button type="button" className="square-button" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
