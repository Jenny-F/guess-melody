import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Router, Route, Switch} from "react-router-dom";
import history from "../../history.js";
import {GameType, AppRoute} from "../../const.js";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import WinScreen from "../win-screen/win-screen.jsx";
import GameOverScreen from "../game-over-screen/game-over-screen.jsx";
import GameScreen from "../qame-screen/qame-screen.jsx";
import AuthorizationScreen from "../authorization-screen/authorization-screen.jsx";
import withActivePlayer from "../../hocs/with-active-player/with-active-player.js";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer.js";
import PrivateRoute from "../private-route/private-route.jsx";
import {ActionCreator} from "../../reducer/game/game.js";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";
import {getQuestions} from "../../reducer/data/selectors.js";
import {getMaxMistakesCount, getMistakesCount, getStep} from "../../reducer/game/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selector.js";

class App extends React.PureComponent {
  _renderGameScreen() {
    const WrappedArtistQuestionScreen = withActivePlayer(ArtistQuestionScreen);
    const WrappedGenreQuestionScreen = withActivePlayer(withUserAnswer(GenreQuestionScreen));

    const {
      step,
      maxErrorsCount,
      userErrorsCount,
      authStatus,
      questions,
      onWelcomeButtonClick,
      onReplayButtonClick,
      onUserAnswer,
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
      return history.push(AppRoute.LOSE);
    }

    if (step >= questions.length) {
      if (authStatus === AuthorizationStatus.AUTH) {
        return history.push(AppRoute.RESULT);
      } else if (authStatus === AuthorizationStatus.NO_AUTH) {
        return history.push(AppRoute.LOGIN);
      }

      return null;
    }

    if (question) {
      switch (question.type) {
        case GameType.GENRE:
          return (
            <GameScreen
              type={question.type}
              onReplayButtonClick={onReplayButtonClick}
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
              onReplayButtonClick={onReplayButtonClick}
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
    const {questions, login, onReplayButtonClick, userErrorsCount} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this._renderGameScreen()}
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            <AuthorizationScreen
              onSubmit={login}
              onReplayButtonClick={onReplayButtonClick}
            />
          </Route>
          <Route exact path={AppRoute.LOSE}>
            <GameOverScreen
              onReplayButtonClick={onReplayButtonClick}
            />
          </Route>
          <PrivateRoute
            exact
            path={AppRoute.RESULT}
            render={() => {
              return (
                <WinScreen
                  errorsCount={userErrorsCount}
                  questionsCount={questions.length}
                  onReplayButtonClick={onReplayButtonClick}
                />
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  maxErrorsCount: PropTypes.number.isRequired,
  userErrorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  authStatus: PropTypes.string.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onReplayButtonClick: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  step: getStep(state),
  maxErrorsCount: getMaxMistakesCount(state),
  userErrorsCount: getMistakesCount(state),
  questions: getQuestions(state),
  authStatus: getAuthorizationStatus(state),
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
  login: (authData) => {
    dispatch(UserOperation.login(authData));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
