import { gql } from "@apollo/client";

const ADD_USER = gql`
  mutation addUser(
    $name: String!
    $email: String!
    $phone: String!
    $password: String!
  ) {
    addUser(name: $name, email: $email, phone: $phone, password: $password) {
      id
      name
      email
      phone
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $name: String!
    $email: String!
    $phone: String!
  ) {
    updateUser(id: $id, name: $name, email: $email, phone: $phone) {
      id
    }
  }
`;

export { ADD_USER, DELETE_USER, LOGIN, UPDATE_USER };
