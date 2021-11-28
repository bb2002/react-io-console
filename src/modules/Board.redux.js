import {createAction, handleActions} from "redux-actions";
import produce from "immer";

export const BOARD_CREATE           = "board.create"
export const BOARD_READ             = "board.read"
export const BOARD_UPDATE           = "board.update"
export const BOARD_DELETE           = "board.delete"
export const BOARD_CREATE_SUCCESS   = "board.create_SUCCESS"
export const BOARD_READ_SUCCESS     = "board.read_SUCCESS"
export const BOARD_UPDATE_SUCCESS   = "board.update_SUCCESS"
export const BOARD_DELETE_SUCCESS   = "board.delete_SUCCESS"
export const BOARD_CREATE_FAILURE   = "board.create_FAILURE"
export const BOARD_READ_FAILURE     = "board.read_FAILURE"
export const BOARD_UPDATE_FAILURE   = "board.update_FAILURE"
export const BOARD_DELETE_FAILURE   = "board.delete_FAILURE"
export const BOARD_RESET            = "board.reset"
export const BOARD_LOADING          = "board.loading"

export const boardCreate = createAction(BOARD_CREATE, data => data)
export const boardRead = createAction(BOARD_READ)
export const boardUpdate = createAction(BOARD_UPDATE, data => data)
export const boardDelete = createAction(BOARD_DELETE, ({ category, no }) => ({ category, no }))
export const boardCreateSuccess = createAction(BOARD_CREATE_SUCCESS, ({ category, no }) => ({ category, no }))
export const boardReadSuccess = createAction(BOARD_READ_SUCCESS, data => data)
export const boardUpdateSuccess = createAction(BOARD_UPDATE_SUCCESS, ({ category, no }) => ({ category, no }))
export const boardDeleteSuccess = createAction(BOARD_DELETE_SUCCESS)
export const boardCreateFailure = createAction(BOARD_CREATE_FAILURE, code => code)
export const boardReadFailure = createAction(BOARD_READ_FAILURE, code => code)
export const boardUpdateFailure = createAction(BOARD_UPDATE_FAILURE, code => code)
export const boardDeleteFailure = createAction(BOARD_DELETE_FAILURE, code => code)
export const boardReset = createAction(BOARD_RESET)
export const boardLoading = createAction(BOARD_LOADING, loading => loading)

const initialState = {
    create: {
        code: 0,
        data: undefined // 글 작성 시, 새로 작성된 글에 대한 정보
    },
    read: {
        code: 0,
        data: {
            news: [],
            notice: [],
            recruit: []
        }        // 글 데이터
    },
    update: {
        code: 0,
        data: undefined // 글 수정 시, 수정된 글에 대한 정보
    },
    remove: {
        code: 0
    },
    loading: false
}

const boardReducer = handleActions({
    [BOARD_READ_SUCCESS]: (state, { payload: data }) => produce(state, draft => {
        draft.read.code = 200
        draft.read.data = { ...state.read.data, ...data }
    }),
    [BOARD_CREATE_SUCCESS]: (state, { payload: data }) => produce(state, draft => {
        draft.create.code = 200
        draft.create.data = data
    }),
    [BOARD_UPDATE_SUCCESS]: (state, { payload: data }) => produce(state, draft => {
        draft.update.code = 200
        draft.update.data = data
    }),
    [BOARD_DELETE_SUCCESS]: (state) => produce(state, draft => {
        draft.remove.code = 200
    }),
    [BOARD_READ_FAILURE]: (state, { payload: code }) => produce(state, draft => {
        draft.read.code = code
    }),
    [BOARD_CREATE_FAILURE]: (state, { payload: code }) => produce(state, draft => {
        draft.create.code = code
    }),
    [BOARD_UPDATE_FAILURE]: (state, { payload: code }) => produce(state, draft => {
        draft.update.code = code
    }),
    [BOARD_DELETE_FAILURE]: (state, { payload: code }) => produce(state, draft => {
        draft.remove.code = code
    }),
    [BOARD_LOADING]: (state, { payload: loading }) => produce(state, draft => {
        draft.load = loading
    }),
    [BOARD_RESET]: () => initialState
}, initialState)

export default boardReducer