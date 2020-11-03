import React from "react";
import renderer from "react-test-renderer";
import AuthorizationScreen from "./authorization-screen.jsx";

it(`Should AuthorizationScreen component render correctly`, () => {
  const tree = renderer.create(
      <AuthorizationScreen
        onReplayButtonClick={() => {}}
        onSubmit={() => {}}
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
