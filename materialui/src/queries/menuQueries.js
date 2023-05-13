import { gql } from "@apollo/client";

const GET_MENUS = gql`
  query getMenus {
    menus {
      id
      name
    }
  }
`;

const GET_MENU = gql`
  query getMenu($name: String!) {
    menu(name: $name) {
      dishes {
        name
        description
      }
    }
  }
`;

export { GET_MENUS, GET_MENU };
