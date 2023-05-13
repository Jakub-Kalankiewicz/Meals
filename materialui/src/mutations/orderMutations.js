import { gql } from "@apollo/client";

const ADD_ORDER = gql`
  mutation AddOrder(
    $name: String!
    $description: String!
    $dateFrom: String!
    $dateTo: String!
    $amount: Float!
    $quantity: Int!
    $status: OrderStatus!
  ) {
    addOrder(
      name: $name
      description: $description
      dateFrom: $dateFrom
      dateTo: $dateTo
      amount: $amount
      quantity: $quantity
      status: $status
    ) {
      id
      name
      description
      dateFrom
      dateTo
      amount
      quantity
      status
      user {
        id
        name
        email
        phone
      }
    }
  }
`;

const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      id
    }
  }
`;

const UPDATE_ORDER = gql`
  mutation UpdateOrder(
    $id: ID!
    $name: String!
    $description: String!
    $status: OrderStatusUpdate!
    $dateTo: String!
    $dateFrom: String!
    $amount: Float!
    $quantity: Int!
  ) {
    updateOrder(
      id: $id
      name: $name
      description: $description
      status: $status
      dateTo: $dateTo
      dateFrom: $dateFrom
      amount: $amount
      quantity: $quantity
    ) {
      id
    }
  }
`;

const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($id: ID!, $status: OrderStatusUpdateNew!) {
    updateOrderStatus(id: $id, status: $status) {
      id
    }
  }
`;

export { ADD_ORDER, DELETE_ORDER, UPDATE_ORDER, UPDATE_ORDER_STATUS };
