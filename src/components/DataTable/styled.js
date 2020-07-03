import styled, {css} from "styled-components";

export const Wrapper = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const Row = styled.div`
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

export const RowItem = styled.input`
    border: none;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
    width: 60px;
    text-align: center;
    height: 24px;
    box-sizing: border-box;
    font-size: 12px;
`;
export const RowName = styled.div`
    border-right: 1px solid #ccc;
    padding: 3px 5px;
    height: 24px;
    box-sizing: border-box;
    text-align: left; 
    width: 100px;
    font-size: 14px;
`;