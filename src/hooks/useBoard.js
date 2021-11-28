import {useDispatch, useSelector} from "react-redux";
import {boardCreate, boardDelete, boardRead, boardReset, boardUpdate} from "../modules/Board.redux";
import {useFirebaseLogin} from "./useFirebaseLogin";

export default function useBoard() {
    const board = useSelector(state => state.board)
    const { getConfigFromStorage, firebaseLogin } = useFirebaseLogin()
    const dispatch = useDispatch()

    const readPosts = (category) => {
        firebaseLogin(getConfigFromStorage(), false)
        dispatch(boardRead(category))
    }

    const writePost = (data) => {
        dispatch(boardCreate(data))
    }

    const updatePost = (data) => {
        dispatch(boardUpdate(data))
    }

    const deletePost = (category, no) => {
        dispatch(boardDelete({ category, no }))
    }

    const resetBoard = () => {
        dispatch(boardReset())
    }

    return {
        readPosts,
        writePost,
        resetBoard,
        deletePost,
        updatePost,
        board
    }
}