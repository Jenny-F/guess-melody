import React from "react";
import renderer from "react-test-renderer";
import WinScreen from "./win-screen.jsx";

it(`Should WinScreen component render correctly`, () => {
  const tree = renderer.create(
      <WinScreen
        errorsCount={3}
        questionsCount={6}
        onReplayButtonClick={() => {}}
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
