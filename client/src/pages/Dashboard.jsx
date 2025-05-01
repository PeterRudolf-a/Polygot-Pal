import { useState } from "react";
import { useMutation } from "@apollo/client";
import { TRANSLATE, SAVE_TRANSLATION } from "../graphql/mutations";
import { useAuth } from "../context/UseAuth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("fr");
  const [translatedResult, setTranslatedResult] = useState(null);
  const [message, setMessage] = useState("");

  const [translateText, { loading, error }] = useMutation(TRANSLATE);
  const [saveTranslation] = useMutation(SAVE_TRANSLATION);

  const handleTranslate = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const { data } = await translateText({
        variables: { text, sourceLang, targetLang },
      });
      setTranslatedResult(data.translate);
    } catch (err) {
      console.error("Translation failed", err);
    }
  };

  const handleSaveTranslation = async () => {
    if (!translatedResult) return;

    try {
      const { data } = await saveTranslation({
        variables: {
          token,
          text,
          translatedText: translatedResult.translatedText,
          sourceLang,
          targetLang,
        },
      });
      setMessage(`✅ Saved: ${data.saveTranslation.translatedText}`);
    } catch (err) {
      console.error("Error saving translation:", err);
      setMessage("❌ Failed to save translation.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 py-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">
        Translate Text
      </h2>

      <form onSubmit={handleTranslate} className="space-y-4">
        <textarea
          rows="3"
          className="w-full border border-gray-300 p-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter text to translate"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <div className="flex space-x-4">
          <input
            className="flex-1 border border-gray-300 p-3 rounded focus:outline-none"
            placeholder="Source Lang (e.g., en)"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          />
          <input
            className="flex-1 border border-gray-300 p-3 rounded focus:outline-none"
            placeholder="Target Lang (e.g., fr)"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
          disabled={loading}
        >
          {loading ? "Translating..." : "Translate"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">❗ Error translating text.</p>}

      {translatedResult && (
        <div className="mt-8 border p-4 rounded bg-gray-50 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Translation Result</h3>
          <p className="text-lg">{translatedResult.translatedText}</p>
          <p className="text-sm text-gray-500 mt-1 italic">
            {translatedResult.source} → {translatedResult.target}
          </p>
          <button
            onClick={handleSaveTranslation}
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full transition duration-200"
          >
            Save Translation
          </button>
        </div>
      )}

      {message && (
        <p className="mt-6 text-center text-green-600 font-medium">{message}</p>
      )}
    </div>
  );
}
