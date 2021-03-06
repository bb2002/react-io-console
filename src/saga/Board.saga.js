import {
    BOARD_CREATE, BOARD_DELETE,
    BOARD_READ, BOARD_UPDATE,
    boardCreateFailure,
    boardCreateSuccess, boardDeleteSuccess,
    boardLoading,
    boardReadFailure,
    boardReadSuccess, boardUpdateFailure, boardUpdateSuccess
} from "../modules/Board.redux";
import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { fbStore } from "../libs/Firebase"
import moment from "moment";

function generateBoardFunction(exec, fail) {
    return function* (action) {
        yield put(boardLoading(true))
        try {
            yield exec(action)
        } catch(ex) {
            yield fail(ex)
        }
        yield put(boardLoading(false))
    }
}

function boardReadGen() {
    return generateBoardFunction(function* (action){
        async function patch() {
            const snapshot = await getDocs(collection(fbStore, `/${action.payload}`))
            let output = []

            snapshot.forEach(doc => {
                const data = doc.data()

                output.push({
                    no: doc.id,
                    title: data.title,
                    description: data.description,
                    files: data.files,
                    createdAt: moment.unix(data.createdAt.seconds)
                })
            })

            return output
        }

        const posts = yield call(patch)
        const result = {
            [action.payload]: posts
        }

        yield put(boardReadSuccess(result))
    }, function* (ex) {
        if(ex.response === undefined) {
            yield put(boardReadFailure(-1))
        } else {
            yield put(boardReadFailure(ex.response.status))
        }
    })
}

function boardCreateGen() {
    return generateBoardFunction(function* (action) {
        async function patch() {
            const docName = Math.random().toString(36).substr(2,11)
            const ref = doc(fbStore, action.payload.category, docName)
            await setDoc(ref, {
                title: action.payload.title,
                description: action.payload.content,
                files: action.payload.files,
                createdAt: new Date()
            })
            return docName
        }

        const newDoc = yield call(patch)
        yield put(boardCreateSuccess({ category: action.payload.category, no: newDoc }))
    }, function* (ex) {
        if(ex.response === undefined) {
            yield put(boardCreateFailure(-1))
        } else {
            yield put(boardCreateFailure(ex.response.status))
        }
    })
}

function boardUpdateGen() {
    return generateBoardFunction(function* (action) {
        async function patch() {
            const docName = action.payload.no
            const ref = doc(fbStore, action.payload.category, docName)
            await setDoc(ref, {
                title: action.payload.title,
                description: action.payload.content,
                files: action.payload.files,
                createdAt: new Date()
            })
            return docName
        }

        const updatedDoc = yield call(patch)
        yield put(boardUpdateSuccess({ category: action.payload.category, no: updatedDoc }))
    }, function* (ex) {
        if(ex.response === undefined) {
            yield put(boardUpdateFailure(-1))
        } else {
            yield put(boardUpdateFailure(ex.response.status))
        }
    })
}

function boardDeleteGen() {
    return generateBoardFunction(function* (action) {
        async function patch() {
            const ref = doc(fbStore, action.payload.category, action.payload.no)
            await deleteDoc(ref)
        }

        yield call(patch)
        yield put(boardDeleteSuccess())
    }, function* (ex) {
        if(ex.response === undefined) {
            yield put(boardDeleteSuccess(-1))
        } else {
            yield put(boardDeleteSuccess(ex.response.status))
        }
    })
}

export default function* boardSaga() {
    yield takeEvery(BOARD_READ, boardReadGen())
    yield takeLatest(BOARD_CREATE, boardCreateGen())
    yield takeLatest(BOARD_UPDATE, boardUpdateGen())
    yield takeLatest(BOARD_DELETE, boardDeleteGen())
}