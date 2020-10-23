import React from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const.js";
import GenreQuestionItem from "../genre-question-item/genre-question-item.jsx";

class GenreQuestionScreen extends React.PureComponent {
  render() {
    const {question, onAnswer, onChange, userAnswers, renderPlayer} = this.props;
    const {genre, answers} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks"
          onSubmit={(evt) => {
            evt.preventDefault();
            onAnswer();
          }}
        >
          {answers.map((answer, i) => (
            <GenreQuestionItem
              key={`${i}-${answer.src}`}
              answer={answer}
              id={i}
              userAnswer={userAnswers[i]}
              onChange={onChange}
              renderPlayer={renderPlayer}
            />
          ))}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

GenreQuestionScreen.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.oneOf([GameType.GENRE]).isRequired,
    genre: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })).isRequired,
  }),
  onAnswer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  userAnswers: PropTypes.arrayOf(PropTypes.bool).isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default GenreQuestionScreen;
