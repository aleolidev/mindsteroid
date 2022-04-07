import React from 'react'
import styled from 'styled-components'
import { backgroundLightGray, darkTextColor, backgroundLightBlue, primaryEmerald } from '../../utils'
import { primaryDarkEmerald, primaryYellow, primaryDarkYellow, primaryRed, primaryRed2 } from '../../utils'
import { Grid } from '@material-ui/core';

function Test() {
    return (
        <Grid container>
            <Grid item xs={1} md={2} />
            <Grid item xs={10} md={8}>
                <Container>
                    <Title>
                        <TitleText>Tema 1</TitleText>
                        <TitleUnderline />
                    </Title>
                    <CurrentMark>
                        <p>7/9</p>
                    </CurrentMark>
                    <Flashcard>
                    <p>Esto es un texto <strong class="ql-size-huge">de prueba</strong> <a href="https://whackahack.com/foro/" rel="noopener noreferrer" target="_blank"><strong>(Random link)</strong></a></p><ol><li>Elemento 1</li><li>Elemento 2</li></ol>
                    </Flashcard>
                    <ButtonsContainer>
                        <ShowAnswer>Respuesta</ShowAnswer>
                        <Hard>Difícil</Hard>
                        <Review>Repasar</Review>
                        <Easy>Fácil</Easy>
                    </ButtonsContainer>
                </Container>
            </Grid>
            <Grid item xs={1} md={2} />
        </Grid>
    )
}

const Container = styled.div`
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;  
    width: 100%;
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;  
`;

const TitleText = styled.h1`
    color: ${darkTextColor};
    font-weight: 600;
`;

const TitleUnderline = styled.div`
    width: 40%;
    padding-bottom: .25em;
    margin-top: -1em;
    margin-bottom: .5em;
    border-radius: 2em;
    background-color: ${primaryEmerald};
`;

const CurrentMark = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1em;
    background-color: ${ primaryYellow };
    padding: 0 1.6em;
    border-radius: .7em;
    font-weight: 600;
    font-size: .9em;
    color: white;
    p {
        margin-top: .25em;
        margin-bottom: 0
    }
`;

const Flashcard = styled.div`
    margin: 2em;
    padding: 1.5em;
    width: 100%;
    height: 18em;
    background-color: ${ backgroundLightBlue };
    border-radius: 1.5em;
    color: ${ darkTextColor };
`;

const ButtonsContainer = styled.div`
    display: flex;
`;

const ShowAnswer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5em;
    background-color: ${ backgroundLightBlue };
    padding: 0 2em;
    margin-right: 1em;
    border-radius: .7em;
    font-weight: 600;
    color: ${ darkTextColor };
    cursor: pointer;
    transition: 0.2s ease-in-out;
    &:hover {
        background-color: ${ backgroundLightGray };
    }
`;

const Hard = styled.div`
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
        background-color: ${ primaryRed2 };
    }
`;

const Review = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5em;
    background-color: ${ primaryYellow };
    padding: 0 2em;
    margin-right: 1em;
    border-radius: .7em;
    font-weight: 600;
    color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    &:hover {
        background-color: ${ primaryDarkYellow };
    }
`;

const Easy = styled.div`
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
        background-color: ${ primaryDarkEmerald };
    }
`;


export default Test