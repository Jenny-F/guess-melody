import {createSelector} from "reselect";
import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;

const getQuestions = (state) => {
  return state[NAME_SPACE].questions;
};

const randomFilter = () => {
  return Math.random() > 0.5;
};

const getArtistQuestions = createSelector(
    getQuestions,
    randomFilter,
    (resOne, resTwo) => {
      resOne.filter((item) => resTwo && item.type === `artist`);
    }
);

const getGenreQuestions = createSelector(
    getQuestions,
    (res) => {
      res.filter((item) => item.type === `genre`);
    }
);

export {getQuestions, getArtistQuestions, getGenreQuestions};
