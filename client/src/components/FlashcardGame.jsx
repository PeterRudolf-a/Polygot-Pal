import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { TRANSLATE } from "../graphql/mutations";

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
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === cards[index].translated.toLowerCase()) {
      setScore(score + 1);
    }
    if (index + 1 < cards.length) {
      setIndex(index + 1);
      setAnswer("");
    } else {
      navigate("/flashcards/results", {
        state: { score, total: cards.length },
      });
    }
  };

  if (cards.length === 0) return <p>Loading cards...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold">Translate: {cards[index].original}</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-2 border rounded"
          placeholder={`Translate to ${targetLang}`}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          autoFocus
        />
        <button className="w-full bg-green-500 text-white p-2 mt-2 rounded">
          Submit
        </button>
      </form>
      <p className="text-sm text-gray-600">
        Card {index + 1} of {cards.length}
      </p>
    </div>
  );
}
