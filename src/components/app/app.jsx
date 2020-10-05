import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {GameType} from "../../const.js";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import GameScreen from "../qame-screen/qame-screen.jsx";
import withActivePlayer from "../../hocs/with-active-player/with-active-player.jsx";

const WrappedArtistQuestionScreen = withActivePlayer(ArtistQuestionScreen);
const WrappedGenreQuestionScreen = withActivePlayer(GenreQuestionScreen);

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: -1,
    };
  }

  _renderGameScreen() {
    const {step} = this.state;
    const {errorsCount, questions} = this.props;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onWelcomeButtonClick={() => {
            this.setState({
              step: 0,
            });
          }}
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
                onAnswer={() => {
                  this.setState((prevState) => ({
                    step: prevState.step + 1,
                  }));
                }}
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
                onAnswer={() => {
                  this.setState((prevState) => ({
                    step: prevState.step + 1,
                  }));
                }}
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
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

export default App;
