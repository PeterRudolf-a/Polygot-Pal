import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;


export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const TRANSLATE = gql`
  mutation translate($text: String!, $sourceLang: String!, $targetLang: String!) {
    translate(text: $text, sourceLang: $sourceLang, targetLang: $targetLang) {
      translatedText
      match
      source
      target
    }
  }
`;

export const SAVE_TRANSLATION = gql`
  mutation saveTranslation(
    $token: String!
    $text: String!
    $translatedText: String!
    $sourceLang: String!
    $targetLang: String!
  ) {
    saveTranslation(
      token: $token
      text: $text
      translatedText: $translatedText
      sourceLang: $sourceLang
      targetLang: $targetLang
    ) {
      id
      text
      translatedText
    }
  }
`;