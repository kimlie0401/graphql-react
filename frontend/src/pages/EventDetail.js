import React from "react";

class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <p>{this.props.match.params.id}</p>;
  }
}

export default EventDetail;
