import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { darkTextColor, primaryLightEmerald1, primaryLightEmerald2, backgroundLightBlue, inputSvgColor, primaryEmerald, primaryRed, primaryRed2 } from '../../../utils'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getFolders, deleteFolder } from '../../../actions/folders';
import { deleteDeck, getDecks} from '../../../actions/decks';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem } from '@material-ui/core';
import { HiFolder } from 'react-icons/hi';
import CustomDialog from '../../Utils/CustomDialog';
import * as api from '../../../api';
import { deleteCard } from '../../../actions/cards';

const Folder = ({ folder, handleUpdateName, folderObj, index, actions }) => {

    const [ contextMenu, setContextMenu ] = useState(null);
    const [ openDialog, setOpenDialog ] = useState(false);

    const [ confirmDeleteOpen, setConfirmDeleteOpen ] = useState(false);
    const [ lastDeleteSelection, setLastDeleteSelection ] = useState(null);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openFolder = () => {
        if(contextMenu === null)
        {
            dispatch(getFolders(folderObj._id));
            dispatch(getDecks(folderObj._id));
            navigate(`/folder/${folderObj._id}`)
        }
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmDelete = (id) => {
        setLastDeleteSelection(id);
        setConfirmDeleteOpen(true);
    };
    
    const handleCloseDelete = () => {
        setConfirmDeleteOpen(false);
    };

    const getFolderDecks = async (id) => {
        let decks = [];
        const { data } = await api.fetchDecksById(id);
        
        if (data !== null && data !== undefined) {
            for (let deck in data) {
                decks = [data[deck]._id, ...decks];
            }
        }

        return decks
    }

    const getDeckCards = async (id) => {
        let cards = [];
        const { data } = await api.fetchCardsById(id);
        
        if (data !== null && data !== undefined) {
            for (let card in data) {
                cards = [data[card]._id, ...cards];
            }
        }

        return cards
    }

    const recursiveFolders = async (id) => {
        let folders = [];
        const { data } = await api.fetchFoldersById(id);
        
        if (data !== null && data !== undefined) {
            for (let folder in data) {
                folders.unshift(data[folder]._id);
                folders = [...await recursiveFolders(data[folder]._id), ...folders];
            }
        }

        return folders
    }

    const deleteFolderAndContent = async () => {  
        if (lastDeleteSelection !== null && lastDeleteSelection !== undefined) {
            let folders = [lastDeleteSelection];
            folders = [...await recursiveFolders(lastDeleteSelection), ...folders];
            for(const folder in folders) {
                const decks = await getFolderDecks(folders[folder]);
                for (const deck in decks) {
                    const cards = await getDeckCards(decks[deck]);
                    for(const card in cards) {
                        dispatch(deleteCard(cards[card]));
                    }
                    dispatch(deleteDeck(decks[deck]));
                }
                dispatch(deleteFolder(folders[folder]));
            }
        }
        handleCloseDelete();
    };


    const handleContextMenu = (event) => {
        // If click into a blank space (and not item)...
        event.preventDefault();
        setContextMenu(
        contextMenu === null
            ? {
                mouseX: event.clientX - 2,
                mouseY: event.clientY - 4,
            }
            : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
            // Other native context menus might behave different.
            // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
            null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    return (
        <div name='folderBox'>
            <Card name="card" onContextMenu={(e) => handleContextMenu(e)} onDoubleClick={(e) => openFolder(e)}>
                <StyledMenu
                    sx={{
                        width: 300,
                        color: 'success.main',
                        '& .MuiPaper-root': {
                                backgroundColor: 'red',
                        },
                    }}
                    open={contextMenu !== null}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                    }
                    >
                    {actions.map((item, index) => (
                        <StyledMenuItem key={index} onClick={() => {
                            handleClose();
                            if (item.title.props.children == 'Cambiar nombre')
                            {
                                handleOpenDialog();
                            }
                            else if (item.title.props.children == 'Eliminar') {  
                                handleConfirmDelete(folderObj._id);
                            }
                            else if (item.action !== null && item.action !== undefined) {
                                item.action();
                            }
                        }}>{item.title}</StyledMenuItem>
                    ))}
                </StyledMenu>
                <Icon>
                    <HiFolder />
                </Icon>
                <FolderName> { folder.name } </FolderName>
                    
            </Card>
            <CustomDialog 
                open={ openDialog } 
                handleClose={ handleCloseDialog } 
                title="Cambiar nombre" 
                currentValue={ folder.name }
                handleSave={(newName) => {
                    handleUpdateName(index, newName);
                    handleCloseDialog();
                }} 
            />
            <Dialog
                open={confirmDeleteOpen}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    ¿Estás seguro de que deseas eliminar este elemento?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Una vez confirmada esta acción se borrará el elemento seleccionado y todo lo que contenga en su interior. ¿Quieres continuar?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <CancelButton onClick={handleCloseDelete} autoFocus>Cancelar</CancelButton>
                    <DeleteButton onClick={deleteFolderAndContent}>Eliminar</DeleteButton>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const Card = styled.button`
    width: 85%;
    display: flex;
    align-items: center;
    padding: .5em 1em;
    margin: 1em 2em 1em 0;
    background-color: ${ backgroundLightBlue };
    color: ${darkTextColor};
    font-weight: 600;
    font-size: 1em;
    font-family: 'Khula', 'Source Sans Pro', sans-serif;
    border-radius: 1em;
    cursor: pointer;
    border: 0;
    border: 2px solid transparent;
    transition: 0.2s ease-in-out;
    div {
        &:hover {
            cursor: pointer!important;
            background-color: transparent;
        }
    }
    &:focus {
        background-color: ${ primaryLightEmerald1 };
        color: ${ primaryEmerald };
        border: 2px solid ${ primaryLightEmerald2 };
        svg {
            color: ${ primaryLightEmerald2 };
        }
    }
`;

const Icon = styled.span`
    height: 2.5rem;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        color: ${ inputSvgColor };
        font-size: 1.4rem;
    }
`;

const FolderName = styled.span`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: .25 .5em;
    margin-top: .1em;
    color: { darkTextColor };
    font-weight: 600;
    outline: none;
    border: 20;
    border-radius: .5em;
    cursor: pointer;
`;


const StyledMenu = styled(Menu)(() => ({
    '& .MuiPaper-root': {
        borderRadius: '.5em',
        backgroundColor: backgroundLightBlue,
        padding: '.5em 0',
    },
    '& .MuiList-padding': {
        padding: 0,
    }
}));

const CancelButton = styled(Button)`
    margin: 0 .5em .5em 0;
    transition: 0.2s ease-in-out;
    padding: .5em 1em;
    border-radius: .75em;
    text-align: center;
    text-transform: none;
    font-family: 'Khula', 'Source Sans Pro', sans-serif;
    font-weight: 600;
    font-size: 1em;
    color: ${ darkTextColor };
    &:hover {
        background-color: ${ backgroundLightBlue };
        svg {
            color: white;
        }
    }
`;

const DeleteButton = styled(Button)`
    margin: 0 .5em .5em 0;
    transition: 0.2s ease-in-out;
    padding: .5em 1em;
    border-radius: .75em;
    text-align: center;
    text-transform: none;
    font-family: 'Khula', 'Source Sans Pro', sans-serif;
    font-weight: 600;
    font-size: 1em;
    background-color: ${ primaryRed };
    color: white;
    &:hover {
        background-color: ${ primaryRed2 };
        svg {
            color: white;
        }
    }
`;


const StyledMenuItem = styled(MenuItem)(() => ({
    // borderRadius: '.5em',
    color: darkTextColor,
    fontWeight: 400,
    fontSize: '.9em',
}));


export default Folder;