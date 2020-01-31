import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SLink = styled(Link)`
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid rgba(46, 44, 44, 0.8);
  display: block;
`;

const eventItem = props => (
  <SLink to={`/events/${props.eventId}`} key={props.eventId}>
    {props.title}
  </SLink>
);

export default eventItem;
