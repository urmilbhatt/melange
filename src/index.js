import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PlanetSearch from "./components/PlanetSearch";
import Planet from "./components/Planet";
import Logo from "./components/shared/Logo";
import "./index.css";

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT;
const ADMIN_SECRET = process.env.REACT_APP_ADMIN_SECRET;

const httpLink = new HttpLink({
  uri: `https://${GRAPHQL_ENDPOINT}`,
  headers: {
    "content-type": "application/json",
    'x-hasura-admin-secret': `${ADMIN_SECRET}`
  }
});

const wsLink = new WebSocketLink({
  uri: `ws://${GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "content-type": "application/json",
        'x-hasura-admin-secret': `${ADMIN_SECRET}`
      }
    }
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Logo />
      <Switch>
        <Route path="/planet/:id" component={Planet} />
        <Route path="/" component={PlanetSearch} />
      </Switch>
    </ApolloProvider>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));