import { Routes, Route } from 'react-router-dom';
import FlashcardSetup from '../components/FlashcardSetup';
import FlashcardGame from '../components/FlashcardGame';
import FlashcardResult from '../components/FlashcardResult';
import './styles.css';

export default function Flashcards() {
  return (
    <Routes>
      <Route path="/" element={<FlashcardSetup />} />
      <Route path="/play" element={<FlashcardGame />} />
      <Route path="/results" element={<FlashcardResult />} />
    </Routes>
  );
}
