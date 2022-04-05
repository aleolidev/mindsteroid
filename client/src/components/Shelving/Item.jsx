import React from 'react';
import styled from 'styled-components';
import { darkTextColor, lightSvg } from '../../utils'

const Item = ({ children, icon }) => {
    return (
        <ItemContainer>
            { icon }
            <ItemText> { children } </ItemText>
        </ItemContainer>
    )
}

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    color: ${darkTextColor};
    font-weight: 400;
    font-size: 1em;
    svg {
        font-size: 1.2rem;
        color: ${ lightSvg };
    }
`;

const ItemText = styled.span`
    padding-left: .8em;
    margin-top: .15em;
`;

export default Item;