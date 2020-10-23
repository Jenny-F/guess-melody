import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {GameType} from "../../const.js";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import WinScreen from "../win-screen/win-screen.jsx";
import GameOverScreen from "../game-over-screen/game-over-screen.jsx";
import GameScreen from "../qame-screen/qame-screen.jsx";
import withActivePlayer from "../../hocs/with-active-player/with-active-player.js";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer.js";
import {ActionCreator} from "../../reducer.js";

const WrappedArtistQuestionScreen = withActivePlayer(ArtistQuestionScreen);
const WrappedGenreQuestionScreen = withActivePlayer(withUserAnswer(GenreQuestionScreen));

class App extends React.PureComponent {
  _renderGameScreen() {
    const {
      step,
      maxErrorsCount,
      userErrorsCount,
      questions,
      onWelcomeButtonClick,
      onUserAnswer,
      onReplayButtonClick,
    } = this.props;
    const question = questions[step];

    if (step === -1) {
      return (
        <WelcomeScreen
          errorsCount={maxErrorsCount}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (userErrorsCount >= maxErrorsCount) {
      return (
        <GameOverScreen
          onReplayButtonClick={onReplayButtonClick}
        />
      );
    }

    if (step >= questions.length) {
      return (
        <WinScreen
          errorsCount={userErrorsCount}
          questionsCount={questions.length}
          onReplayButtonClick={onReplayButtonClick}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.GENRE:
          return (
            <GameScreen
              type={question.type}
            >
              <WrappedGenreQuestionScreen
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
        case GameType.ARTIST:
          return (
            <GameScreen
              type={question.type}
            >
              <WrappedArtistQuestionScreen
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
      }
    }

    return null;
  }

  render() {
    const {questions} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/artist">
            <WrappedArtistQuestionScreen
              question={questions[1]}
              onAnswer={() => {}}
            />
          </Route>
          <Route exact path="/genre">
            <WrappedGenreQuestionScreen
              question={questions[0]}
              onAnswer={() => {}}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  maxErrorsCount: PropTypes.number.isRequired,
  userErrorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onReplayButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  maxErrorsCount: state.maxMistakesCount,
  userErrorsCount: state.mistakesCount,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick: () => {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer: (question, answer) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistakes(question, answer));
  },
  onReplayButtonClick: () => {
    dispatch(ActionCreator.resetGame());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
