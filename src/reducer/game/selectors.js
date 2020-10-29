import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.GAME;

const getMistakesCount = (state) => {
  return state[NAME_SPACE].mistakesCount;
};

const getMaxMistakesCount = (state) => {
  return state[NAME_SPACE].maxMistakesCount;
};

const getStep = (state) => {
  return state[NAME_SPACE].step;
};

export {getMaxMistakesCount, getMistakesCount, getStep};
