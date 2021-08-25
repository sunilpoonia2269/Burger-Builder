import React, { Component } from "react";
import CheckoutSummry from "../../components/Order/CheckoutSummry/CheckoutSummry";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  // componentDidMount() {
  //   console.log(this.props);
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;

  //   for (let param of query.entries()) {
  //     if (param[0] === "price") {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, totalPrice: price });
  // }

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
          ingredients={this.props.ings}
          price={this.props.price}
          cancel={this.cancelHandler}
          continue={this.contiuneHandler}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
    return this.props.ings && renderData;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

export default connect(mapStateToProps)(Checkout);
