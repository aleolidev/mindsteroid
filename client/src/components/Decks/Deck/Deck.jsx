import React from 'react'
import styled from 'styled-components'
import { darkTextColor, backgroundLightBlue } from '../../../utils'
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';


const Deck = ({ deck, handleChangeName, index }) => {

    const handleUpdate = () => {

    }

    return (
        <Card>
            <EditText 
                defaultValue='Mazo nuevo' 
                value={deck.name}
                onChange={e => handleChangeName(index, e)}
                onSave={handleUpdate}
                style={
                    {
                        whiteSpace: 'normal',
                        boxSizing: 'border-box',
                        padding: '.6em .5em',
                        color: darkTextColor,
                        fontWeight: 600,
                        outline: 'none',
                        border: 0,
                        borderRadius: '.5em',
                    }
                }
            />
        </Card>
    )
}

const Card = styled.div`
    width: 75%;
    height: 7.5em;
    padding: 1em;
    margin: 1em 2em 1em 0;
    background-color: ${ backgroundLightBlue };
    color: ${darkTextColor};
    font-weight: 600;
    border-radius: 1em;
    cursor: pointer;
    input {
        margin-top: -.6em;
        font-size: .9em;
        font-weight: 400;
        height: 3em;
        padding: 0;
        background-color: #b6b9dc;
        // border-radius: 5em;
    };
    div {
        margin-top: -.5em;
        transition: 0.2s ease-in-out;
        &:hover {
            background-color: #d4d5ee;
        }
    }
`;


export default Deck;