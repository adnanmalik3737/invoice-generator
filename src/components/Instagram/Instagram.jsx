/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Instagram = ({ className, instagram = "/img/instagram.svg" }) => {
  return <img className={`instagram ${className}`} alt="Instagram" src={instagram} />;
};

Instagram.propTypes = {
  instagram: PropTypes.string,
};
