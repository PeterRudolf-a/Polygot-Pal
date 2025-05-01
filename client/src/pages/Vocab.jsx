import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UseAuth';
import { useQuery } from '@apollo/client';
import { GET_USER_TRANSLATIONS } from '../graphql/queries';
import './styles.css';

export default function Vocab() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const { data, loading, error } = useQuery(GET_USER_TRANSLATIONS, { variables: { token } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading translations.</p>;

  const translations = data?.getUserTranslations || [];

  return (
    <div className="mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Your Vocabulary List</h2>

      {translations.length === 0 ? (
        <p className="text-gray-600">You have no saved translations yet. Start learning!</p>
      ) : (
        translations.map(item => (
          <div key={item.id} className="border p-2 mb-2 rounded">
            <p className="font-semibold">{item.text} → {item.translatedText}</p>
            <p className="text-sm text-gray-500">{item.sourceLang} → {item.targetLang}</p>
          </div>
        ))
      )}
    </div>
  );
}
