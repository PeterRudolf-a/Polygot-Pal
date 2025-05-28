import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { TRANSLATE } from "../graphql/mutations";
import { motion } from "framer-motion";

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
      const results = await Promise.all(
        words.map((word) =>
          translate({ variables: { text: word, sourceLang, targetLang } })
        )
      );
      const translated = results.map((res, i) => ({
        original: words[i],
        translated: res.data.translate.translatedText,
      }));
      setCards(translated);
    };

    fetchCards();
  }, [count, sourceLang, targetLang, translate]);

  const handleReveal = () => {
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

  const handleMarkCorrect = () => {
    setScore(score + 1);
    handleNext();
  };

  const handleMarkIncorrect = () => {
    setIncorrectAnswers((prev) => [
      ...prev,
      {
        question: cards[index].original,
        correctAnswer: cards[index].translated,
      },
    ]);
    handleNext();
  };

  if (cards.length === 0)
    return <p className="text-center mt-10">Loading cards...</p>;

  const currentCard = cards[index];

  return (
    <div className="max-w-md mx-auto mt-10 text-center space-y-6">
      <h2 className="text-xl font-semibold">
        Flashcard {index + 1} of {cards.length}
      </h2>

      {/* Flip card using motion.div */}
      <div className="w-full h-48 perspective">
        <motion.div
          className="relative w-full h-full"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            transformStyle: "preserve-3d",
            position: "relative",
          }}
        >
          <motion.div
            className="absolute w-full h-full flex items-center justify-center bg-white text-2xl font-bold rounded shadow"
            style={{ backfaceVisibility: "hidden" }}
          >
            {currentCard.original}
          </motion.div>

          <motion.div
            className="absolute w-full h-full flex items-center justify-center bg-green-100 text-2xl font-bold rounded shadow"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            {currentCard.translated}
          </motion.div>
        </motion.div>
      </div>

      {!flipped ? (
        <button
          onClick={handleReveal}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Flip to Reveal
        </button>
      ) : (
        <div className="space-x-4">
          <button
            onClick={handleMarkCorrect}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            I got it right
          </button>
          <button
            onClick={handleMarkIncorrect}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            I got it wrong
          </button>
        </div>
      )}
    </div>
  );
}
