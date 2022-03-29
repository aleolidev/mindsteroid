import React from 'react'
import styled from 'styled-components'
import { darkTextColor, primaryEmerald, primaryRed } from '../utils'
import { Grid } from '@material-ui/core';
import Editor from './TextEditor';

function CardInput() {
    return (
        <Container>
            <TitleText>Crear nueva tarjeta</TitleText>
            <TitleUnderline />
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Question>
                        <Subtitle>Pregunta</Subtitle>
                        <Editor placeholder={'Write something...'} />
                    </Question>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Answer>
                        <Subtitle>Respuesta</Subtitle>
                        <Editor placeholder={'Write something...'} />
                    </Answer>
                </Grid>
            </Grid>
            <ButtonsContainer>
                <SaveButton>Guardar</SaveButton>
                <CancelButton>Cancelar</CancelButton>
            </ButtonsContainer>
        </Container>
    )
}

const Container = styled.div`
    padding: 2.5em;
`;

const TitleText = styled.h1`
    color: ${darkTextColor};
    font-weight: 600;
`;

const Subtitle = styled.h2`
    color: ${darkTextColor};
    font-weight: 600;
    margin-bottom: .35em;
`;

const TitleUnderline = styled.div`
    width: 0;
    padding: 0 0 .25em 2.5em;
    margin-top: -1em;
    margin-bottom: 1em;
    border-radius: 2em;
    background-color: ${primaryEmerald};
`;

const Question = styled.div`
	margin: 2em 0 0 0;
    @media (min-width: 960px) {
        margin: 1em 2em 0 0;
    }
`;

const Answer = styled.div`
    margin: 2em 0 0 0;
    @media (min-width: 960px) {
        margin: 1em 0 0 2em;
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    margin-top: 2em;
`;

const SaveButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5em;
    background-color: ${ primaryEmerald };
    padding: 0 2em;
    margin-right: 1em;
    border-radius: .7em;
    font-weight: 600;
    color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    &:hover {
        background-color: #00a84b;
    }
    
`;

const CancelButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5em;
    background-color: ${ primaryRed };
    padding: 0 2em;
    margin-right: 1em;
    border-radius: .7em;
    font-weight: 600;
    color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    &:hover {
        background-color: #EE342B;
    }
`;

export default CardInput
