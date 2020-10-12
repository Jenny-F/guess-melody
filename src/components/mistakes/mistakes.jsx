import React from "react";
import PropTypes from "prop-types";

const Mistakes = (props) => {
  const {errorsCount} = props;
  const errors = new Array(errorsCount).fill(``);
  return (
    <div className="game__mistakes">
      {errors.map((it, i) => <div key={`mistake-${i}`} className="wrong" />)}
    </div>
  );
};

Mistakes.propTypes = {
  errorsCount: PropTypes.number.isRequired,
};

export default Mistakes;
