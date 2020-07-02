import { GET_DATA_SUCCESS, CHANGE_ELEMENT_DATA } from "../actions";

const initialState = {
    data: [],
    changed: {}
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_SUCCESS:
            if (state.data.length && state.data.some(e => e.changed)) {
                const filteredData = action.data.map((e, i) => {
                    const prevElemChangedValue = state.data.find((elem, index) => index === i)
                    if (prevElemChangedValue && prevElemChangedValue.changed) {
                        return {
                            ...e,
                            stocks: {
                                NASDAQ: typeof prevElemChangedValue.stocks.NASDAQ === "number" ? prevElemChangedValue.stocks.NASDAQ : e.stocks.NASDAQ,
                                CAC40: typeof prevElemChangedValue.stocks.CAC40 === "number"  ? prevElemChangedValue.stocks.CAC40 : e.stocks.CAC40
                            },
                            changed: prevElemChangedValue.changed
                        }
                    }
                    return e
                })

                return {
                    ...state,
                    data: filteredData
                }
            }
            return {
                ...state,
                data: action.data
            }
        case CHANGE_ELEMENT_DATA:
            const { name, value, index } = action;
            const updatedData = state.data.map((e, i) => {
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
            return {
                ...state,
                data: updatedData
            }
        default:
            return state
    }
}

export default rootReducer;