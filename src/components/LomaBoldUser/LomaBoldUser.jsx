/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const LomaBoldUser = ({ className, lomaBoldUser = "/img/loma-bold-user.svg" }) => {
  return <img className={`loma-bold-user ${className}`} alt="Loma bold user" src={lomaBoldUser} />;
};

LomaBoldUser.propTypes = {
  lomaBoldUser: PropTypes.string,
};
