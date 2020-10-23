import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withUserAnswer from "./with-user-answer.js";

configure({
  adapter: new Adapter()
});

const MockComponent = () => <div />;
const MockComponentWrapped = withUserAnswer(MockComponent);

const mock = {
  question: {
    type: `genre`,
    genre: `genre-1`,
    answers: [
      {
        src: `src`,
        genre: `genre-1`,
      },
      {
        src: `src`,
        genre: `genre-2`,
      },
      {
        src: `src`,
        genre: `genre-2`,
      },
      {
        src: `src`,
        genre: `genre-1`,
      },
    ],
  },
};

it(`Should change answers`, () => {
  const component = shallow(<MockComponentWrapped
    question={mock.question}
    onAnswer={() => {}}
  />);

  expect(component.props().userAnswers).toEqual([false, false, false, false]);

  component.props().onChange(0, true);
  expect(component.props().userAnswers).toEqual([true, false, false, false]);

  component.props().onChange(0, false);
  expect(component.props().userAnswers).toEqual([false, false, false, false]);

  component.props().onChange(1, true);
  expect(component.props().userAnswers).toEqual([false, true, false, false]);
});
