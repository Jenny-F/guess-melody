import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ArtistQuestionScreen from "./artist-question-screen.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const question = {
  type: `artist`,
  song: {
    artist: `Jhon Snow`,
    src: `src`,
  },
  answers: [{
    artist: `Jhon Snow`,
    picture: `pic-one`,
  }, {
    artist: `Jack Daniels`,
    picture: `pic-two`,
  }, {
    artist: `Jim Beam`,
    picture: `pic-three`,
  }],
};

describe(`ArtistQuestionScreen component`, () => {
  it(`Clicking on answer should call the callback with answer's and question's data`, () => {
    const onAnswer = jest.fn();
    const userAnswer = {
      artist: `Jhon Snow`,
      picture: `pic-one`,
    };

    const component = shallow(<ArtistQuestionScreen
      question={question}
      onAnswer={onAnswer}
      renderPlayer={() => {}}
    />);

    const answer = component.find(`.artist__input`).at(0);

    answer.simulate(`change`, {preventDefault() {}});

    expect(onAnswer).toHaveBeenCalledTimes(1);

    expect(onAnswer.mock.calls[0][0]).toMatchObject(question);
    expect(onAnswer.mock.calls[0][1]).toMatchObject(userAnswer);
  });
});
