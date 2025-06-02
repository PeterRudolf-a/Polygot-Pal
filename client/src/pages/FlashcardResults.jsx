import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/UseAuth";
import { useQuery } from "@apollo/client";
import { GET_FLASHCARD_RESULTS } from "../graphql/queries";

export default function FlashcardResults() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const { data, loading, error } = useQuery(GET_FLASHCARD_RESULTS, {
    variables: { token },
  });

  if (loading) return <p>Loading flashcard results...</p>;
  if (error) return <p>Error fetching flashcard results.</p>;

  const results = data?.getFlashcardResults || [];

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-purple-700">
        Past Flashcard Sessions
      </h2>

      {results.length === 0 ? (
        <p className="text-gray-600">
          No flashcard game results yet. Start playing!
        </p>
      ) : (
        <div className="space-y-4">
          {results.map((session) => (
            <div
              key={session.id}
              className="border p-4 rounded-lg bg-white shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-lg">
                  {session.date} — Score: {session.correct}/{session.total}
                </p>
                <p className="text-sm text-gray-500">
                  Language: {session.language}
                </p>
              </div>
              <Link
                to={`/retry-flashcards/${session.id}`}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Retry
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
