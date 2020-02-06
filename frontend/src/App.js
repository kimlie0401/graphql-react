import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthPage from "./pages/Auth";
import BookingsPage from "./pages/Bookings";
import EventsPage from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import MainNavigation from "./components/Navigation/MainNavigation";
import AuthContext from "./context/auth-context";
import GlobalStyles from "./components/GlobalStyles";
import Cookies from "js-cookie";

import "./App.css";

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  componentDidMount() {
    this.storeUserInfo();
  }

  storeUserInfo() {
    let store = Cookies.getJSON("login");
    if (store) {
      this.setState({
        token: store.token,
        userId: store.userId
      });
    }
  }

  login = (token, userId, tokenExpiration) => {
    // 15min
    //let inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);

    let expireTime = tokenExpiration / 24; // 1 hour
    Cookies.set(
      "login",
      { token: token, userId: userId },
      { expires: expireTime }
    );
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    Cookies.remove("login");
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <>
        <BrowserRouter>
          <Fragment>
            <AuthContext.Provider
              value={{
                token: this.state.token,
                userId: this.state.userId,
                login: this.login,
                logout: this.logout
              }}
            >
              <MainNavigation />
              <main className="main-content">
                <Switch>
                  {this.state.token && <Redirect from="/" to="/events" exact />}
                  {this.state.token && (
                    <Redirect from="/auth" to="/events" exact />
                  )}
                  {!this.state.token && (
                    <Route path="/auth" component={AuthPage} />
                  )}
                  <Route path="/events/:id" component={EventDetail} />
                  <Route path="/events" component={EventsPage} />

                  {this.state.token && (
                    <Route path="/bookings" component={BookingsPage} />
                  )}
                  {!this.state.token && <Redirect to="/auth" exact />}
                  <Redirect from="*" to="/" />
                </Switch>
              </main>
            </AuthContext.Provider>
          </Fragment>
        </BrowserRouter>
        <GlobalStyles />
      </>
    );
  }
}

export default App;
