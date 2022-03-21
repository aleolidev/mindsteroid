import React from 'react'
import styled from 'styled-components'
import { isMobile } from '../../utils/index';
import { Menu, MenuItem } from '@material-ui/core';


const NewFolderContainer = ({ children }) => {
    const [contextMenu, setContextMenu] = React.useState(null);

    const handleContextMenu = (event) => {
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

    if (isMobile()) {
        return (
            <div> { children }</div>
        ); 
    } else {
        return (
            <Container onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
                { children }
                <Menu
                    open={contextMenu !== null}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                    }
                >
                    <MenuItem onClick={handleClose}>Copy</MenuItem>
                    <MenuItem onClick={handleClose}>Print</MenuItem>
                    <MenuItem onClick={handleClose}>Highlight</MenuItem>
                    <MenuItem onClick={handleClose}>Email</MenuItem>
                </Menu>
            </Container>
        )
    }
}

const Container = styled.div`
    padding-bottom: 5em;
`;

export default NewFolderContainer;