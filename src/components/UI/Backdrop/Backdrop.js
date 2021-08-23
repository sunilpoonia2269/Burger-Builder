import React from "react";
import Classes from "./Backdrop.module.css";

const Backdrop = (props) => {
  return (
    props.show && (
      <div className={Classes.Backdrop} onClick={props.clicked}></div>
    )
  );
};

export default Backdrop;
