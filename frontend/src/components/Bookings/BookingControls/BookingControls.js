import React from "react";
import styled from "styled-components";

const Control = styled.div`
  text-align: center;
  padding: 0.5rem;
`;

const Button = styled.button`
  font: inherit;
  font-size: 1.5rem;
  border: none;
  background: transparent;
  color: white;
  padding: 0.25rem 3rem;
  cursor: pointer;
  border-bottom: 2px solid ${props => (props.current ? "gray" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
  &:focus {
    outline: none;
  }
`;

const bookingControls = props => {
  return (
    <Control>
      <Button
        current={props.activeOutputType === "list"}
        onClick={() => {
          props.onControl("list");
        }}
      >
        List
      </Button>
      <Button
        current={props.activeOutputType === "chart"}
        onClick={() => {
          props.onControl("chart");
        }}
      >
        Chart
      </Button>
    </Control>
  );
};

export default bookingControls;
