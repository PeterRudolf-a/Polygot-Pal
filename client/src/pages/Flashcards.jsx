import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TRANSLATE } from '../graphql/mutations';

const randomWords = ["hello", "world", "cat", "dog", "apple", "book", "house", "car", "love", "music"]; // Just for now

export default function Flashcards() {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const [translateText] = useMutation(TRANSLATE);

  const startSession = async () => {
    const selectedWords = randomWords.sort(() => 0.5 - Math.random()).slice(0, 5); // pick 5 random words
    const translations = [];

    for (const word of selectedWords) {
      try {
        const { data } = await translateText({ variables: { text: word, sourceLang, targetLang } });
        translations.push({ original: word, translated: data.translate.translatedText });
      } catch (error) {
        console.error(`Failed to translate "${word}"`, error);
      }
    }

    setFlashcards(translations);
    setCurrentIndex(0);
    setShowTranslation(false);
  };

  const handleFlip = () => {
    setShowTranslation(!showTranslation);
  };

  const handleNext = () => {
    setShowTranslation(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  if (flashcards.length === 0) {
    return (
      <div className="mt-10 p-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Start a Flashcard Session</h2>

        <input
          className="border p-2 w-full rounded mb-4"
          placeholder="Source Language (e.g., en)"
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
        />
        <input
          className="border p-2 w-full rounded mb-4"
          placeholder="Target Language (e.g., es)"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        />

        <button
          onClick={startSession}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
        >
          Start Flashcards
        </button>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <div className="mt-10 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Flashcards</h2>

      <div className="border rounded-lg p-10 shadow-md bg-white text-center w-80 min-h-[200px] flex flex-col justify-center">
        <p className="text-xl">
          {showTranslation ? currentCard.translated : currentCard.original}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {sourceLang} → {targetLang}
        </p>
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleFlip}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {showTranslation ? 'Hide' : 'Flip'}
        </button>
        <button
          onClick={handleNext}
          className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}
