import {combineReducers} from "redux";
import boardReducer from "./Board.redux";

const rootReducer = combineReducers({
    board: boardReducer
})

export default rootReducer