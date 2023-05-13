import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import { AuthContext } from "./context/auth-context";
import { useContext } from "react";
import Auth from "./pages/Auth";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import About from "./pages/About";
import MyOrder from "./pages/MyOrder";
import Customers from "./pages/Customers";
import HomePage from "./pages/Home";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        user: {
          merge(existing, incoming) {
            return { ...existing, ...incoming };
          },
        },
        users: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        orders: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
});

function App() {
  const authContext = useContext(AuthContext);

  if (!authContext.token) {
    client.resetStore();
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        { path: "/menu", element: <Menu /> },
        { path: "/aboutus", element: <About /> },
        { path: "/contact", element: <Contact /> },
        {
          path: "/orders",
          element: authContext.token ? <MyOrder /> : <Navigate to="/" />,
        },
        {
          path: "/customers",
          element: authContext.token ? <Customers /> : <Navigate to="/" />,
        },
      ],
    },
    { path: "/auth", element: <Navigate to="/auth/signin" /> },
    {
      path: "/auth/signin",
      element: authContext.token ? <Navigate to="/" /> : <Auth />,
    },
    {
      path: "/auth/signup",
      element: authContext.token ? <Navigate to="/" /> : <Auth />,
    },
    { path: "/:incorrect", element: <ErrorPage /> },
    {
      path: "/auth/:incorrect",
      element: authContext.token ? (
        <Navigate to="/" />
      ) : (
        <Navigate to="/auth/signin" />
      ),
    },
  ]);
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
