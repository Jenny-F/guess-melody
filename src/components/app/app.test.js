import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";

const mockStore = configureStore([]);

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

describe(`Should App component render correctly`, () => {
  it(`Render WelcomeScreen`, () => {
    const store = mockStore({
      errorsCount: 0,
    });

    const tree = renderer
      .create(<Provider store={store}>
        <App
          maxErrorsCount={3}
          questions={questions}
          step={-1}
          onWelcomeButtonClick={() => {}}
          onUserAnswer={() => {}}
        />
      </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render GenreScreen`, () => {
    const store = mockStore({
      errorsCount: 1,
    });

    const tree = renderer
      .create(<Provider store={store}>
        <App
          maxErrorsCount={3}
          questions={questions}
          step={0}
          onWelcomeButtonClick={() => {}}
          onUserAnswer={() => {}}
        />
      </Provider>, {
        createNodeMock: () => {
          return {};
        }
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render ArtistScreen`, () => {
    const store = mockStore({
      errorsCount: 1,
    });

    const tree = renderer
    .create(<Provider store={store}>
      <App
        maxErrorsCount={3}
        questions={questions}
        step={1}
        onWelcomeButtonClick={() => {}}
        onUserAnswer={() => {}}
      />
    </Provider>, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
