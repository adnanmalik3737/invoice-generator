/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const SolidCommunication = ({ className, solidCommunication = "/img/solid-communication-phone.png" }) => {
  return <img className={`solid-communication ${className}`} alt="Solid communication" src={solidCommunication} />;
};

SolidCommunication.propTypes = {
  solidCommunication: PropTypes.string,
};
