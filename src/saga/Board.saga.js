import {BOARD_READ, boardLoading, boardReadFailure, boardReadSuccess} from "../modules/Board.redux";
import { put, call, takeLatest } from 'redux-saga/effects';
import { collection, getDocs } from "firebase/firestore";
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
                console.log("DATA", data)

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
        yield put(boardReadSuccess(posts))
    }, function* (ex) {
        console.log(ex)
        if(ex.response === undefined) {
            yield put(boardReadFailure(-1))
        } else {
            yield put(boardReadFailure(ex.response.status))
        }
    })
}

export default function* boardSaga() {
    yield takeLatest(BOARD_READ, boardReadGen())
}