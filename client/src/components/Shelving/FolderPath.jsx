import React from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MdCollectionsBookmark } from 'react-icons/md';

import { getFolders } from '../../actions/folders';
import { getDecks } from '../../actions/decks';
import { getCards } from '../../actions/cards';
import { FiChevronRight } from 'react-icons/fi'
import Button from '@material-ui/core/Button';
import { darkTextColor, backgroundLightBlue, inputSvgColor, primaryEmerald, primaryDarkBlue, primaryBlue } from '../../utils'
import { Grid } from '@material-ui/core';

const FolderPath = ({ folderPath, lastIsDeck, rightPanel }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openFolder = (openId) => {
        dispatch(getFolders(openId));
        dispatch(getDecks(openId));
        dispatch(getCards(openId));
        navigate(`/folder/${openId}`)
    }

    return (
        <PathFullContainer container>
            <Grid item xs={8} style={{display: 'flex'}}>
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
                            <PathButton> { lastIsDeck && (<DeckIcon />)} { folder.name } </PathButton>
                            
                        </PathContainer>
                    );
                })}
            </Grid>
            <Grid container item justifyContent='flex-end' xs={4}>
                { rightPanel }
            </Grid>
        </PathFullContainer>
    )
};

const DeckIcon = styled(MdCollectionsBookmark)(() => ({
    // height: '2.5rem',
    // width: '3rem',
    margin: '-.25em .5em 0 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: inputSvgColor,
    fontSize: '1.4rem',
}));

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
    svg: {    
        transition: '0.2s ease-in-out',
    },
    '&:hover': {
          backgroundColor: backgroundLightBlue,
          svg: {
            color: primaryBlue,
          }
    },
}));

const PathContainer = styled.div`
    display: flex;
    align-items: center;
`;

const PathFullContainer = styled(Grid)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '1em',
    marginBottom: '1em',
    marginLeft: '-1em',
    borderBottom: `1px solid ${ backgroundLightBlue }`,
}));

export default FolderPath;