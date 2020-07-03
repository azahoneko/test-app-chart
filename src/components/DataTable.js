import React from "react";
import styled, { css } from "styled-components";
import { CAC40, NASDAQ, tableItemsNumber } from "../constants";

const Wrapper = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Row = styled.div`
    display: inline-flex;
    align-items: center;
    border-right: none;
    border: 1px solid #ccc;
    border-right: none;
    border-top: none;
    ${props => props.first && css`
        text-align: left; 
        border-top: 1px solid #ccc;;
    `}
`;

const RowItem = styled.input`
    border: none;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
    width: 60px;
    text-align: center;
    height: 24px;
    box-sizing: border-box;
    font-size: 12px;
`;
const RowName = styled.div`
    border-right: 1px solid #ccc;
    padding: 3px 5px;
    height: 24px;
    box-sizing: border-box;
    text-align: left; 
    width: 100px;
    font-size: 14px;
`;

const DataTable = ({ data, toggleUpdate, onChangeData }) => {
    const fillEmpty = () => {
        return (
            <>
                {data.length < tableItemsNumber ?
                    Array(tableItemsNumber - data.length)
                        .fill()
                        .map((e, index) => <RowItem key={index} disabled/>)
                    : null}
            </>
        )
    }

    const onRowItemFocus = () => toggleUpdate(false)
    const onRowItemBlur = () => toggleUpdate(true)
    const onRowItemChange = (event, name, index) => onChangeData(event.target.value, name, index)

    const renderRowItems = (name) =>
        data.map((elem, index) => (
            <RowItem
                key={elem.index}
                value={elem.stocks[name]}
                onFocus={onRowItemFocus}
                onBlur={onRowItemBlur}
                onChange={(event) => onRowItemChange(event, name, index)}
            />
        ));
    const renderRow = (name) => {
        return (
            <Row first={name === NASDAQ}>
                <RowName naming>{name}</RowName>
                {renderRowItems(name)}
                {fillEmpty()}
            </Row>
        )
    }
    const renderRows = () => {
        return (
            <>
                {renderRow(NASDAQ)}
                {renderRow(CAC40)}
            </>
        )
    }
    return (
        <Wrapper>
            {renderRows()}
        </Wrapper>
    )
};

export default DataTable;