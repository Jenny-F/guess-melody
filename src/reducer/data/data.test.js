import {reducer, ActionType} from "./data.js";

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [{
      src: `src`,
      genre: `rock`,
    }, {
      src: `src`,
      genre: `jazz`,
    }, {
      src: `src`,
      genre: `pop`,
    }, {
      src: `src`,
      genre: `rock`,
    }],
  }, {
    type: `artist`,
    song: {
      artist: `Jhon Snow`,
      src: `src`,
    },
    answers: [{
      artist: `Jhon Snow`,
      picture: `pic-1`,
    }, {
      artist: `Jack Daniels`,
      picture: `pic-2`,
    }, {
      artist: `Jim Beam`,
      picture: `pic-3`,
    }],
  },
];

it(`Reducer without incoming parameteres should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    questions: [],
  });
});

it(`Reducer should update state by incoming qustions`, () => {
  expect(reducer({
    questions: [],
  }, {
    type: ActionType.LOAD_QUESTIONS,
    payload: questions,
  }).toEqual({
    questions,
  }));
});
