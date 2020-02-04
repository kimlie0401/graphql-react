import React, { Fragment } from "react";
import Loader from "../components/Loader/Loader";
class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      date: null,
      price: null,
      loading: true
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: true });
    const id = this.props.match.params.id;
    const requestBody = {
      query: `
    query {
      event(eventId:"${id}") {
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
        const event = resData.data.event;
        this.setState({
          title: event.title,
          description: event.description,
          date: event.date,
          price: event.price,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <Fragment>
        {this.state.loading ? (
          <Loader />
        ) : (
          <Fragment>
            <h1>{this.state.title}</h1>
            <p>{this.state.description}</p>
            <p>{new Date(this.state.date).toLocaleDateString()}</p>
            <p>${this.state.price}</p>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default EventDetail;
