import { gql } from "@apollo/client";

const GET_ORDERS = gql`
  query getOrders {
    orders {
      id
      description
      quantity
      amount
      status
      user {
        id
      }
    }
  }
`;

const GET_ORDER = gql`
  query getOrder($id: ID!) {
    order(id: $id) {
        id
        name
        description
        status
        user {
            id
            name
            email
            phone
        }
    }
  }
`

export {GET_ORDER,GET_ORDERS};