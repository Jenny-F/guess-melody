import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import {GameScreen} from "./qame-screen.jsx";
import {GameType} from "../../const.js";
import history from "../../history.js";

const childrenComponent = <div className="children-component"/>;

describe(`Should GameScreen component render correctly`, () => {
  it(`With Genre type screen`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <GameScreen
            type={GameType.GENRE}
            mistakesCount={3}
            onReplayButtonClick={() => {}}
          >
            {childrenComponent}
          </GameScreen>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With Artist type screen`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <GameScreen
            type={GameType.ARTIST}
            mistakesCount={3}
            onReplayButtonClick={() => {}}
          >
            {childrenComponent}
          </GameScreen>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
