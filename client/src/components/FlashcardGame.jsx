import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SAVE_FLASHCARD_RESULT } from "../graphql/mutations";
import { useAuth } from "../context/UseAuth";
import { useNavigate } from "react-router-dom";

export default function FlashcardGame({ words, language }) {
  const { token } = useAuth(); // 'user' removed
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [guess, setGuess] = useState("");
  const [results, setResults] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [saveResult] = useMutation(SAVE_FLASHCARD_RESULT);

  const currentWord = words[index];

  const handleFlip = () => {
    setShowAnswer(true);
  };

  const handleNext = () => {
    const isCorrect =
      guess.trim().toLowerCase() === currentWord.text.toLowerCase();
    setResults([...results, isCorrect]);
    if (!isCorrect) setIncorrect([...incorrect, currentWord]);

    setShowAnswer(false);
    setGuess("");
    if (index < words.length - 1) {
      setIndex(index + 1);
    } else {
      // Save result when done
      saveResult({
        variables: {
          token,
          correct: results.filter((r) => r).length + (isCorrect ? 1 : 0),
          total: words.length,
          language,
          incorrectWords: [
            ...incorrect,
            ...(isCorrect ? [] : [currentWord]),
          ].map((w) => w.text),
        },
      });
      navigate("/flashcard-results");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl mb-4 text-center text-blue-800">
        Flashcard {index + 1} of {words.length}
      </h2>

      <div className="text-center p-6 border rounded mb-4">
        <p className="text-lg font-bold mb-2">{currentWord.translatedText}</p>

        {!showAnswer ? (
          <>
            <input
              type="text"
              className="border px-3 py-2 w-full rounded mb-2"
              placeholder="Type your guess..."
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
            <button
              onClick={handleFlip}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Flip
            </button>
          </>
        ) : (
          <>
            <p className="text-green-600 mt-2">Answer: {currentWord.text}</p>
            <p className="text-sm text-gray-500">
              You were{" "}
              {guess.toLowerCase() === currentWord.text.toLowerCase()
                ? "✅ Correct"
                : "❌ Incorrect"}
            </p>
            <button
              onClick={handleNext}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
}
