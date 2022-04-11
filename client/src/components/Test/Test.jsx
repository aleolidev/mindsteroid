import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import parse from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Button, Grid } from '@material-ui/core';
import ReactCardFlip from 'react-card-flip';

import { backgroundLightGray, darkTextColor, backgroundLightBlue, primaryEmerald } from '../../utils'
import { primaryDarkEmerald, primaryYellow, primaryDarkYellow, primaryRed, primaryRed2 } from '../../utils'
import { getReviewCardsById, getTestCardsById, setOrUpdateCardStatus } from '../../actions/auth';
import { getDeckById } from '../../api';

function Test({ isReview }) {

    const [ isQuestion, setIsQuestion ] = useState(true);
    const [ currentCard, setCurrentCard ] = useState(null);
    const [ currentCardIndex, setCurrentCardIndex ] = useState();
    const [ initialLength, setInitialLength ] = useState(0);
    const [ deckData, setDeckData ] = useState(null);
    
    const { testStudyingData, reviewStudyingData } = useSelector((state) => state.auth);
    const [ studyingData, setStudyingData ] = useState(isReview ? reviewStudyingData : testStudyingData);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id: deckId } = useParams();

    const handleDifficult = async (value) => {
        console.log('UPDATING:', currentCard)
        const progress = { 
                '_id': deckId,
                'cardset': [{
                    '_id': currentCard,
                    'status': value,
                }]
            };
        await dispatch(setOrUpdateCardStatus(progress));
        
        nextCard()
        setIsQuestion(current => !current)
    }

    const changeCardType = () => {
        setIsQuestion(current => !current)
    }

    const nextCard = () => {
        if (currentCardIndex >= (initialLength - 1)) {
            goDeck()
        } else {
            setCurrentCardIndex(current => current + 1)
        }
    }

    const goDeck = () => {
        navigate(`/deck/${ deckId }`)
    }

    useEffect(async () => {
        if (deckData === null || deckData === undefined) {
            const { data } = await getDeckById(deckId);
            setDeckData(data)
        }
    })

    useEffect(async () => {   
        if (isReview) {
            await dispatch(getReviewCardsById(deckId))
        } else {
            await dispatch(getTestCardsById(deckId))
        }
    }, [dispatch]);

    useEffect(() => {
        if ((currentCard === null || currentCard === undefined) && 
        (studyingData !== null && studyingData !== undefined && Object.keys(studyingData).length > 0)) {
            
            setInitialLength(Object.keys(studyingData).length)
            setCurrentCardIndex(0);
            console.log(`setting card to index [${currentCardIndex}]: ${studyingData[currentCardIndex]?._id}`);
        }
    }, [studyingData])

    useEffect(() => {
        setCurrentCard(studyingData[currentCardIndex]?._id);
    }, [currentCardIndex])

    if (studyingData === null || studyingData === undefined || studyingData.length == 0 || 
        deckData === null || deckData === undefined ||
        currentCardIndex === null || currentCardIndex === undefined) {
        return (<></>)
    }

    return (
        <Grid container>
            <Grid item xs={1} md={2} />
            <Grid item xs={10} md={8}>
                <Container>
                    <Title>
                        <TitleText onClick={ goDeck }><span>{ deckData?.name }</span></TitleText>
                    </Title>
                    <CurrentMark>
                        <p>{ currentCardIndex + 1 }/{ initialLength }</p>
                    </CurrentMark>
                    <ReactCardFlip
                      isFlipped={!isQuestion}
                      containerClassName="custom-cardflip"
                      flipSpeedBackToFront={0.4}
                      flipSpeedFrontToBack={0.4}>
                        <Flashcard className='ql-snow'>
                            <QuillContainer className='ql-editor'>
                                { parse(studyingData[currentCardIndex].question) }
                            </QuillContainer>
                        </Flashcard>
                        <Flashcard className='ql-snow'>
                            <QuillContainer className='ql-editor'>
                                { parse(studyingData[currentCardIndex].answer) }
                            </QuillContainer>
                        </Flashcard>
                    </ReactCardFlip>
                    { isQuestion ? 
                        <ButtonsContainer>
                            <ShowAnswer onClick={ changeCardType }>Respuesta</ShowAnswer>
                        </ButtonsContainer>
                        :
                        <ButtonsContainer>
                            <HardButton onClick={ () => handleDifficult('Hard') }>Difícil</HardButton>
                            <ReviewButton onClick={ () => handleDifficult('Review') }>Repasar</ReviewButton>
                            <EasyButton onClick={ () => handleDifficult('Easy') }>Fácil</EasyButton>
                        </ButtonsContainer>
                    }
                </Container>
            </Grid>
            <Grid item xs={1} md={2} />
        </Grid>
    )
}

const Container = styled.div`
    &&& {
        margin-top: 2em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;  
        width: 100%;
    }
`;

const Title = styled.div`
    &&& {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: .5em;  
    }
`;

const TitleText = styled(Button)`
    &&& {
        color: ${darkTextColor};
        font-weight: 600;
        font-size: 2em;
        border-radius: .5em;
        padding: .1em .75em;
        font-family: 'Khula', 'Source Sans Pro', sans-serif;
        background-color: transparent;
        transition: 0.2s ease-in-out;
        text-transform: none;
        span {
            margin-top: .1em;
        }
        &:hover {
            background-color: ${ backgroundLightBlue };
        }
    }
`;

const CurrentMark = styled.div`
    &&& {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1em;
        background-color: ${ backgroundLightBlue };
        padding: .2em 1.6em;
        border-radius: .7em;
        font-weight: 600;
        font-size: .9em;
        color: ${ darkTextColor };
        p {
            margin-top: .25em;
            margin-bottom: 0
        }
    }
`;

const Flashcard = styled.div`
    &&& {
        margin: 2em 0;
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

const QuillContainer = styled.div`
    &&& {
        margin: 1.5em;
        height: auto !important;
        overflow-y: auto !important;
        p {
            margin: 0;
            padding: 0;
        };
    }
`

const ButtonsContainer = styled.div`
    &&& {
        display: flex;
        margin-bottom: 2em;
    }
`;

const ShowAnswer = styled(Button)`
    &&& {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2.5em;
        background-color: ${ backgroundLightBlue };
        padding: 0 2em;
        margin: 0 .5em;
        border-radius: .7em;
        font-weight: 600;
        text-transform: none;
        font-family: 'Khula', 'Source Sans Pro', sans-serif;
        font-size: 1em;
        color: ${ darkTextColor };
        cursor: pointer;
        transition: 0.2s ease-in-out;
        &:hover {
            background-color: ${ backgroundLightGray };
        }
    }
`;

const HardButton = styled(Button)`
    &&& {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2.5em;
        background-color: ${ primaryRed };
        padding: 0 2em;
        margin: 0 .5em;
        border-radius: .7em;
        font-weight: 600;
        text-transform: none;
        font-family: 'Khula', 'Source Sans Pro', sans-serif;
        font-size: 1em;
        color: white;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        &:hover {
            background-color: ${ primaryRed2 };
        }
    }
`;

const ReviewButton = styled(Button)`
    &&& {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2.5em;
        background-color: ${ primaryYellow };
        padding: 0 2em;
        margin: 0 .5em;
        border-radius: .7em;
        font-weight: 600;
        text-transform: none;
        font-family: 'Khula', 'Source Sans Pro', sans-serif;
        font-size: 1em;
        color: white;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        &:hover {
            background-color: ${ primaryDarkYellow };
        }
    }
`;

const EasyButton = styled(Button)`
    &&& {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2.5em;
        background-color: ${ primaryEmerald };
        padding: 0 2em;
        margin: 0 .5em;
        border-radius: .7em;
        font-weight: 600;
        text-transform: none;
        font-family: 'Khula', 'Source Sans Pro', sans-serif;
        font-size: 1em;
        color: white;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        &:hover {
            background-color: ${ primaryDarkEmerald };
        }
    }
`;


export default Test