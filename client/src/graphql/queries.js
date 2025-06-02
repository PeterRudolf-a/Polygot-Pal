import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query getCurrentUser($token: String!) {
    getCurrentUser(token: $token) {
      id
      name
      email
    }
  }
`;

export const GET_USER_TRANSLATIONS = gql`
  query getUserTranslations($token: String!) {
    getUserTranslations(token: $token) {
      id
      text
      translatedText
      sourceLang
      targetLang
    }
  }
`;

export const GET_FLASHCARD_RESULTS = gql`
  query GetFlashcardResults($token: String!) {
    getFlashcardResults(token: $token) {
      id
      date
      language
      correct
      total
    }
  }
`;