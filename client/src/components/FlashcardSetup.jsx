import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageDropdown from "./LanguageDropdown";

export default function FlashcardSetup() {
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("fr");
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  const handleStart = () => {
    const countNum = parseInt(count);
    if (!sourceLang || !targetLang || countNum < 5 || countNum > 20) return;
    navigate("/flashcards/play", {
      state: { sourceLang, targetLang, count: countNum },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4 p-4">
      <h2 className="text-2xl font-bold text-center">Flashcard Setup</h2>
      <LanguageDropdown
        label="Source Language"
        value={sourceLang}
        onChange={setSourceLang}
      />
      <LanguageDropdown
        label="Target Language"
        value={targetLang}
        onChange={setTargetLang}
      />
      <input
        type="number"
        min="5"
        max="20"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Number of flashcards"
      />
      <button
        onClick={handleStart}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Start Flashcards
      </button>
    </div>
  );
}
