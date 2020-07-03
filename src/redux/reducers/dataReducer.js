import { GET_DATA_SUCCESS, UPDATE_DATA_WITH_CHANGED_ELEMENT } from "../actions/constants";

const initialState = {
    data: [],
    changed: {}
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        case UPDATE_DATA_WITH_CHANGED_ELEMENT:
            return {
                ...state,
                data: action.data
            }
        default:
            return state
    }
}

export default rootReducer;