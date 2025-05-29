import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function FlashcardResult() {
  const { state } = useLocation();
  const { correctCount = 0, total = 0, incorrectAnswers = [] } = state || {};

  useEffect(() => {
    const prevScores =
      JSON.parse(localStorage.getItem("flashcardScores")) || [];
    localStorage.setItem(
      "flashcardScores",
      JSON.stringify([
        ...prevScores,
        {
          date: new Date().toISOString(),
          score: `${correctCount}/${total}`,
          incorrectAnswers,
        },
      ])
    );
  }, [correctCount, total, incorrectAnswers]);

  return (
    <div className="p-4 text-center max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Results</h2>
      <p className="text-lg mb-2">
        You got {correctCount} out of {total} correct!
      </p>
      {incorrectAnswers.length > 0 && (
        <div className="mt-4 text-left">
          <h3 className="font-semibold mb-2">Review Incorrect Answers:</h3>
          <ul className="list-disc ml-6 space-y-1">
            {incorrectAnswers.map((item, idx) => (
              <li key={idx}>
                <strong>{item.question}</strong> →{" "}
                <span className="text-blue-600">{item.correctAnswer}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
