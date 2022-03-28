import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { HiOutlinePencil } from 'react-icons/hi'
import { CgTrashEmpty } from 'react-icons/cg'
import { darkTextColor, primaryEmerald, inputSvgColor, lightSvg } from '../../utils'
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import 'react-edit-text/dist/index.css';

import { createDeck, updateFolder, getDecks } from '../../actions/folders';
import Folder from './Folder/Folder';
import { useParams } from 'react-router-dom';
import CustomContainer from './CustomContainer';
import CustomDialog from '../CustomDialog';

const Folders = () => {
    // const rootFolder = '62373faa8d7f44c7ec8c39a7';

    const { decks, isLoading } = useSelector((state) => state.decks);
    const [ decksData, setDecksData ] = useState([]);
    const [ decksLength, setDecksLength ] = useState(null);
    const [ decksLastLength, setDecksLastLength ] = useState(null);
    const [ openDialog, setOpenDialog ] = useState(false);
    const decksImported = useRef(false);
    const dispatch = useDispatch();

    const foldersRef = useRef();

    const { id } = useParams();
    const [ folderId, setFolderId ] = useState(id);

    
    // console.log("==== START ITER ==== ")
    // console.log('route-id:', id)
    // console.log('decks', decks)
    // console.log('decksData', decksData)
    
    
    if (decks !== undefined && decks !== null){
        if (decksLength === null) {
            setDecksLastLength(decks.length);
            setDecksLength(decks.length);
        }
        
        if (decks.length !== decksLength) {
            setDecksLength(decks.length);
        }
        // if (decksLength === null) {
        //     setDecksLastLength(decks.length);
        // }
    }

    // Saves the last created deck
    const handleSubmit = async () => {
        // console.log('handleSubmit')
        dispatch(await createDeck({...decksData[0]}, id))
    }
    
    
    // Adds a new item to local array of decks
    const handleDeckAdd = () => {
        // console.log('handleDeckAdd')
        setDecksData([{ name: 'Nueva carpeta'}, ...decksData])
    }
    
    const handleEditName = (index, e) => {
        // console.log('handleEditName')
        const values = [...decks];
        values[index].name = e
        setDecksData(values);
    }
    
    const handleUpdateName = (index, name) => {
        // console.log('handleUpdateName')
        const values = [...decks];
        values[index].name = name
        setDecksData(values);
        dispatch(updateFolder(decksData[index]))
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    
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
        if (decksImported.current 
            && foldersRef.current !== undefined 
            && foldersRef.current !== null 
            && foldersRef.current.children[decksData.length - 1] !== undefined 
            && foldersRef.current.children[decksData.length - 1] !== null
            && decksLength > decksLastLength)
        {
            handleOpenDialog();
        }
        setDecksLastLength(decksLength);
    }, [decksLength])

    useEffect(() => {
        dispatch(getDecks(id));
        setFolderId(id);
    }, [id])

    // console.log(dispatch(getDecks(id)));
    
    
    // Import db changes to local whenever they change...
    useEffect(() => {
        // console.log(decks);
        // console.log('useEffect[decks2]')
        if(decks !== undefined && decks.length > 0) {
            setDecksData(decks);
            decksImported.current = true;
        }
    }, [decks])

    if(!decks || isLoading) {
        // console.log("==== END ITER: NULL ==== ")
        return null;
    } 

    
    // console.log("==== END ITER: FULL CONTENT ==== ")

    const foo = () => {
        console.log('foo')
    }

    const foldersActions = [
        {action: handleDeckAdd, title: <Item icon={ <MdOutlineCreateNewFolder/ > }>Nueva carpeta</Item>},
    ]

    const folderActions = [
        {action: null, title: <Item icon={ <HiOutlinePencil/ > }>Cambiar nombre</Item>},
        {action: handleDeckAdd, title: <Item icon={ <CgTrashEmpty/ > }>Eliminar</Item>},
    ]


    return (
        <Container className="workspace">
            <TitleText>Carpetas</TitleText>
            <TitleUnderline />
            <CustomContainer actions={foldersActions} availableSpaces={['folderContainer', 'folderGrid']}>
                <Grid container ref={foldersRef}>
                    {decks.map((deck, index) => (
                        <Grid name="folderGrid" key={deck._id} item xs={12} sm={6} md={3} >
                            <Folder deck={deck} handleEditName={handleEditName} handleUpdateName={handleUpdateName} folderObj={decksData[index]} index={index} actions={folderActions} availableSpaces={['folderContainer', 'folderGrid']}/>
                        </Grid>
                    ))}
                    <Grid name="folderGrid" item xs={3}></Grid><Grid name="folderGrid" item xs={3}></Grid>
                    <Grid name="folderGrid" item xs={3}></Grid><Grid name="folderGrid" item xs={3}></Grid>
                </Grid>
            </CustomContainer>
            
            <TitleText>Mazos</TitleText>
            <TitleUnderline />
            <CustomContainer actions={[]} availableSpaces={['folderContainer', 'deckGrid']}>
                <Grid container>
                    
                    <Grid name="deckGrid" item xs={3}></Grid><Grid name="deckGrid" item xs={3}></Grid>
                    <Grid name="deckGrid" item xs={3}></Grid><Grid name="deckGrid" item xs={3}></Grid>
                </Grid>
            </CustomContainer>

            {/* Dialogs */}
            <CustomDialog 
                open={ openDialog } 
                handleClose={ handleCloseDialog } 
                title="Cambiar nombre" 
                currentValue="Nueva carpeta"
                handleSave={(newName) => {
                    handleUpdateName(decks.length - 1, newName);
                    handleCloseDialog();
                }} 
            />
        </Container>
        // </Container>
    )
}

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