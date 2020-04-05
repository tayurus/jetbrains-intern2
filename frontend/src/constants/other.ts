export const datesTypes = [
    {
        value: "date",
        title: "День"
    },
    {
        value: "week",
        title: "Неделя"
    },
    {
        value: "month",
        title: "Месяц"
    },
    {
        value: "quarter",
        title: "Квартал"
    }
];

export interface IDateType {
    value: string;
    title: string;
}
