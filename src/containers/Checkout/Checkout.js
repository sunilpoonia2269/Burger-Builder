import React, { Component } from "react";
import CheckoutSummry from "../../components/Order/CheckoutSummry/CheckoutSummry";
import { Route, Redirect } from "react-router-dom";
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

  componentWillMount() {
    console.log(this.props.purchased);
  }

  cancelHandler = () => {
    this.props.history.goBack();
  };

  contiuneHandler = () => {
    this.props.history.push(this.props.match.url + "/contact-data");
  };

  render() {
    const redirect = <Redirect to="/" />;
    const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;

    const renderData = (
      <div>
        {purchaseRedirect}
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
    return this.props.ings ? renderData : redirect;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    purchased: state.orderReducer.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
