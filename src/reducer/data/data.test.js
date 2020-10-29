import MockAdapter from "axios-mock-adapter";
import createApi from "../../api.js";
import {reducer, ActionType, Operation} from "./data.js";

const api = createApi(() => {});

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

it(`Reducer should update state by incoming questions`, () => {
  expect(reducer({
    questions: [],
  }, {
    type: ActionType.LOAD_QUESTIONS,
    payload: questions,
  })).toEqual({
    questions,
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /questions`, () => {
    const mockApi = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionsLoader = Operation.loadQuestions();

    mockApi
      .onGet(`/questions`)
      .reply(200, [{fake: true}]);

    return questionsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_QUESTIONS,
          payload: [{fake: true}],
        });
      });
  });
});
