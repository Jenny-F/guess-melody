import questions from "./mocks/questions.js";
import {GameType} from "./const.js";
import {extend} from "./utils.js";

const initialState = {
  mistakesCount: 0,
  maxMistakesCount: 3,
  step: -1,
  questions,
};

const ActionType = {
  INCREMENT_STEP: `INCREMENT_STEP`,
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
};

const isArtistAnswerCorrect = (question, userAnswer) => {
  return question.song.artist === userAnswer.artist;
};

const isGenreAnswerCorrect = (question, userAnswer) => {
  return userAnswer.every((it, i) => {
    return it === (question.answers[i].genre === question.genre);
  });
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),
  incrementMistakes: (question, userAnswer) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case GameType.GENRE:
        answerIsCorrect = isGenreAnswerCorrect(question, userAnswer);
        break;
      case GameType.ARTIST:
        answerIsCorrect = isArtistAnswerCorrect(question, userAnswer);
        break;
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: answerIsCorrect ? 0 : 1,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      let nextStep = state.step + action.payload;

      if (nextStep >= state.questions.length) {
        return extend({}, initialState);
      }

      return extend(state, {
        step: nextStep,
      });

    case ActionType.INCREMENT_MISTAKES:
      let nextMistakesCount = state.mistakesCount + action.payload;

      if (nextMistakesCount >= state.maxMistakesCount) {
        return extend({}, initialState);
      }

      return extend(state, {
        mistakesCount: nextMistakesCount,
      });
  }

  return state;
};

export {ActionType, ActionCreator, reducer};
