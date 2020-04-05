import {baseURL, endpoints} from "src/constants";
import {entriesConstants} from "../entries.constants";

export const getEntries = () => {
    return async function (dispatch: Function) {
        dispatch(request());
        try {
            const entries = await getEntriesService();
            if (!entries.error) {
                dispatch(success(entries));
            } else {
                alert("Не получилось получить данные с сервера!");
                dispatch(failure());
            }
        } catch (err) {
            alert("Не получилось получить данные с сервера!");
            dispatch(failure());
        }
    };

    function request() {
        return {type: entriesConstants.GET_ENTRIES_REQUEST};
    }

    function success(entries: any) {
        return {type: entriesConstants.GET_ENTRIES_SUCCESS, entries};
    }

    function failure() {
        return {type: entriesConstants.GET_ENTRIES_ERROR};
    }
};

//////////// СЕРВИС //////////////////
async function getEntriesService() {
    const res = await fetch(`${baseURL}${endpoints.entries.get}`);
    return await res.json();
}
