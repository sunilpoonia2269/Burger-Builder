import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Orders from "./containers/Orders/Orders";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onCheckSignin();
  }

  render() {
    const withoutAuthRoutes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/authenticate" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );

    const authRoutes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/authenticate" component={Auth} />
        <Route path="/my-orders" component={Orders} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    );
    return (
      <Router>
        <div>
          <Layout>
            {this.props.isAuthenticated ? authRoutes : withoutAuthRoutes}
          </Layout>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onCheckSignin: () => dispatch(actions.checkAutoSignin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
