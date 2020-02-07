import React, { Component, Fragment } from "react";
import AuthContext from "../context/auth-context";
import Loader from "../components/Loader/Loader";
import BookingList from "../components/Bookings/BookingList/BookingList";

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

  deleteBookingHandler = bookingId => {
    let confirmToDelete = window.confirm("Are you sure to cancel?!");
    if (confirmToDelete) {
      const requestBody = {
        query: `
          mutation CancelBooking($id: ID!){
            cancelBooking(bookingId: $id) {
              _id
              title
              }
            }
        `,
        variables: {
          id: bookingId
        }
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
          this.setState(prevState => {
            const updatedBookings = prevState.bookings.filter(booking => {
              return booking._id !== bookingId;
            });
            return { bookings: updatedBookings, loading: false };
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({ loading: false });
        });
    }
  };

  render() {
    return (
      <Fragment>
        {this.state.loading ? (
          <Loader />
        ) : (
          <BookingList
            bookings={this.state.bookings}
            onDelete={this.deleteBookingHandler}
          />
        )}
      </Fragment>
    );
  }
}

export default BookingsPage;
