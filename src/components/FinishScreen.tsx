interface FinishScreenProps {
  points: number;
  maxPoints: number;
  highScore: number;
}

function FinishScreen({ points, maxPoints, highScore }: FinishScreenProps) {
  const percentage = Math.round((points / maxPoints) * 100);
  let emoji;

  if (percentage === 100) emoji = '🥇';
  if (percentage >= 80 && percentage < 100) emoji = '🥈';
  if (percentage >= 60 && percentage < 80) emoji = '🥉';
  if (percentage >= 50 && percentage < 60) emoji = '🎉';
  if (percentage < 50 && percentage !== 0) emoji = '❌';
  if (percentage === 0) emoji = '🤦‍♂️';

  return (
    <>
      <p className="result">
        {emoji} You scored <strong>{points}</strong> out of {maxPoints} (
        {percentage}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
    </>
  );
}

export default FinishScreen;
