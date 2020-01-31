import React from "react";
import styled from "styled-components";

const Modal = styled.div`
  width: 60%;
  background-color: rgba(20, 20, 20, 1);
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 20vh;
  left: 20%;
  z-index: 100;
  @media (min-width: 768px) {
    width: 25rem;
    left: calc((100% - 25rem) / 2);
  }
`;

const Header = styled.header`
  padding: 0.5rem;
  background-color: rgba(46, 44, 44, 1);
`;

const H1 = styled.h1`
  margin: 0;
  font-size: 1.25rem;
`;

const Content = styled.section`
  padding: 1rem;
`;

const Actions = styled.section`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: rgba(46, 44, 44, 0.8);
  font: inherit;
  border: 1px solid rgba(46, 44, 44, 0.8);
  border-radius: 3px;
  padding: 0.25rem 1rem;
  margin: 0.5rem;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
  color: white;
  cursor: pointer;
  &:hover,
  &:active {
    background-color: gray;
    border-color: gray;
  }
`;

const modal = props => (
  <Modal>
    <Header>
      <H1>{props.title}</H1>
    </Header>
    <Content>{props.children}</Content>
    <Actions>
      {props.canCancel && <Button onClick={props.onCancel}>Cancel</Button>}
      {props.canConfirm && (
        <Button onClick={props.onConfirm}>{props.confirmText}</Button>
      )}
    </Actions>
  </Modal>
);

export default modal;
