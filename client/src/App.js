import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import Header from "./components/Header";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Project from "./components/pages/Project";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

function App() {
  const Layout = () => {
    return (
      <>
        <Header />
        <div className="container">
          <Outlet />
        </div>
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/project/:id",
          element: <Project  />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </>
  );
}

export default App;
