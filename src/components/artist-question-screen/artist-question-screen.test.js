import React from "react";
import renderer from "react-test-renderer";
import ArtistQuestionScreen from "./artist-question-screen.jsx";

const question = {
  type: `artist`,
  song: {
    artist: `Jhon Snow`,
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  },
  answers: [{
    artist: `Jhon Snow`,
    picture: `https://api.adorable.io/avatars/128`,
  }, {
    artist: `Jack Daniels`,
    picture: `https://api.adorable.io/avatars/128`,
  }, {
    artist: `Jim Beam`,
    picture: `https://api.adorable.io/avatars/128`,
  }],
};

it(`Should ArtistQuestionScreen component render correctly`, () => {
  const tree = renderer
  .create(<ArtistQuestionScreen
    question={question}
    onAnswer={() => {}}
    renderPlayer={() => {}}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
