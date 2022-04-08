import React, { forwardRef, Fragment, useImperativeHandle, useState } from 'react'
import { Box, Menu } from '@material-ui/core';
import styled from 'styled-components';
import { lightHoverEffect } from '../../utils';

const CustomMenu = forwardRef(({ id, children }, ref) => {
    

    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }
    
    useImperativeHandle(ref, () => ({
        handleClick
    }));

    return (
        <Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <StyledMenu
                    anchorEl={ anchorEl }
                    id={ id }
                    open={ open }
                    onClose={ handleClose }
                    onClick={ handleClose }
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    getContentAnchorEl={ null }>
                        { children }
                    </StyledMenu>
            </Box>
        </Fragment>
    )
});

const StyledMenu = styled(Menu)`
    & .MuiPaper-root {
        border-radius: 1em;
        box-shadow: 
            0px 3px 5px -5px rgb(0 0 0 / 20%), 
            0px 5px 10px 1px rgb(0 0 0 / 14%), 
            0px 2px 14px 2px rgb(0 0 0 / 12%)
    }
`;

export default CustomMenu;