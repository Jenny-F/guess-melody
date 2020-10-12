import {reducer, ActionType} from "./reducer.js";

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