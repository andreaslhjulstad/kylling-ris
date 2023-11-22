import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/app";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { apolloClient } from "./apollo-client/apollo-client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
