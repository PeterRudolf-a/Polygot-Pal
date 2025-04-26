import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TRANSLATE, SAVE_TRANSLATION } from '../graphql/mutations'; // Import SAVE_TRANSLATION
import { useAuth } from '../context/UseAuth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, token } = useAuth(); // You need token now!
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('fr');
  const [translatedResult, setTranslatedResult] = useState(null);
  const [message, setMessage] = useState('');

  const [translateText, { loading, error }] = useMutation(TRANSLATE);
  const [saveTranslation] = useMutation(SAVE_TRANSLATION); // Set up save mutation

  const handleTranslate = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const { data } = await translateText({
        variables: { text, sourceLang, targetLang },
      });
      setTranslatedResult(data.translate);
    } catch (err) {
      console.error('Translation failed', err);
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
      setMessage('Translation saved successfully!');
      console.log('Saved translation:', data.saveTranslation);
    } catch (err) {
      console.error('Error saving translation:', err);
      setMessage('Failed to save translation.');
    }
  };

  return (
    <div className="mt-10 p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Translate Text</h2>

      <form onSubmit={handleTranslate} className="space-y-4">
        <input
          className="border p-2 w-full rounded"
          placeholder="Enter text to translate"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <div className="flex space-x-2">
          <input
            className="border p-2 flex-1 rounded"
            placeholder="Source Language (e.g., en)"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          />
          <input
            className="border p-2 flex-1 rounded"
            placeholder="Target Language (e.g., fr)"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
          disabled={loading}
        >
          {loading ? 'Translating...' : 'Translate'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">Error translating text.</p>}

      {translatedResult && (
        <div className="mt-6 border p-4 rounded bg-gray-50">
          <h3 className="text-lg font-bold mb-2">Translation Result</h3>
          <p className="text-xl">{translatedResult.translatedText}</p>
          <p className="text-sm text-gray-500 mt-1">
            {translatedResult.source} → {translatedResult.target}
          </p>
          <button
            onClick={handleSaveTranslation}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
          >
            Save Translation
          </button>
        </div>
      )}

      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
}
