import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { HiOutlinePlus } from 'react-icons/hi'
import { darkTextColor, primaryEmerald, inputSvgColor } from '../../utils'
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import 'react-edit-text/dist/index.css';

import { createDeck, updateFolder, getDecks } from '../../actions/decks';
import Folder from './Folder/Folder';
import { useParams } from 'react-router-dom';
import NewFolderContainer from './NewFolderContainer';
import NewDeckContainer from './NewDeckContainer';

const Folders = () => {
    // const rootFolder = '62373faa8d7f44c7ec8c39a7';

    const { decks, isLoading } = useSelector((state) => state.decks);
    const [decksData, setDecksData] = useState([]);
    const [decksLength, setDecksLength] = useState(0);
    const decksImported = useRef(false);
    // const folderName = useRef("");
    const dispatch = useDispatch();

    const decksRef = useRef();

    const { id } = useParams();
    const [ folderId, setFolderId ] = useState(id);

    
    console.log("==== START ITER ==== ")
    console.log('route-id:', id)
    console.log('decks', decks)
    console.log('decksData', decksData)
    
    
    if (decks !== undefined && decks !== null && decks.length !== decksLength) {
            
        setDecksLength(decks.length);
    }

    const handleSubmit = async () => {
        // console.log('handleSubmit')
        // Saves the last created deck
        // console.log('decksData:', {...decksData[0]})
        dispatch(await createDeck({...decksData[0]}, id))
    }
    
    
    // Adds a new item to local array of decks
    const handleDeckAdd = () => {
        // console.log('handleDeckAdd')
        setDecksData([{ name: 'Nuevo mazo'}, ...decksData])
    }
    
    const handleEditName = (index, e) => {
        // console.log('handleEditName')
        const values = [...decks];
        // Due to it's loaded reversed, we need to reverse the index too
        values[decks.length - index - 1].name = e
        setDecksData(values);
    }
    
    const handleUpdateName = (index, e) => {
        // console.log('handleUpdateName')
        dispatch(updateFolder(decksData[decks.length - index - 1]))
    }
    
    useEffect(() => {
        // console.log('useEffect[dispatch]')
        dispatch(getDecks(id));
    }, [dispatch]);

    // If the local array of decks changes his length...
    useEffect(() => {
        // console.log('useEffect[decksData.length]')
        if (decks !== undefined) {
            // If new item added to decksData, insert the new item
            if (decksData[0] !== undefined && decksData[0] !== null && decksData.length > decks.length) {
                handleSubmit()
            }
        }
    }, [decksData.length])

    
    // If the decks array of the db changes his length...
    useEffect(() => {
        // console.log('useEffect[decksLength]')
        if (decksImported.current)
        {
            if (decksRef.current !== undefined 
                && decksRef.current !== null 
                && decksRef.current.children[1] !== undefined 
                && decksRef.current.children[1] !== null) 
                
            {
                decksRef.current.children[1].firstChild.children[1].click();
            }
        }
    }, [decksLength])

    useEffect(() => {
        dispatch(getDecks(id));
        setFolderId(id);
    }, [id])

    // console.log(dispatch(getDecks(id)));
    
    
    // Import db changes to local whenever they change...
    useEffect(() => {
        // console.log('useEffect[decks2]')
        if(decks !== undefined && decks.length > 0) {
            setDecksData(decks);
            decksImported.current = true;
        }
    }, [decks])

    if(!decks || isLoading) {
        console.log("==== END ITER: NULL ==== ")
        return null;
    } 

    
    console.log("==== END ITER: FULL CONTENT ==== ")


    return (
        <Container className="workspace">
            <TitleText>Carpetas</TitleText>
            <TitleUnderline />
            <NewFolderContainer>
                <Grid container ref={decksRef}>
                    {decks.slice(0).reverse().map((deck, index) => (
                        <Grid key={deck._id} item xs={12} sm={6} md={3} >
                            <Folder deck={deck} handleEditName={handleEditName} handleUpdateName={handleUpdateName} folderObj={decksData[decks.length - index - 1]} index={index} />
                        </Grid>
                    ))}
                </Grid>
            </NewFolderContainer>
            
            <TitleText>Mazos</TitleText>
            <TitleUnderline />
            <NewDeckContainer>
                <Grid container ref={decksRef}>
                    {decks.slice(0).reverse().map((deck, index) => (
                        <Grid key={deck._id} item xs={12} sm={6} md={3} >
                            <Folder deck={deck} handleEditName={handleEditName} handleUpdateName={handleUpdateName} folderObj={decksData[decks.length - index - 1]} index={index} />
                        </Grid>
                    ))}
                </Grid>
            </NewDeckContainer>
        </Container>
        // </Container>
    )
}

const Container = styled.div`
    padding: 2.5em;

`;

const NewDeck = styled.div`
    width: 75%;
    display: flex;
    padding: .5em 1em;
    margin: 1em 2em 1em 0;
    color: ${darkTextColor};
    font-weight: 600;
    border-radius: 1em;
    border: dashed 3px  ${inputSvgColor};
    cursor: pointer;
    transition: 0.2s ease-in-out;
    &:hover {   
        border: dashed 3px  #7770b7; 
        svg {
            color: #7770b7;
        }
        div {
            color: #7770b7;
        }
    }
`;

const NewDeckIcon = styled.div`
    height: 2.5rem;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: .75rem;
    border-bottom-left-radius: .75rem;
    svg {
        color: ${ inputSvgColor };
        font-size: 1.4rem;
        transition: 0.2s ease-in-out;
    }
`;

const NewDeckText = styled.div`
    color: ${inputSvgColor};
    font-weight: 600;
    margin-top: .1em;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .25 .5em;
    font-weight: 600;
    outline: none;
    border: 0
    border-radius: .5em;
    transition: 0.2s ease-in-out;
`;

const TitleText = styled.h1`
    color: ${darkTextColor};
    font-weight: 600;
`;

const TitleUnderline = styled.div`
    width: 0;
    padding: 0 0 .25em 2.5em;
    margin-top: -1em;
    margin-bottom: 1em;
    border-radius: 2em;
    background-color: ${primaryEmerald};
`;

export default Folders;