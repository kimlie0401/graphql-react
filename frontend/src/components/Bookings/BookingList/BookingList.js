import React from "react";
import styled from "styled-components";

const List = styled.ul`
  width: 40rem;
  max-width: 90%;
  margin: 2rem auto;
  list-style: none;
  padding: 0;
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
  &:hover,
  &:active {
    background-color: gray;
    border-color: gray;
  }
`;

const Item = styled.li`
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid rgba(46, 44, 44, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const bookingList = props => (
  <List>
    {props.bookings.map(booking => {
      return (
        <Item key={booking._id}>
          <div>
            {booking.event.title} -{" "}
            {new Date(booking.createdAt).toLocaleDateString()}
          </div>
          <div>
            <Button onClick={() => props.onDelete(booking._id)}>Cancel</Button>
          </div>
        </Item>
      );
    })}
  </List>
);

export default bookingList;
