import React, { Component } from "react";
import styled from "styled-components";
import EventItem from "../EventList/EventItem/EventItem";

const List = styled.ul`
  width: 40rem;
  max-width: 90%;
  margin: 2rem auto;
  list-style: none;
  padding: 0;
`;
class eventList extends Component {
  render() {
    const event = this.props.events.map(event => {
      return (
        <EventItem
          eventId={event._id}
          title={event.title}
          key={event._id}
          userId={this.props.authUserId}
          creatorId={event.creator._id}
          price={event.price}
          date={event.date}
          onDetail={this.props.onViewDetail}
          onDelete={this.props.onEventDelete}
        ></EventItem>
      );
    });
    return <List>{event}</List>;
  }
}

export default eventList;
