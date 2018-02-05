import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import registerServiceWorker from "./registerServiceWorker";
import store from "./redux/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import muiTheme from "./config/theme";

import PrivateRoute from "./components/PrivateRoute"
import Layout from "./components/Layout";
import Login from "./containers/Login";
import Profile from "./containers/Profile";
import Share from "./containers/Share"
import Items from "./containers/Items";
import NotFound from "./containers/NotFound";
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";
import { firebaseAuth} from "./config/firebaseConfig"
import { client } from "./config/apolloClient";
import { updateAuthState, userLoading } from './redux/modules/auth'


let gotProfile = false;
store.subscribe(() => {
  const values = store.getState();
  if (values.auth.authenticated === 'LOADING_USER' && !gotProfile) {
    gotProfile = true;
    store.dispatch(userLoading(false));
  }
});




firebaseAuth.onAuthStateChanged(user => {
  if (user) {
    store.dispatch(updateAuthState(user))
  } else {
    store.dispatch(updateAuthState(false))
  }
});

const Boomtown = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <div>
            <Layout>
              <Switch> 
              <PrivateRoute exact path="/" component={Items} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/share" component={Share} />
              <PrivateRoute exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="*" component={NotFound} />
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
