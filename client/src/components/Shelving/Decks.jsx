import React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

import { darkTextColor, primaryEmerald } from '../../utils'
import CustomContainer from './CustomContainer';

const Decks = ({ id }) => {
    
    return (
        <div>
            <TitleText>Mazos</TitleText>
            <TitleUnderline />
            <CustomContainer actions={[]} availableSpaces={['folderContainer', 'folderGrid']}>
                <Grid container>
                    
                    <Grid name="folderGrid" item xs={3}></Grid><Grid name="folderGrid" item xs={3}></Grid>
                    <Grid name="folderGrid" item xs={3}></Grid><Grid name="folderGrid" item xs={3}></Grid>
                </Grid>
            </CustomContainer>
        </div>
    )
}


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

export default Decks;