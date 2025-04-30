import { useEffect } from 'react';

export default function FlashcardResult({ correctCount, total, incorrectAnswers }) {
  useEffect(() => {
    // Store incorrect answers and score
    const prevScores = JSON.parse(localStorage.getItem('flashcardScores')) || [];
    localStorage.setItem('flashcardScores', JSON.stringify([
      ...prevScores,
      { date: new Date().toISOString(), score: `${correctCount}/${total}`, incorrectAnswers }
    ]));
  }, [correctCount, total, incorrectAnswers]);

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Results</h2>
      <p className="text-lg">You got {correctCount} out of {total} correct!</p>
      {incorrectAnswers.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Review Incorrect Answers:</h3>
          <ul className="list-disc mt-2 text-left ml-6">
            {incorrectAnswers.map((item, idx) => (
              <li key={idx}>{item.question} → Correct: {item.correctAnswer}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
