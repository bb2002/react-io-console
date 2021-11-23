import {useDispatch, useSelector} from "react-redux";
import {boardRead, boardReset} from "../modules/Board.redux";

export default function useBoard() {
    const board = useSelector(state => state.board)
    const dispatch = useDispatch()

    const readPosts = (category) => {
        dispatch(boardRead(category))
    }

    const resetBoard = () => {
        dispatch(boardReset())
    }

    return {
        readPosts,
        resetBoard,
        board
    }
}