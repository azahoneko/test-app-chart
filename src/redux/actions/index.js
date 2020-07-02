import DataService from "../../services/DataService";

export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS'
export const CHANGE_ELEMENT_DATA = 'CHANGE_ELEMENT_DATA'

export const getDataSuccess = data => ({
    type: GET_DATA_SUCCESS,
    data
});

export const getData = () => {
    return (dispatch) => {
        return DataService.getData()
            .then(response => {
                dispatch(getDataSuccess(response.data));
                return response;
            })
    };
}

export const changeElementData = (value, name, index) => {
    return {
        type: CHANGE_ELEMENT_DATA,
        value,
        name,
        index
    }
}