import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import WinScreen from "./win-screen.jsx";
import history from "../../history.js";

it(`Should WinScreen component render correctly`, () => {
  const tree = renderer.create(
      <Router history={history}>
        <WinScreen
          errorsCount={3}
          questionsCount={6}
          onReplayButtonClick={() => {}}
        />
      </Router>).toJSON();

  expect(tree).toMatchSnapshot();
});
