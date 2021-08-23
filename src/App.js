import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Orders from "./containers/Orders/Orders";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout";
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Layout>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/my-orders" component={Orders} />
            <Route path="/checkout" component={Checkout} />
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
