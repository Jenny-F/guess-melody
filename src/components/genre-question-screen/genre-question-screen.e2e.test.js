import React from "react";
import Enzyme, {shallow, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenreQuestionScreen from "./genre-question-screen.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const question = {
  type: `genre`,
  genre: `rock`,
  answers: [{
    src: `src-1`,
    genre: `rock`,
  }, {
    src: `src-2`,
    genre: `jazz`,
  }, {
    src: `src-3`,
    genre: `pop`,
  }, {
    src: `src-4`,
    genre: `rock`,
  }],
};

describe(`GenreQuestionScreen component`, () => {
  it(`Submiting form shouldn't sent data`, () => {
    const onAnswer = jest.fn();
    const formSendPrevetion = jest.fn();

    const component = shallow(<GenreQuestionScreen
      question={question}
      onAnswer={onAnswer}
      onChange={() => {}}
      userAnswers={[false, false, false, false]}
      renderPlayer={() => {}}
    />);

    const form = component.find(`.game__tracks`);

    form.simulate(`submit`, {
      preventDefault: formSendPrevetion,
    });

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(formSendPrevetion).toHaveBeenCalledTimes(1);
  });

  it(`Clicking on answers should call the callback with answer's and question's data`, () => {
    const onAnswer = jest.fn((...args) => [...args]);
    const userAnswer = [true, false, false, false];

    const component = mount(<GenreQuestionScreen
      question={question}
      onAnswer={onAnswer}
      onChange={() => {}}
      userAnswers={userAnswer}
      renderPlayer={() => {}}
    />);

    const form = component.find(`.game__tracks`);
    const answer = component.find(`.game__input`).at(0);

    answer.simulate(`change`, {target: {checked: true}});
    form.simulate(`submit`, {preventDefault() {}});

    expect(onAnswer).toHaveBeenCalledTimes(1);

    expect(onAnswer.mock.calls[0][0]).toEqual(void 0);
  });
});
