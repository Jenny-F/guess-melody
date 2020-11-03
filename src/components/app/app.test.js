import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";

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
      [NameSpace.GAME]: {
        mistakesCount: 0,
      },
    });

    const tree = renderer
      .create(<Provider store={store}>
        <App
          authStatus={AuthorizationStatus.NO_AUTH}
          login={() => {}}
          maxErrorsCount={3}
          userErrorsCount={1}
          questions={questions}
          step={-1}
          onWelcomeButtonClick={() => {}}
          onUserAnswer={() => {}}
          onReplayButtonClick={() => {}}
        />
      </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render GenreScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakesCount: 1,
      }
    });

    const tree = renderer
      .create(<Provider store={store}>
        <App
          authStatus={AuthorizationStatus.NO_AUTH}
          login={() => {}}
          maxErrorsCount={3}
          userErrorsCount={1}
          questions={questions}
          step={0}
          onWelcomeButtonClick={() => {}}
          onUserAnswer={() => {}}
          onReplayButtonClick={() => {}}
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
      [NameSpace.GAME]: {
        mistakesCount: 1,
      }
    });

    const tree = renderer
    .create(<Provider store={store}>
      <App
        authStatus={AuthorizationStatus.NO_AUTH}
        login={() => {}}
        maxErrorsCount={3}
        userErrorsCount={1}
        questions={questions}
        step={1}
        onWelcomeButtonClick={() => {}}
        onUserAnswer={() => {}}
        onReplayButtonClick={() => {}}
      />
    </Provider>, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render WinScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakesCount: 1,
      }
    });

    const tree = renderer
    .create(<Provider store={store}>
      <App
        authStatus={AuthorizationStatus.AUTH}
        login={() => {}}
        maxErrorsCount={3}
        userErrorsCount={1}
        questions={questions}
        step={5}
        onWelcomeButtonClick={() => {}}
        onUserAnswer={() => {}}
        onReplayButtonClick={() => {}}
      />
    </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render AuthorizationScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakesCount: 3,
      }
    });

    const tree = renderer
    .create(<Provider store={store}>
      <App
        authStatus={AuthorizationStatus.NO_AUTH}
        login={() => {}}
        maxErrorsCount={3}
        userErrorsCount={0}
        questions={questions}
        step={5}
        onWelcomeButtonClick={() => {}}
        onUserAnswer={() => {}}
        onReplayButtonClick={() => {}}
      />
    </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render GameOverScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakesCount: 1,
      }
    });

    const tree = renderer
    .create(<Provider store={store}>
      <App
        authStatus={AuthorizationStatus.NO_AUTH}
        login={() => {}}
        maxErrorsCount={3}
        userErrorsCount={5}
        questions={questions}
        step={1}
        onWelcomeButtonClick={() => {}}
        onUserAnswer={() => {}}
        onReplayButtonClick={() => {}}
      />
    </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
