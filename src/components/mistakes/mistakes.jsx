import React from "react";
import PropTypes from "prop-types";

const Mistakes = (props) => {
  const {mistakesCount} = props;
  const mistakes = new Array(mistakesCount).fill(``);
  return (
    <div className="game__mistakes">
      {mistakes.map((it, i) => <div key={`mistake-${i}`} className="wrong" />)}
    </div>
  );
};

Mistakes.propTypes = {
  mistakesCount: PropTypes.number.isRequired,
};

export default Mistakes;
