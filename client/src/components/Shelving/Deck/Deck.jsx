import React, { useState } from 'react'
import styled from 'styled-components'
import { darkTextColor, primaryLightEmerald1, primaryLightEmerald2, backgroundLightBlue, inputSvgColor, primaryEmerald, primaryRed, primaryRed2 } from '../../../utils'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteDeck } from '../../../actions/decks';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem } from '@material-ui/core';
import { MdCollectionsBookmark } from 'react-icons/md';
import CustomDialog from '../../Utils/CustomDialog';
import * as api from '../../../api/index';
import { deleteCard } from '../../../actions/cards';

const Deck = ({ deck, handleUpdateName, deckObj, index, actions }) => {

    const [ contextMenu, setContextMenu ] = useState(null);
    const [ openDialog, setOpenDialog ] = useState(false);

    const [ confirmDeleteOpen, setConfirmDeleteOpen ] = useState(false);
    const [ lastDeleteSelection, setLastDeleteSelection ] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openDeck = () => {
        if(contextMenu === null)
        {
            navigate(`/deck/${deckObj._id}`)
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

    const deleteDeckAndContent = async () => { 
        if (lastDeleteSelection !== null && lastDeleteSelection !== undefined) {
            let cards = [await api.fetchCardsById(lastDeleteSelection)];
            for(const card in cards) {
                dispatch(deleteCard(cards[card]));
            }
            dispatch(deleteDeck(lastDeleteSelection));
        } else {
            console.error('Unexpected error.')
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
        <div name='deckBox'>
            <Card name="card" onContextMenu={(e) => handleContextMenu(e)} onDoubleClick={(e) => openDeck(e)}>
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
                                handleConfirmDelete(deckObj._id);
                            }
                            else if (item.action !== null && item.action !== undefined) {
                                item.action();
                            }
                        }}>{item.title}</StyledMenuItem>
                    ))}
                </StyledMenu>
                <Icon>
                    <MdCollectionsBookmark />
                </Icon>
                <DeckName> { deck.name } </DeckName>
                    
            </Card>
            <CustomDialog 
                open={ openDialog } 
                handleClose={ handleCloseDialog } 
                title="Cambiar nombre" 
                currentValue={ deck.name }
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
                    <DeleteButton onClick={deleteDeckAndContent}>Eliminar</DeleteButton>
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

const DeckName = styled.span`
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


export default Deck;