import React, { Component, Fragment } from "react";
import AuthContext from "../context/auth-context";
import Loader from "../components/Loader/Loader";

class BookingsPage extends Component {
  state = {
    loading: true,
    bookings: []
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = () => {
    const requestBody = {
      query: `
        query {
          bookings {
            _id
            createdAt
            event{
              _id
              title
              date 
            }
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
        const bookings = resData.data.bookings;
        this.setState({ bookings: bookings, loading: false });
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
            <ul>
              {this.state.bookings.map(booking => (
                <li key={booking._id}>
                  {booking.event.title} -{" "}
                  {new Date(booking.createdAt).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default BookingsPage;
