const initialState = {
    data: [],
    url: {
        phase: [],
        lob: [],
        cap: [],
        stu: []
    }
}

const reducer = (state = initialState, action) => {
    if (action.type === 'phase') {
        return {
            ...state,
            data: action.data,
            url: {...state.url, phase: action.params}
        }
    }
    if (action.type === 'lob') {
        return {
            ...state,
            data: action.data,
            url: {...state.url, lob: action.params}
        }
    }
    if (action.type === 'cap') {
        return {
            ...state,
            data: action.data,
            url: {...state.url, cap: action.params}
        }
    }
    if (action.type === 'stu') {
        return {
            ...state,
            data: action.data,
            url: {...state.url, stu: action.params}
        }
    }
    return state;
}

export default reducer;