import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { darkTextColor, primaryLightEmerald1, primaryLightEmerald2, backgroundLightBlue, inputSvgColor, primaryEmerald } from '../../../utils'
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDecks, deleteFolder } from '../../../actions/folders';
import { createTheme, Menu, MenuItem } from '@material-ui/core';
import { HiFolder } from 'react-icons/hi';
import CustomDialog from '../../CustomDialog';

const Folder = ({ deck, handleEditName, handleUpdateName, folderObj, index, availableSpaces, actions }) => {

    const [ contextMenu, setContextMenu ] = useState(null);
    const [ openDialog, setOpenDialog ] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const folderRef = useRef();

    const openFolder = (e) => {
        if(contextMenu === null)
        {
                console.log(e);
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


    const handleContextMenu = (event) => {
        // If click into a blank space (and not item)...
        // const name = event.target.getAttribute('name')
        // if (availableSpaces.includes(name) )
        // {
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
        // }
        
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    return (
        <div>

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
                            console.log(item.title.props.children)
                            if (item.title.props.children == 'Cambiar nombre')
                            {
                                handleOpenDialog();
                            }
                            else if (item.title.props.children == 'Eliminar') {  
                                // TODO: Remove all it's content
                                dispatch(deleteFolder(folderObj._id));
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
                <FolderName> { deck.name } </FolderName>
                    
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
    font-family: 'Khula', sans-serif;
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
        backgroundColor: '#e8e9fe',
        padding: '.5em',
    },
    '& .MuiList-padding': {
        padding: 0,
    }
}));


const StyledMenuItem = styled(MenuItem)(() => ({
    borderRadius: '.5em',
    color: darkTextColor,
    fontWeight: 400,
    fontSize: '.9em',
}));


export default Folder;