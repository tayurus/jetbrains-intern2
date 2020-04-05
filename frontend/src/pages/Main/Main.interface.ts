import * as moment from "moment";
import {IEntry} from 'src/constants'

export interface IProps {
    entries: Array<IEntry>;
    getEntries: () => {},
    loading: boolean;
}

export interface IState {
    datePickerType: 'date' | 'week' | 'month' | 'quarter' | 'year' | undefined,
    date: moment.Moment | null
}
