import React from "react";
import {withNaming} from "@bem-react/classname";
import {connect} from "react-redux";
import {getEntries} from "src/redux/entries/actions";

const cn = withNaming({n: "", e: "__", m: "_", v: "_"});
const b = cn("main-page");

class Main extends React.Component<any, any> {
    componentDidMount(): void {
        this.props.getEntries();
    }

    render() {
        return <div className={b()}>Тестовая страница)</div>;
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
