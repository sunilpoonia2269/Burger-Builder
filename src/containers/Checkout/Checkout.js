import React, { Component } from "react";
import CheckoutSummry from "../../components/Order/CheckoutSummry/CheckoutSummry";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: null,
    };
  }
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 1,
      meat: 1,
    },
    totalPrice: 0,
  };

  componentDidMount() {
    console.log(this.props);
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;

    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  cancelHandler = () => {
    this.props.history.goBack();
  };

  contiuneHandler = () => {
    this.props.history.replace(this.props.match.url + "/contact-data");
  };

  render() {
    const renderData = (
      <div>
        <CheckoutSummry
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          cancel={this.cancelHandler}
          continue={this.contiuneHandler}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          render={(props) => {
            return (
              <ContactData
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                {...props}
              />
            );
          }}
        />
      </div>
    );
    return this.state.ingredients && renderData;
  }
}

export default Checkout;
