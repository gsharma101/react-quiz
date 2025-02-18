function Options({question}) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button key={option} className="btn btn-option">
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
