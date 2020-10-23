import React from "react";
import renderer from "react-test-renderer";
import GenreQuestionItem from "./genre-question-item.jsx";

const mockAnswer = {
  src: ``,
  genre: ``,
};

it(`Should GenreQuestionItem component render correctly`, () => {
  const tree = renderer.create(
      <GenreQuestionItem
        answer={mockAnswer}
        id={1}
        userAnswer={true}
        onChange={() => {}}
        renderPlayer={() => {}}
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
