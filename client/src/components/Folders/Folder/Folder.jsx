import React from 'react'
import styled from 'styled-components'
import { darkTextColor, backgroundLightBlue, inputSvgColor } from '../../../utils'
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDecks } from '../../../actions/decks';
import { HiFolder } from 'react-icons/hi';

const Folder = ({ deck, handleEditName, handleUpdateName, folderObj, index }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openFolder = (e) => {
        if (e.target.getAttribute("name") == "card" && folderObj !== undefined && folderObj !== null) {
            // console.log("CLICK")
            dispatch(getDecks(folderObj._id));
            navigate(`/folder/${folderObj._id}`)
        }
    }

    return (
        <Card name="card" onClick={(e) => openFolder(e)}>
            <Icon>
                <HiFolder />
            </Icon>
            <EditText 
                defaultValue='Mazo nuevo' 
                value={deck.name}
                onChange={e => handleEditName(index, e)}
                onSave={e => handleUpdateName(index, e)}
                style={
                    {
                        // whiteSpace: 'normal',
                        boxSizing: 'border-box',
                        padding: '.25 .5em',
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
    display: flex;
    padding: .5em 1em;
    margin: 1em 2em 1em 0;
    background-color: ${ backgroundLightBlue };
    color: ${darkTextColor};
    font-weight: 600;
    border-radius: 1em;
    cursor: pointer;
    input {
        margin: 0em;
        font-size: .9em;
        font-weight: 400;
        // height: 3em;
        padding-left: .5em;
        padding-right: .5em;
        padding-bottom: 0;
        padding-top: 0;
        border-radius: 1em;
        background-color: #b6b9dc;
        // border-radius: 5em;
    };
    div {
        // margin-top: -.5em;
        transition: 0.2s ease-in-out;
        &:hover {
            background-color: #d4d5ee;
        }
    }
`;

const Icon = styled.span`
    height: 2.5rem;
    width: 3rem;
    background-color: ${ backgroundLightBlue };
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: .75rem;
    border-bottom-left-radius: .75rem;
    svg {
        color: ${ inputSvgColor };
        font-size: 1.4rem;
    }
`;


export default Folder;