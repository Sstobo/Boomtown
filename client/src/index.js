import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import registerServiceWorker from "./registerServiceWorker";
import store from "./redux/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import muiTheme from "./config/theme";

import Layout from "./components/Layout";
import Login from "./containers/Login";
import Profile from "./containers/Profile";
import Items from "./containers/Items";
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
});

const Boomtown = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/login" component={Login} />
            <Layout>
              <Switch>
                <Route exact path="/" component={Items} />
                <Route exact path="/profile/:userid" component={Profile} />

                {/* <Route exact path="/share" component={} /> */}
              </Switch>
            </Layout>
          </div>
        </Router>
      </Provider>
    </ApolloProvider>
  </MuiThemeProvider>
);

ReactDOM.render(<Boomtown />, document.getElementById("root"));
registerServiceWorker();
