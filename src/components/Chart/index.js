import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { getData, changeElementData } from "../../redux/actions";
import { Container } from "./styled"
import DataTable from "../DataTable/index";
import {CAC40, NASDAQ, strokeColors} from "../../constants";

let interval;

const ChartWrapper = ({ getData, data, changeElementData }) => {
    useEffect(() => {
        getData();
        toggleUpdate(true)
        return () => toggleUpdate(false)
    }, [])

    const toggleUpdate = (startUpdate) => {
        if (startUpdate) {
            interval = setInterval(() => {
                getData()
            }, 1000)
        } else {
            clearInterval(interval)
        }
    }

    const onChangeData = (value, name, index) => {
        if (!isNaN(+value)) {
            changeElementData(value, name, index)
        }
    }

    const getRefactoredData = () => data.map((elem, index) => ({
        name: index + 1,
        NASDAQ: elem.stocks.NASDAQ,
        CAC40: elem.stocks.CAC40,
    }))

    const refactoredData = getRefactoredData()

    return (
        <Container>
            <LineChart
                width={800}
                height={500}
                data={refactoredData}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    dataKey={NASDAQ}
                    stroke={strokeColors[0]}
                    animationDuration={0}
                />
                <Line
                    dataKey={CAC40}
                    stroke={strokeColors[1]}
                    animationDuration={0}

                />
            </LineChart>
            <DataTable
                data={data}
                toggleUpdate={toggleUpdate}
                onChangeData={onChangeData}
            />
        </Container>
    )
};
const mapStateToProps = (state) => {
    return {
        data: state.dataReducer.data,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getData,
            changeElementData
        },
        dispatch,
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChartWrapper);