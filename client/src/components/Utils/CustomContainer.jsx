import React from 'react'
import styled from 'styled-components'
import { isMobile } from '../../utils/index';
import { Menu, MenuItem } from '@material-ui/core';
import { darkTextColor, backgroundLightBlue } from '../../utils'

const CustomContainer = ({ children, availableSpaces, actions, fullHeight }) => {
    const [contextMenu, setContextMenu] = React.useState(null);

    const handleContextMenu = (event) => {
        // If click into a blank space (and not item)...
        event.preventDefault();
        const name = event.target.getAttribute('name')
        if (name !== null && name !== undefined && availableSpaces.includes(name) )
        {
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
            <Container onContextMenu={handleContextMenu} style={{ 
                cursor: 'context-menu',
                height: fullHeight ? '100%' : 'auto',}}>
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
                            item.action();
                        }}>{item.title}</StyledMenuItem>
                    ))}
                </StyledMenu>
                { children }
            </Container>
        )
    }
}

const Container = styled.div`}
    // padding-bottom: 5em;
`;

const StyledMenu = styled(Menu)(() => ({
    '& .MuiPaper-root': {
        // borderRadius: '.5em',
        backgroundColor: backgroundLightBlue,
        padding: '.5em 0',
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

export default CustomContainer;