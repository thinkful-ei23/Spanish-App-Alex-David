import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR
} from '../actions/protected-data';

import {
    SET_NEXT_QUESTION
} from '../actions/guess';

const initialState = {
    data: [],
    index: 0,
    error: null
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
        return Object.assign({}, state, {
            data: action.data,
            error: null
        });
    } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if(action.type === SET_NEXT_QUESTION) {
        return Object.assign({}, state, {
            index: action.index
        });
    }
    return state;
}