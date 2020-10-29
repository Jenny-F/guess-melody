import {combineReducers} from "redux";
import NameSpace from "./name-space.js";
import {reducer as data} from "../reducer/data/data.js";
import {reducer as game} from "../reducer/game/game.js";

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.GAME]: game,
});
