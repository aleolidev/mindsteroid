import React, { useRef } from 'react'
import styled from 'styled-components'
import { darkTextColor, backgroundLightBlue, inputSvgColor } from '../../../utils'
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDecks } from '../../../actions/decks';
import { createTheme, Menu, MenuItem } from '@material-ui/core';
import { HiFolder } from 'react-icons/hi';
import CustomDialog from '../../CustomDialog';

const Folder = ({ deck, handleEditName, handleUpdateName, folderObj, index, availableSpaces, actions }) => {

    const [ contextMenu, setContextMenu ] = React.useState(null);
    const [ openDialog, setOpenDialog ] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const folderRef = useRef();

    const openFolder = (e) => {
        if (e.target.getAttribute("name") === "card" && folderObj !== undefined && folderObj !== null) {
            // console.log("CLICK")
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
        <Card name="card" onContextMenu={(e) => handleContextMenu(e)} onClick={(e) => openFolder(e)}>
            <StyledMenu
                // PaperProps={customClass}
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
                        } else if (item.action !== null && item.action !== undefined) {
                            item.action();
                        }
                    }}>{item.title}</StyledMenuItem>
                ))}
            </StyledMenu>
            <Icon>
                <HiFolder />
            </Icon>
            <FolderName> { deck.name } </FolderName>
            {/* <EditText ref={ folderRef }
                defaultValue='Mazo nuevo' 
                readonly={true}
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
                        border: 20,
                        borderRadius: '.5em',
                        cursor: 'pointer',
                    }
                }
            /> */}
            <CustomDialog open={ openDialog } handleClose={ handleCloseDialog } title="Cambiar nombre" currentValue={ deck.name }/>
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
        padding-left: .5em;
        padding-right: .5em;
        padding-bottom: 0;
        padding-top: 0;
        border-radius: 1em;
        background-color: #b6b9dc;
    };
    div {
        &:hover {
            cursor: pointer!important;
            background-color: transparent;
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