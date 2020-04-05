import {entriesConstants} from "./../entries.constants";
import {createReducer} from "src/helpers";
import {getEntriesRequest, getEntriesSuccess, getEntriesError} from "./getEntires";

const initialState = {entries: [], error: "", loading: true};

export const entries = createReducer(initialState, {
    [entriesConstants.GET_ENTRIES_REQUEST]: getEntriesRequest,
    [entriesConstants.GET_ENTRIES_ERROR]: getEntriesError,
    [entriesConstants.GET_ENTRIES_SUCCESS]: getEntriesSuccess
});
