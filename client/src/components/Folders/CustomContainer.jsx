import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { isMobile } from '../../utils/index';
import { createTheme, Menu, MenuItem } from '@material-ui/core';
import { darkTextColor } from '../../utils'

const CustomContainer = ({ children, availableSpaces, actions }) => {
    const [contextMenu, setContextMenu] = React.useState(null);

    const handleContextMenu = (event) => {
        // If click into a blank space (and not item)...
        const name = event.target.getAttribute('name')
        if (name !== null && name !== undefined && availableSpaces.includes(name) )
        {
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
        }
        
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
            <Container name="folderContainer" onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
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
                        <StyledMenuItem key={index} onClick={item.action}>{item.title}</StyledMenuItem>
                    ))}
                </StyledMenu>
                { children }
            </Container>
        )
    }
}

const Container = styled.div`
    padding-bottom: 5em;
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
    fontWeight: 600,
    fontSize: '.9em',
}));

export default CustomContainer;