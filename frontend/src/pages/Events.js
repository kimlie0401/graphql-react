import React, { Component, Fragment } from "react";
import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import styled from "styled-components";
import AuthContext from "../context/auth-context";
import EventList from "../components/Events/EventList/EventList";
import Loader from "../components/Loader/Loader";

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

const Form = styled.form``;

const ControlM = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  width: 100%;
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  display: block;
`;

const Text = styled.textarea`
  width: 100%;
  display: block;
`;

const H1 = styled.h1`
  margin-bottom: 1rem;
  font-size: 1.25rem;
`;

const H2 = styled.h2`
  margin-bottom: 1rem;
  font-size: 1rem;
`;

class EventsPage extends Component {
  state = {
    creating: false,
    loading: true,
    events: [],
    selectedEvent: null
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.dateElRef = React.createRef();
    this.descriptionElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchEvents();
  }

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const title = this.titleElRef.current.value;
    const price = +this.priceElRef.current.value;
    const date = this.dateElRef.current.value;
    const description = this.descriptionElRef.current.value;

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }

    const event = { title, price, date, description };
    console.log(event);

    const requestBody = {
      query: `
          mutation {
            createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
              _id
              title
              description
              date
              price
            }
          }
        `
    };

    const token = this.context.token;

    fetch("http://dkim0401.mooo.com:4588/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedEvents = [...prevState.events];
          updatedEvents.push({
            _id: resData.data.createEvent._id,
            title: resData.data.createEvent.title,
            description: resData.data.createEvent.description,
            date: resData.data.createEvent.date,
            price: resData.data.createEvent.price,
            creator: {
              _id: this.context.userId
            }
          });
          return { events: updatedEvents };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedEvent: null });
  };

  fetchEvents() {
    this.setState({ loading: true });
    const requestBody = {
      query: `
          query {
            events {
              _id
              title
              description
              date
              price
              creator {
                _id
                email
              }
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
        const events = resData.data.events;
        this.setState({ events: events, loading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  showDetailHandler = eventId => {
    this.setState(prevState => {
      const selectedEvent = prevState.events.find(
        event => event._id === eventId
      );
      return { selectedEvent: selectedEvent };
    });
  };

  eventDelete = eventId => {
    const requestBody = {
      query: `
          mutation {
            deleteEvent(eventId: "${eventId}") {
              _id
              title
              description
              date
              price
            }
          }
        `
    };

    const token = this.context.token;
    fetch("http://dkim0401.mooo.com:4588/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.fetchEvents();
      })
      .catch(err => {
        console.log(err);
      });
  };

  bookEventHandler = () => {
    alert("Booked!!");
  };

  render() {
    // const eventList = this.state.events.map(event => {
    //   return (
    //     <SLink to={`/events/${event._id}`} key={event._id}>
    //       {event.title}
    //       {
    //         <button
    //           onClick={event => {
    //             event.preventDefault(); //prevent double popup
    //             alert("Clicked");
    //           }}
    //         >
    //           Cancel
    //         </button>
    //       }
    //     </SLink>
    //   );
    // });

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
            confirmText="Confirm"
          >
            <Form>
              <ControlM>
                <Label htmlFor="title">Title</Label>
                <Input type="title" ref={this.titleElRef}></Input>
              </ControlM>
              <ControlM>
                <Label htmlFor="price">Price</Label>
                <Input type="number" ref={this.priceElRef}></Input>
              </ControlM>
              <ControlM>
                <Label htmlFor="date">Date</Label>
                <Input type="datetime-local" ref={this.dateElRef}></Input>
              </ControlM>
              <ControlM>
                <Label htmlFor="description">Description</Label>
                <Text
                  id="description"
                  rows="4"
                  ref={this.descriptionElRef}
                ></Text>
              </ControlM>
            </Form>
          </Modal>
        )}
        {this.state.selectedEvent && <Backdrop />}
        {this.state.selectedEvent && (
          <Modal
            title={this.state.selectedEvent.title}
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.bookEventHandler}
            confirmText="Book"
          >
            <H1>{this.state.selectedEvent.title}</H1>
            <H2>
              ${this.state.selectedEvent.price} -{" "}
              {new Date(this.state.selectedEvent.date).toLocaleDateString()}
            </H2>
            <p>{this.state.selectedEvent.description}</p>
          </Modal>
        )}
        {this.context.token && (
          <Control>
            <p>Share your own Events!</p>
            <Button onClick={this.startCreateEventHandler}>Create Event</Button>
          </Control>
        )}
        {this.state.loading ? (
          <Loader />
        ) : (
          <EventList
            events={this.state.events}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
            onEventDelete={this.eventDelete}
          />
        )}
      </Fragment>
    );
  }
}

export default EventsPage;
