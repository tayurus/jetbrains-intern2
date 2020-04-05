export const getEntriesRequest = (state: any, action: any) => {
    return {
        ...state,
        loading: true
    };
};

export const getEntriesSuccess = (state: any, action: any) => {
    return {
        ...state,
        loading: false,
        entries: action.entries,
        error: undefined
    };
};

export const getEntriesError = (state: any, action: any) => {
    return {...state, error: action.error, loading: false};
};
