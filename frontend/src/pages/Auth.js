import React, { Component, Fragment } from "react";

import "./Auth.css";
import AuthContext from "../context/auth-context";

class AuthPage extends Component {
  state = {
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = event => {
    event.preventDefault();
    if (this.state.isLogin) {
      const email = this.emailEl.current.value;
      const password = this.passwordEl.current.value;

      if (email.trim().length === 0 || password.trim().length === 0) {
        return;
      }

      let requestBody = {
        query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
      };

      if (!this.state.isLogin) {
        requestBody = {
          query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
        };
      }

      fetch("http://dkim0401.mooo.com:4588/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed!");
          }
          return res.json();
        })
        .then(resData => {
          if (resData.data.login.token) {
            this.context.login(
              resData.data.login.token,
              resData.data.login.userId,
              resData.data.login.tokenExpiration
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      const email = this.emailEl.current.value;
      const password = this.passwordEl.current.value;

      if (email.trim().length === 0 || password.trim().length === 0) {
        return;
      }

      const requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      };

      fetch("http://dkim0401.mooo.com:4588/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed!");
          }
          return res.json();
        })
        .then(resData => {
          if (resData) {
            console.log(resData);
            alert("Created");
            this.setState({ isLogin: true });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <Fragment>
        <h1 className="title">{this.state.isLogin ? "Login" : "Signup"}</h1>
        <form className="auth-form" onSubmit={this.submitHandler}>
          <div className="form-control">
            <label htmlFor="email">
              {this.state.isLogin ? "E-Mail" : "Type your E-Mail"}
            </label>
            <input type="email" id="email" ref={this.emailEl} />
          </div>
          <div className="form-control">
            <label htmlFor="password">
              {this.state.isLogin ? "Password" : "Create Password"}
            </label>
            <input type="password" id="password" ref={this.passwordEl} />
          </div>
          <div className="form-actions">
            <button type="submit">Submit</button>
            <button type="button" onClick={this.switchModeHandler}>
              Switch to {this.state.isLogin ? "Signup" : "Login"}
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default AuthPage;
