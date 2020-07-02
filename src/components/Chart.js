import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import styled from "styled-components";
import { connect } from "react-redux";
import { getData, changeElementData } from "../redux/actions";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import DataTable from "./DataTable";

const Container = styled.div`
    margin: 20px;
`
let interval;

const ChartWrapper = ({ getData, data, changeElementData }) => {
    useEffect(() => {
        getData();
        toggleUpdate(true)
        return () => toggleUpdate(false)
    }, [])

    const toggleUpdate = (condition) => {
        if (condition) {
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

    const getRefactoredData = () => {
        const chartData = [];
        data.forEach((e, i) => {
            chartData.push({
                name: i + 1,
                NASDAQ: e.stocks.NASDAQ,
                CAC40: e.stocks.CAC40,
            })
        })

        return chartData
    }

    return (
        <Container>
            <LineChart
                width={800}
                height={500}
                data={getRefactoredData()}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    dataKey="NASDAQ"
                    stroke="#33BBFF"
                    animationDuration={0}
                />
                <Line
                    dataKey="CAC40"
                    stroke="#FFB900"
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
}
const mapStateToProps = (state) => {
    return {
        data: state.dataReducer.data,
    };
}

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
)(ChartWrapper)