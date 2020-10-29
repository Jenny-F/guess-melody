import {reducer, ActionCreator, ActionType} from "./reducer.js";

describe(`Reducer should work correctly`, () => {
  it(`Reducer without input parameters returns initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      mistakesCount: 0,
      maxMistakesCount: 3,
      step: -1,
    });
  });

  it(`Reducer should increment step by a given value`, () => {
    expect(reducer({
      mistakesCount: 0,
      step: -1,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    })).toEqual({
      mistakesCount: 0,
      step: 0,
    });

    expect(reducer({
      mistakesCount: 0,
      step: -1,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 0,
    })).toEqual({
      mistakesCount: 0,
      step: -1,
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

  it(`Reducer should reset state`, () => {
    expect(reducer({
      mistakesCount: 2,
      step: 5,
    }, {
      type: ActionType.RESET,
      payload: null,
    })).toEqual({
      mistakesCount: 0,
      maxMistakesCount: 3,
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

  it(`ActionCreator return correct action for reset action`, () => {
    expect(ActionCreator.resetGame())
      .toEqual({
        type: ActionType.RESET,
        payload: null,
      });
  });
});
