function FinishScreen({ points, maxPossiblePoints, highscore }) {
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🏆";
  if (percentage >= 80 && percentage < 100) emoji = "🥇";
  if (percentage >= 50 && percentage < 80) emoji = "💐";
  if (percentage >= 0 && percentage < 50) emoji = "🫥";
  if (percentage === 0) emoji = "🥲";

  return (
    <>
      <p className="result">
        You have finished the quiz with {points} points out of{" "}
        {maxPossiblePoints}({Math.ceil(percentage)}%).{" "}
        {percentage > 50
          ? `Well done! ${emoji}`
          : `${emoji}Better luck next time!`}
      </p>
      <p className="highscore">
        <strong>(Highscore: {highscore} points</strong>)
      </p>
    </>
  );
}

export default FinishScreen;
