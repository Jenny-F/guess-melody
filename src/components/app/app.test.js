import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

it(`Should App component render correctly`, () => {
  const tree = renderer
    .create(<App
      errorsCount={3}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
