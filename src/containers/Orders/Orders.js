import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import WithErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }
  render() {
    const spinner = <Spinner />;
    const orderDetails = (
      <div>
        {this.props.orders.map((order) => {
          return (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          );
        })}
      </div>
    );
    return this.props.loading ? spinner : orderDetails;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Orders, axios));
