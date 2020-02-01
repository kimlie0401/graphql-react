import React, { Fragment } from "react";

class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        {console.log(this.props)}
        <p>{this.props.title}</p>
        <p>{this.props.match.params.id}</p>
      </Fragment>
    );
  }
}

export default EventDetail;
