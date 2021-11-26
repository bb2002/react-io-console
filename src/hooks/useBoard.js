import {useDispatch, useSelector} from "react-redux";
import {boardRead, boardReset} from "../modules/Board.redux";
import {useFirebaseLogin} from "./useFirebaseLogin";

export default function useBoard() {
    const board = useSelector(state => state.board)
    const { getConfigFromStorage, firebaseLogin } = useFirebaseLogin()
    const dispatch = useDispatch()

    const readPosts = (category) => {
        firebaseLogin(getConfigFromStorage(), false)
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