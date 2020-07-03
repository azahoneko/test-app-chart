import { requestData } from "../../services/DataService";
import { GET_DATA_SUCCESS, UPDATE_DATA_WITH_CHANGED_ELEMENT } from "./constants";
import {numberRegex} from "../../constants";

export const getDataSuccess = data => ({
    type: GET_DATA_SUCCESS,
    data
});

export const getData = () => {
    return async (dispatch, getState) => {
        const response = await requestData();
        const prevData = getState().dataReducer.data;
        if (prevData.length && prevData.some(elem => elem.changed)) {
            const filteredData = response.data.map((elem, index) => {
                const prevElemChangedValue = prevData[index]
                return prevElemChangedValue && prevElemChangedValue.changed ? {
                    ...elem,
                    stocks: {
                        NASDAQ: numberRegex.test(prevElemChangedValue.stocks.NASDAQ) ? prevElemChangedValue.stocks.NASDAQ : elem.stocks.NASDAQ,
                        CAC40: numberRegex.test(prevElemChangedValue.stocks.CAC40) ? prevElemChangedValue.stocks.CAC40 : elem.stocks.CAC40
                    },
                    changed: prevElemChangedValue.changed
                } : elem
            })
            dispatch(getDataSuccess(filteredData));
        } else {
            dispatch(getDataSuccess(response.data));
        }
    };
}

export const updateDataWithChangedElement = (updatedData) => ({
    type: UPDATE_DATA_WITH_CHANGED_ELEMENT,
    data: updatedData
})

export const changeElementData = (value, name, index) => {
    return (dispatch, getState) => {
        const prevData = getState().dataReducer.data;
        const updatedData = prevData.map((e, i) => {
            if (i === index) {
                let updatedElem = {
                    ...e,
                    stocks: {
                        ...e.stocks,
                        [name]: value,
                    },
                }
                if (e.changed) {
                    e.changed.includes(name) ? updatedElem.changed = [...e.changed] : updatedElem.changed = [...e.changed, name]
                } else {
                    updatedElem.changed = [name]
                }
                return updatedElem
            }

            return e;
        })
        dispatch(updateDataWithChangedElement(updatedData))
    }
}