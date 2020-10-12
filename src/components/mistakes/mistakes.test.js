import React from "react";
import renderer from "react-test-renderer";
import Mistakes from "./mistakes.jsx";

it(`Should Mistakes component render correctly`, () => {
  const tree = renderer.create(
      <Mistakes
        errorsCount={2}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
