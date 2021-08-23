import React, { Component } from "react";
import Classes from "./Modal.module.css";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }
  render() {
    const modalShowStyle = {
      transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
      opactity: this.props.show ? "1" : "0",
    };
    return (
      <Auxiliary>
        <div className={Classes.Modal} style={modalShowStyle}>
          {this.props.children}
        </div>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
      </Auxiliary>
    );
  }
}

export default Modal;
