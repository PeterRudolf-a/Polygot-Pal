import { useParams, useQuery } from "@apollo/client";
import { GET_FLASHCARD_SESSION } from "../graphql/queries";
import FlashcardGame from "./FlashcardGame";

export default function RetryFlashcards() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_FLASHCARD_SESSION, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading session.</p>;

  const session = data.getFlashcardSession;
  const words = session.incorrectWords.map((text) => ({
    text,
    translatedText: "...", // You'll need to re-translate or store `translatedText` too.
  }));

  return <FlashcardGame words={words} language={session.language} />;
}
