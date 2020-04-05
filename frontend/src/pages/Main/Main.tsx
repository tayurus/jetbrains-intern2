import React from "react";
import {withNaming} from "@bem-react/classname";
import {connect} from "react-redux";
import {getEntries} from "src/redux/entries/actions";
import Chart from "react-apexcharts";
import {DatePicker, Select} from "antd";
import moment from "moment";
import {IProps, IState} from "./Main.interface";
import {getChartOptions, datesTypes, IDateType} from "src/constants";
import {getLicenseData} from "src/helpers";
import "./Main.scss";

const cn = withNaming({n: "", e: "__", m: "_", v: "_"});
const b = cn("main-page");
const {Option} = Select;

class Main extends React.Component<IProps, IState> {
    state: IState = {
        datePickerType: "date",
        date: moment()
    };

    componentDidMount(): void {
        this.props.getEntries();
    }

    handleDatePickerChange = (date: moment.Moment | null) => {
        this.setState({date: (date || moment()).utcOffset(0).set({hour: 0, minute: 0, second: 0, millisecond: 0})});
    };

    handleDateTypeSelectChange = (value: "date" | "week" | "month" | "quarter" | "year" | undefined) => {
        this.setState({datePickerType: value});
    };

    renderDateTypeSelect = () => {
        const {datePickerType} = this.state;
        return (
            <>
                <div className={b("title")}>Выберите тип временного диапазона</div>
                <Select value={datePickerType} onChange={this.handleDateTypeSelectChange}>
                    {datesTypes.map((it: IDateType, index: number) => (
                        <Option key={`datePicker-key-${index}`} value={it.value}>
                            {it.title}
                        </Option>
                    ))}
                </Select>
            </>
        );
    };

    renderDatePicker = () => {
        const {datePickerType, date} = this.state;
        return (
            <>
                <div className={b("title")}>Выберите дату</div>
                {datePickerType === "date" && (
                    <DatePicker value={date} onChange={this.handleDatePickerChange} picker={"date"}/>
                )}
                {datePickerType === "month" && (
                    <DatePicker value={date} onChange={this.handleDatePickerChange} picker={"month"}/>
                )}
                {datePickerType === "week" && (
                    <DatePicker value={date} onChange={this.handleDatePickerChange} picker={"week"}/>
                )}
                {datePickerType === "quarter" && (
                    <DatePicker value={date} onChange={this.handleDatePickerChange} picker={"quarter"}/>
                )}
            </>
        );
    };

    renderTable = () => {
        return (
            <table className={b("table")}>
                <tr>
                    <th className={b("table-cell")}>Product</th>
                    <th className={b("table-cell")}>Min Usage</th>
                    <th className={b("table-cell")}>Max Usage</th>
                    <th className={b("table-cell")}>Average Usage</th>
                </tr>

                <tr>
                    <td className={b("table-cell")}>IntelliJ IDEA</td>
                    <td className={b("table-cell")}>25</td>
                    <td className={b("table-cell")}>48</td>
                    <td className={b("table-cell")}>30</td>
                </tr>

                <tr>
                    <td className={b("table-cell")}>WebStorm</td>
                    <td className={b("table-cell")}>25</td>
                    <td className={b("table-cell")}>48</td>
                    <td className={b("table-cell")}>30</td>
                </tr>

                <tr>
                    <td className={b("table-cell")}>PhpStorm</td>
                    <td className={b("table-cell")}>25</td>
                    <td className={b("table-cell")}>48</td>
                    <td className={b("table-cell")}>30</td>
                </tr>
            </table>
        );
    };

    renderChart = (title: string, data: any) => <>
        <div className={b("title")}>{title}</div>
        {data && data.length > 0 ? (
            <Chart options={getChartOptions(data[0][0])} series={[{data}]} type='bar'
                   width='75%'/>
        ) : (
            <div>Данных про {title} нет</div>
        )}
    </>

    render() {
        const {datePickerType, date} = this.state;
        const {entries, loading} = this.props;
        const ideaData = getLicenseData(entries, "idea", date, datePickerType);
        const webStormData = getLicenseData(entries, "webstorm", date, datePickerType);
        const golandData = getLicenseData(entries, "goland", date, datePickerType);
        if (loading) {
            return <div>loading...</div>;
        }

        return (
            <div className={b()}>
                {this.renderDateTypeSelect()}
                {this.renderDatePicker()}
                {this.renderTable()}

                {this.renderChart('IDEA', ideaData)}
                {this.renderChart('WebStorm', webStormData)}
                {this.renderChart('goland', golandData)}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    const {entries, loading} = state.entries;

    return {entries, loading};
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        getEntries: () => dispatch(getEntries())
    };
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Main);

export {connectedComponent as Main};
