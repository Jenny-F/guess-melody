import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-screen.jsx";

it(`Should WelcomeScreen component render correctly`, () => {
  const tree = renderer
    .create(<WelcomeScreen
      errorsCount={3}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
