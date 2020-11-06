import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {GameType} from "../../const.js";
import Mistakes from "../mistakes/mistakes.jsx";
import {getMistakesCount} from "../../reducer/game/selectors.js";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";

const GameScreen = (props) => {
  const {children, type, mistakesCount, onReplayButtonClick} = props;

  return (
    <section className={`game game--${type}`}>
      <header className="game__header">
        <Link
          className="game__back"
          to={AppRoute.ROOT}
          onClick={onReplayButtonClick}
        >
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </Link>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}} />
        </svg>

        <Mistakes
          mistakesCount={mistakesCount}
        />
      </header>

      {children}
    </section>
  );
};

GameScreen.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  mistakesCount: PropTypes.number.isRequired,
  onReplayButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  mistakesCount: getMistakesCount(state),
});

export {GameScreen};
export default connect(mapStateToProps)(GameScreen);
