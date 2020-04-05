import moment from "moment";
import {IEntry} from "src/constants";

const getEndDate = (
    startDate: moment.Moment | null,
    intervalType: "date" | "week" | "month" | "quarter" | "year" | undefined
): moment.Moment => {
    switch (intervalType) {
        case "date":
            return (startDate?.clone() || moment()).add(1, 'day');
        case "week":
            return (startDate?.clone() || moment()).add(1, "week");
        case "month":
            return (startDate?.clone() || moment()).add(1, "month");
        case "quarter":
            return (startDate?.clone() || moment()).add(1, "quarter");
    }

    return startDate?.clone() || moment();
};

// извлекает информацию об IDE ideName за период intervalType, начиная с startDate
export const getLicenseData = (
    data: Array<IEntry>,
    ideName: string,
    startDate: moment.Moment | null,
    intervalType: "date" | "week" | "month" | "quarter" | "year" | undefined
) => {
    return data.reduce((acc: any, it: IEntry) => {
        // определим конечную дату на основании startDate и intervalType
        const endDate: moment.Moment = getEndDate(startDate, intervalType);
        // возьмем дату текущего элемент массива и сконвертируем ее из строки в moment
        const currentDate = moment(it.timestamp);

        // если она лежит между startDate и endDate
        if (currentDate.isBetween(startDate || moment(), endDate)) {
            // поместим ее в acc и вернем
            return [...acc, [currentDate.valueOf(), it[ideName]]];
        }

        // просто возвращаем acc
        return acc;
    }, []);
};
