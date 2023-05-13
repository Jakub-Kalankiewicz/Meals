import { gql } from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    users {
      id
      name
      email
      phone
    }
  }
`;

const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      name
      email
      phone
    }
  }
`;

const GET_USER_ORDERS = gql`
  query getUserOrders($id: ID!) {
    user(id: $id) {
      createdOrders {
        id
        name
        description
        dateTo
        dateFrom
        quantity
        amount
        status
      }
    }
  }
`;

export { GET_USERS, GET_USER, GET_USER_ORDERS };
