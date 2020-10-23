import React from "react";
import renderer from "react-test-renderer";
import {GameScreen} from "./qame-screen.jsx";
import {GameType} from "../../const.js";

const childrenComponent = <div className="children-component"/>;

describe(`Should GameScreen component render correctly`, () => {
  it(`With Genre type screen`, () => {
    const tree = renderer.create(
        <GameScreen
          type={GameType.GENRE}
          mistakesCount={3}
        >
          {childrenComponent}
        </GameScreen>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With Artist type screen`, () => {
    const tree = renderer.create(
        <GameScreen
          type={GameType.ARTIST}
          mistakesCount={3}
        >
          {childrenComponent}
        </GameScreen>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
