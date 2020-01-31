import React from "react";
import styled from "styled-components";
import Loader from "../../../components/Loader";
import EventItem from "../EventList/EventItem/EventItem";

const List = styled.ul`
  width: 40rem;
  max-width: 90%;
  margin: 2rem auto;
  list-style: none;
  padding: 0;
`;

const eventList = props => {
  const event = props.events.map(event => {
    return (
      <EventItem
        eventId={event._id}
        title={event.title}
        key={event._id}
      ></EventItem>
    );
  });
  return props.loading ? <Loader /> : <List>{event}</List>;
};

export default eventList;
