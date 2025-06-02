import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/UseAuth";
import { useQuery } from "@apollo/client";
import { GET_USER_TRANSLATIONS } from "../graphql/queries";

export default function Vocab() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const { data, loading, error } = useQuery(GET_USER_TRANSLATIONS, {
    variables: { token },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading translations.</p>;

  const translations = data?.getUserTranslations || [];

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">
        Your Vocabulary List
      </h2>

      {translations.length === 0 ? (
        <p className="text-gray-600 mb-4">
          You have no saved translations yet. Start learning!
        </p>
      ) : (
        <div className="space-y-3 mb-6">
          {translations.map((item) => (
            <div
              key={item.id}
              className="border p-3 rounded-lg shadow-sm bg-white"
            >
              <p className="font-medium">
                {item.text} → {item.translatedText}
              </p>
              <p className="text-sm text-gray-500">
                {item.sourceLang} → {item.targetLang}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="text-center">
        <Link
          to="/flashcard-results"
          className="bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-700 transition"
        >
          Review Flashcard Results
        </Link>
      </div>
    </div>
  );
}
