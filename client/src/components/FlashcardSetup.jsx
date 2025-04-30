import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FlashcardSetup() {
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("fr");
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/flashcards/play", { state: { sourceLang, targetLang, count } });
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Flashcard Setup</h2>
      <input
        placeholder="Source Language"
        value={sourceLang}
        onChange={(e) => setSourceLang(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        placeholder="Target Language"
        value={targetLang}
        onChange={(e) => setTargetLang(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        min="5"
        max="20"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleStart}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Start Flashcards
      </button>
    </div>
  );
}
