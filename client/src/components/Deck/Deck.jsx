import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import * as api from '../../api';
import FolderPath from '../Shelving/FolderPath';
import DeckQuestions from './DeckQuestions';
import { MdAdd, MdOutlineCheck, MdOutlineRefresh } from 'react-icons/md';
import { backgroundLightBlue, darkTextColor, inputSvgColor, primaryBlue, primaryDarkEmerald, primaryEmerald, primaryLightEmerald1, primaryLightEmerald2 } from '../../utils';

const Deck = () => {
    
    const [ folderPath, setFolderPath] = useState([]);
    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { id } = useParams();

    
    const handleNewCard = () => {
        navigate(`/deck/${ id }/new-card`);
    }

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
                <RightIconsContainer style={{display: 'flex', flexWrap: 'wrap',}}>
                    <RightButtons><MdOutlineCheck />Examen</RightButtons>
                    <RightButtons style={{marginRight: 0,}}><MdOutlineRefresh />Practicar</RightButtons>
                    <AddNewCardButton onClick={ handleNewCard }><MdAdd /></AddNewCardButton>
                </RightIconsContainer>
            } />

            <DeckQuestions id={ id } />
        </Container>
    )
}

const RightButtons = styled.div`
    margin-right: 1em;
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


const AddNewCardButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -.3em;
    margin: -.3em 0 0 1.25em;
    padding: 0em .5em;
    height: 2.4em;
    display: flex;
    border-radius: .75em;
    // background-color: ${ primaryEmerald };
    cursor: pointer;
    transition: 0.2s ease-in-out;
    border: 2px solid ${ primaryEmerald };
    svg {
        // margin-right: .4em;
        transition: 0.2s ease-in-out;
        font-size: 1.4rem;
        color: ${ primaryEmerald };

    }
    &:hover {
        background-color: ${ primaryEmerald };
        svg {
            color: ${ primaryLightEmerald1 };
        }
    }
`;

const RightIconsContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: -.5em;
`;

const Container = styled.div`
    padding: 1.5em 2.5em 2.5em 2.5em;

`;

export default Deck;