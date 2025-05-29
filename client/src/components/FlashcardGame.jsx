import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { TRANSLATE } from "../graphql/mutations";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

const getRandomWords = (count) => {
  const words = [
    "apple",
    "book",
    "cat",
    "dog",
    "house",
    "light",
    "music",
    "rain",
    "sun",
    "tree",
    "window",
    "world",
  ];
  return Array.from(
    { length: count },
    () => words[Math.floor(Math.random() * words.length)]
  );
};

export default function FlashcardGame() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { sourceLang, targetLang, count } = state || {};

  const [translate] = useMutation(TRANSLATE);
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const words = getRandomWords(Number(count));
      const promises = words.map((word) =>
        translate({ variables: { text: word, sourceLang, targetLang } })
      );
      const results = await Promise.all(promises);
      const translated = results.map((res, i) => ({
        original: words[i],
        translated: res.data.translate.translatedText,
      }));
      setCards(translated);
    };
    fetchCards();
  }, [count, sourceLang, targetLang, translate]);

  const handleFlip = () => {
    setFlipped(true);
  };

  const handleNext = () => {
    setFlipped(false);
    if (index + 1 < cards.length) {
      setIndex(index + 1);
    } else {
      navigate("/flashcards/results", {
        state: {
          correctCount: score,
          total: cards.length,
          incorrectAnswers,
        },
      });
    }
  };

  const handleGuess = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      setIncorrectAnswers((prev) => [
        ...prev,
        {
          question: cards[index].original,
          correctAnswer: cards[index].translated,
        },
      ]);
    }
    handleFlip();
  };

  if (cards.length === 0) return <p>Loading cards...</p>;

  const currentCard = cards[index];

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h2 className="text-xl font-bold text-center mb-4">
        Flashcard {index + 1} of {cards.length}
      </h2>

      <MotionDiv
        className="w-full h-48 bg-white rounded-xl shadow-lg flex items-center justify-center text-2xl font-semibold border border-gray-300 cursor-pointer transition-transform duration-700"
        animate={{ rotateY: flipped ? 180 : 0 }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
          backgroundColor: "#f9fafb",
        }}
        onClick={!flipped ? handleFlip : undefined}
      >
        {flipped ? currentCard.translated : currentCard.original}
      </MotionDiv>

      {!flipped ? (
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleGuess(true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            I knew it
          </button>
          <button
            onClick={() => handleGuess(false)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            I didn’t know
          </button>
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
