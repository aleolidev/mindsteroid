import React from 'react'
import styled from 'styled-components'
import { HiOutlinePlus } from 'react-icons/hi'
import { darkTextColor, primaryEmerald, backgroundLightBlue, inputSvgColor, selectTextColor } from '../utils'
import { Grid } from '@material-ui/core';

function Decks() {
    return (
        <Container>
            <TitleText>Mazos</TitleText>
            <TitleUnderline />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={2}>
                    <NewDeck>
                        <NewDeckIcon>
                            <HiOutlinePlus />
                        </NewDeckIcon>
                    </NewDeck>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Deck>
                        <DeckTitle>Planificación y Pruebas de Sistemas Software</DeckTitle>
                    </Deck>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Deck>
                        <DeckTitle>Sistemas Distribuidos</DeckTitle>
                    </Deck>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Deck>
                        <DeckTitle>Redes de Computadores</DeckTitle>
                    </Deck>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Deck>
                        <DeckTitle>Diseño de Sistemas Software</DeckTitle>
                    </Deck>
                </Grid>
            </Grid>
        </Container>
    )
}

const Container = styled.div`
    padding: 2.5em;
`;

const NewDeck = styled.div`
    width: 75%;
    height: 7.5em;
    padding: 1em;
    margin: 1em 2em 1em 0;
    border: dashed 3px  ${inputSvgColor};
    border-radius: 1em;
    transition: 0.2s ease-in-out;
    vertical-align: middle;
    cursor: pointer;
    &:hover {   
        border: dashed 3px  ${selectTextColor}; 
        svg {
            color: ${ selectTextColor };
        }
    }
`;

const NewDeckIcon = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg {
        margin: 0;
        padding: 0;
        color: ${ inputSvgColor };
        font-size: 2rem;    
        transition: 0.2s ease-in-out;
    }
    &:hover {    
        svg {
            color: ${ selectTextColor };
        }
    }
`;

const Deck = styled.div`
    width: 75%;
    height: 7.5em;
    padding: 1em;
    margin: 1em 2em 1em 0;
    background-color: ${ backgroundLightBlue };
    border-radius: 1em;
    cursor: pointer;
`;

const DeckTitle = styled.h4`
    color: ${darkTextColor};
    font-weight: 600;
`;

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