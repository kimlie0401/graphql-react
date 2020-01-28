import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";

import AuthContext from "../../context/auth-context";
import "./MainNavigation.css";
import styled from "styled-components";

const Header = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 2.5rem;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.3rem;
`;

const List = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  width: 80px;
  height: 2.5rem;
  text-align: center;
  border-bottom: 3px solid ${props => (props.current ? "gray" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
  &:hover {
    background-color: gray;
  }
`;

const SLink = styled(NavLink)`
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Nav = styled.nav`
  margin-left: 2.5rem;
`;

const Button = styled.button`
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  border: none;
  font: inherit;
  background: transparent;
  cursor: point;
`;

export default withRouter(({ location: { pathname } }) => {
  return (
    <AuthContext.Consumer>
      {context => {
        return (
          <Header className="main-navigation">
            <div className="main-navigation__logo">
              <Logo>DK's Event</Logo>
            </div>
            <Nav className="main-navigation__items">
              <List>
                {!context.token && (
                  <Item current={pathname === "/auth"}>
                    <SLink to="/auth">Authenticate</SLink>
                  </Item>
                )}
                <Item current={pathname === "/events"}>
                  <SLink to="/events">Events</SLink>
                </Item>
                {context.token && (
                  <Fragment>
                    <Item current={pathname === "/bookings"}>
                      <SLink to="/bookings">Bookings</SLink>
                    </Item>
                    <Item>
                      <Button onClick={context.logout}>Logout</Button>
                    </Item>
                  </Fragment>
                )}
              </List>
            </Nav>
          </Header>
        );
      }}
    </AuthContext.Consumer>
  );
});
