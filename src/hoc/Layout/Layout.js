import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Classes from "./Layout.module.css";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  };
  render() {
    return (
      <Auxiliary>
        <Toolbar openSideDrawer={this.sideDrawerOpenHandler} />
        <SideDrawer
          show={this.state.showSideDrawer}
          closeSideDrawer={this.sideDrawerCloseHandler}
        />
        <main className={Classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

export default Layout;
