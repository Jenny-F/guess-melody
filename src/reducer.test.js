import {reducer, ActionCreator, ActionType} from "./reducer.js";

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
      picture: `https://api.adorable.io/avatars/128/A`,
    }, {
      artist: `Jack Daniels`,
      picture: `https://api.adorable.io/avatars/128/AB`,
    }, {
      artist: `Jim Beam`,
      picture: `https://api.adorable.io/avatars/128/AC`,
    }],
  },
];

describe(`Reducer should work correctly`, () => {
  it(`Reducer without input parameters returns initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      mistakesCount: 0,
      maxMistakesCount: 3,
      step: -1,
      questions,
    });
  });

  it(`Reducer should increment step by a given value`, () => {
    expect(reducer({
      mistakesCount: 0,
      step: -1,
      questions,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    })).toEqual({
      mistakesCount: 0,
      step: 0,
      questions,
    });

    expect(reducer({
      mistakesCount: 0,
      step: -1,
      questions,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 0,
    })).toEqual({
      mistakesCount: 0,
      step: -1,
      questions,
    });
  });

  it(`Reducer should increment mistakes by a given value`, () => {
    expect(reducer({
      mistakesCount: 0,
      step: -1,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    })).toEqual({
      mistakesCount: 1,
      step: -1,
    });

    expect(reducer({
      mistakesCount: 2,
      step: -1,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    })).toEqual({
      mistakesCount: 2,
      step: -1,
    });
  });
});

describe(`ActionCreator should work correctly`, () => {
  it(`ActionCreator return correct action for incrementing step`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    });
  });

  it(`ActionCreator return correct action with payload 1 for incorrect user genre answer`, () => {
    expect(ActionCreator.incrementMistakes({
      type: `genre`,
      genre: `correct`,
      answers: [{
        src: ``,
        genre: `correct`,
      }, {
        src: ``,
        genre: `incorrect`,
      }, {
        src: ``,
        genre: `incorrect`,
      }, {
        src: ``,
        genre: `correct`,
      }],
    }, [true, false, false, false])).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });

  it(`ActionCreator return correct action with payload 0 for correct user genre answer`, () => {
    expect(ActionCreator.incrementMistakes({
      type: `genre`,
      genre: `correct`,
      answers: [{
        src: ``,
        genre: `correct`,
      }, {
        src: ``,
        genre: `incorrect`,
      }, {
        src: ``,
        genre: `incorrect`,
      }, {
        src: ``,
        genre: `correct`,
      }],
    }, [true, false, false, true])).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  it(`ActionCreator return correct action with payload 1 for incorrect user artist answer`, () => {
    expect(ActionCreator.incrementMistakes({
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [{
        artist: `incorrect`,
        picture: ``,
      }, {
        artist: `correct`,
        picture: ``,
      }, {
        artist: `incorrect`,
        picture: `C`,
      }],
    }, {
      artist: `incorrect`,
      picture: ``,
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });

  it(`ActionCreator return correct action with payload 0 for correct user artist answer`, () => {
    expect(ActionCreator.incrementMistakes({
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [{
        artist: `incorrect`,
        picture: ``,
      }, {
        artist: `correct`,
        picture: ``,
      }, {
        artist: `incorrect`,
        picture: `C`,
      }],
    }, {
      artist: `correct`,
      picture: ``,
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });
});
