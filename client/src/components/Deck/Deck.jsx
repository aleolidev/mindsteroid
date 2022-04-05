import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import * as api from '../../api';
import { getFolders } from '../../actions/folders';
import { getDecks } from '../../actions/decks';
import FolderPath from '../Shelving/FolderPath';
import DeckQuestions from './DeckQuestions';
import { MdOutlineCheck, MdOutlineRefresh } from 'react-icons/md';
import { backgroundLightBlue, darkTextColor, inputSvgColor, primaryBlue } from '../../utils';

const Deck = () => {
    
    const [ folderPath, setFolderPath] = useState([]);
    const dispatch = useDispatch();

    const { id } = useParams();

    const getHierarchy = async () => {
        let currentId = id;
        let hierarchy = [];
        let obj;
        let isDeck = true;

        while(currentId !== null && currentId !== undefined) {
            if (isDeck) {
                obj = await api.getDeckById(currentId);
            } else {
                obj = await api.getFolderById(currentId);
            }
            // console.log(obj);
            if (obj !== null 
                && obj !== undefined
                && obj.data !== null 
                && obj.data !== undefined
            ) {
                hierarchy.push({name: obj.data.name, _id: obj.data._id});
                try {
                    if (obj.data.parent !== null && obj.data.parent !== undefined) {
                        obj = obj.data.parent.toString();
                    } else {
                        obj = null;
                    }
                } catch (err) {
                    console.log(err);
                    obj = null;
                }
            }
            currentId = obj;
            if(isDeck) isDeck = false;
        }

        hierarchy.reverse();

        return hierarchy;
    }

    useEffect(async () => {
        setFolderPath([...await getHierarchy()]);
    }, [id])

    // const icons = () => {
    //     <Return
    // }

    return (
        <Container className="workspace">
            <FolderPath folderPath={ folderPath } lastIsDeck={ true } rightPanel={
                <RightIconsContainer>
                    <RightButtons><MdOutlineCheck /> Examen</RightButtons>
                    <RightButtons><MdOutlineRefresh /> Practicar</RightButtons>
                </RightIconsContainer>
            } />

            <DeckQuestions id={ id } />
        </Container>
    )
}

const RightButtons = styled.div`
    margin-left: 2em;
    margin-right: -1em;
    padding: .75em 1.25em;
    display: flex;
    justify-content: center;
    color: ${ darkTextColor };
    font-weight: 600;
    border-radius: 1em;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    svg {
        margin-right: .4em;
        transition: 0.2s ease-in-out;
        font-size: 1.4rem;
        color: ${ inputSvgColor };

    }
    &:hover {
        background-color: ${ backgroundLightBlue };
        svg {
            color: ${ primaryBlue };
        }
    }
`;

const RightIconsContainer = styled.div`
    display: flex;
    margin-top: -.5em;
`;

const Container = styled.div`
    padding: 1.5em 2.5em 2.5em 2.5em;

`;

export default Deck;