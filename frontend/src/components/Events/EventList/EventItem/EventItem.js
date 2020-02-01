import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SLink = styled(Link)`
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid rgba(46, 44, 44, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const H1 = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: white;
`;
const H2 = styled.h2`
  margin: 0;
  font-size: 1rem;
  color: #7c7c7c;
`;
const P = styled.p`
  margin: 0 1rem;
`;

const Button = styled.button`
  background-color: rgba(46, 44, 44, 0.8);
  font: inherit;
  border: 1px solid rgba(46, 44, 44, 0.8);
  border-radius: 3px;
  padding: 0.25rem 1rem;
  margin-right: 1rem;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
  color: white;
  cursor: pointer;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
`;

const eventItem = props => (
  <SLink to={`/events/${props.eventId}`} key={props.eventId}>
    <div>
      <H1>{props.title}</H1>
      <H2>
        ${props.price} - {new Date(props.date).toLocaleDateString()}
      </H2>
    </div>
    <div>
      {props.userId === props.creatorId ? (
        <Div>
          <P>Your the owner of this event.</P>
          <Button
            onClick={event => {
              event.preventDefault();
              props.onDelete(props.eventId);
            }}
          >
            Delete
          </Button>
        </Div>
      ) : (
        <Button
          onClick={event => {
            event.preventDefault();
            props.onDetail(props.eventId);
          }}
        >
          View Detail
        </Button>
      )}
    </div>
  </SLink>
);

export default eventItem;
