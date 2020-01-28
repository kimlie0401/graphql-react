import React, { Component, Fragment } from "react";
import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import styled from "styled-components";

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

const Control = styled.div`
  text-align: center;
  border: 1px solid rgba(46, 44, 44, 0.8);
  padding: 1rem;
  margin: 2rem auto;
  width: 30rem;
  max-width: 80%;
`;

class EventsPage extends Component {
  state = {
    creating: false
  };

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false });
  };

  render() {
    return (
      <Fragment>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Add Event"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <p>Modal Content</p>
          </Modal>
        )}
        <Control>
          <p>Share your own Events!</p>
          <Button onClick={this.startCreateEventHandler}>Create Event</Button>
        </Control>
      </Fragment>
    );
  }
}

export default EventsPage;
