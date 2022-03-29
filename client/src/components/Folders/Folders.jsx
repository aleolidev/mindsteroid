import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { HiOutlinePencil } from 'react-icons/hi'
import { FiChevronRight } from 'react-icons/fi'
import { CgTrashEmpty } from 'react-icons/cg'
import { darkTextColor, primaryEmerald, backgroundLightBlue, inputSvgColor, lightSvg } from '../../utils'
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import { createDeck, updateFolder, getDecks } from '../../actions/folders';
import Folder from './Folder/Folder';
import { useParams } from 'react-router-dom';
import CustomContainer from './CustomContainer';
import CustomDialog from '../CustomDialog';
import * as api from '../../api';

const Folders = () => {
    const { decks, isLoading } = useSelector((state) => state.decks);
    const [ decksData, setDecksData ] = useState([]);
    const [ decksLength, setDecksLength ] = useState(null);
    const [ decksLastLength, setDecksLastLength ] = useState(null);
    const [ openDialog, setOpenDialog ] = useState(false);
    const [ folderPath, setFolderPath] = useState([]);
    const decksImported = useRef(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const foldersRef = useRef();

    const { id } = useParams();
    const [ folderId, setFolderId ] = useState(id);
    
    if (decks !== undefined && decks !== null){
        if (decksLength === null) {
            setDecksLastLength(decks.length);
            setDecksLength(decks.length);
        }
        
        if (decks.length !== decksLength) {
            setDecksLength(decks.length);
        }
    }

    const openFolder = (openId) => {
        dispatch(getDecks(openId));
        navigate(`/folder/${openId}`)
    }

    const getFolderHierarchy = async () => {
        let currentId = id;
        let hierarchy = [];
        let obj;

        while(currentId !== null && currentId !== undefined) {
            obj = await api.getFolderById(currentId);
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
        }

        hierarchy.reverse();

        return hierarchy;
    }

    // Saves the last created deck
    const handleSubmit = async () => {
        dispatch(await createDeck({...decksData[0]}, id))
    }
    
    
    // Adds a new item to local array of decks
    const handleDeckAdd = () => {
        setDecksData([{ name: 'Nueva carpeta', parent: id}, ...decksData])
    }
    
    const handleUpdateName = (index, name) => {
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
        dispatch(getDecks(id));
    }, [dispatch]);

    // If the local array of decks changes his length...
    useEffect(() => {
        if (decks !== undefined) {
            // If new item added to decksData, insert the new item
            if (decksData[0] !== undefined && decksData[0] !== null && decksData.length > decks.length) {
                handleSubmit()
            }
        }
    }, [decksData.length])

    
    // If the decks array of the db changes his length...
    useEffect(() => {
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

    useEffect(async () => {
        dispatch(getDecks(id));
        setFolderId(id);
        setFolderPath([...await getFolderHierarchy()]);
    }, [id])
    
    // Import db changes to local whenever they change...
    useEffect(() => {
        if(decks !== undefined && decks.length > 0) {
            setDecksData(decks);
            decksImported.current = true;
        }
    }, [decks])

    if(!decks || isLoading) {
        return null;
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
            <PathFullContainer>
                {folderPath.map((folder, index) => {
                    if (index < folderPath.length - 1) {
                        return (
                            <PathContainer key={folder._id}>
                                <PathButton onClick={() => openFolder(folder._id)}> { folder.name } </PathButton>
                                <PathArrow />
                            </PathContainer>
                        );
                    }
                    return (
                        <PathContainer key={folder._id}>
                            <PathButton> { folder.name } </PathButton>
                        </PathContainer>
                    );
                })}
            </PathFullContainer>
            <TitleText>Carpetas</TitleText>
            <TitleUnderline />
            <CustomContainer actions={foldersActions} availableSpaces={['folderContainer', 'folderGrid']}>
                <Grid container ref={foldersRef}>
                    {decks.map((deck, index) => (
                        <Grid name="folderGrid" key={deck._id} item xs={12} sm={6} md={3} >
                            <Folder deck={deck} handleUpdateName={handleUpdateName} folderObj={decksData[index]} index={index} actions={folderActions}/>
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

const PathArrow = styled(FiChevronRight)(() => ({
    
    color: darkTextColor,
    fontSize: '1.3em',
    margin: '-.2em .5em 0 0',
}));

const PathButton = styled(Button)(() => ({
    borderRadius: '.5em',
    padding: '.25em .75em',
    marginRight: '.5em',
    color: darkTextColor,
    fontSize: '1.3em',
    fontWeight: 800,
    fontFamily: '\'Khula\', sans-serif',
    backgroundColor: 'transparent',
    transition: '0.2s ease-in-out',
    textTransform: 'none',
    '&:hover': {
          backgroundColor: backgroundLightBlue,
    },
}));

const PathContainer = styled.div`
    display: flex;
    align-items: center;
`;

const PathFullContainer = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 1em;
    margin-bottom: 1em;
    margin-left: -1em;
    border-bottom: 1px solid ${ backgroundLightBlue };

`;

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
    padding: 1.5em 2.5em 2.5em 2.5em;

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