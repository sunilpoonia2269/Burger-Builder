import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import WithErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedData = [];
        for (let key in res.data) {
          fetchedData.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ loading: false, orders: fetchedData });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }
  render() {
    const spinner = <Spinner />;
    const orderDetails = (
      <div>
        {this.state.orders.map((order) => {
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
    return this.state.loading ? spinner : orderDetails;
  }
}

export default WithErrorHandler(Orders, axios);
