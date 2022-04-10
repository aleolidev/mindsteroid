import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';

import { backgroundLightGray, darkTextColor, backgroundLightBlue, primaryEmerald } from '../../utils'
import { primaryDarkEmerald, primaryYellow, primaryDarkYellow, primaryRed, primaryRed2 } from '../../utils'
import { setOrUpdateCardStatus } from '../../actions/auth';

function Review() {

    const dispatch = useDispatch();

    const handleHard = async () => {
        const progress = { 
            '_id': '62515ab9c9c1e5a4c846a98a',
            'cardset': [{
                '_id': '62515abfc9c1e5a4c846a99a',
                'status': 'Review',
            }]
        };
        await dispatch(setOrUpdateCardStatus(progress));
    }

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
                    <p>Esto es un texto <strong className="ql-size-huge">de prueba</strong> <a href="https://whackahack.com/foro/" rel="noopener noreferrer" target="_blank"><strong>(Random link)</strong></a></p><ol><li>Elemento 1</li><li>Elemento 2</li></ol>
                    </Flashcard>
                    <ButtonsContainer>
                        <ShowAnswer>Respuesta</ShowAnswer>
                        <HardButton onClick={ handleHard }>Difícil</HardButton>
                        <ReviewButton>Repasar</ReviewButton>
                        <EasyButton>Fácil</EasyButton>
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
    &&& {
        margin: 2em;
        padding: 1.5em;
        width: 100%;
        height: 18em;
        color: ${ darkTextColor };
        border-radius: 1em;
        border: 2px solid ${ backgroundLightBlue };
        transition: 0.2s ease-in-out;
        &:hover {
            border: 2px solid transparent;
            box-shadow: 
                0px 3px 5px -5px rgb(0 0 0 / 20%), 
                0px 5px 10px 1px rgb(0 0 0 / 14%), 
                0px 2px 14px 2px rgb(0 0 0 / 12%)
        }
    }
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

const HardButton = styled.div`
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

const ReviewButton = styled.div`
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

const EasyButton = styled.div`
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


export default Review