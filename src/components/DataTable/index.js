import React from "react";
import { Wrapper, Row, RowItem, RowName } from "./styled";
import { CAC40, NASDAQ, tableItemsNumber } from "../../constants";

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