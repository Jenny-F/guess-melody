import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [{
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `jazz`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `pop`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }],
  }, {
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
  },
];

it(`Should App component render correctly`, () => {
  const tree = renderer
    .create(<App
      errorsCount={3}
      questions={questions}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
