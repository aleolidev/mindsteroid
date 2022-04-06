import React, { useEffect } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { IoMdTrash } from 'react-icons/io';

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

import { getCards, deleteCard } from '../../actions/cards';
import { backgroundLightBlue, primaryBlue, textColor, primaryEmerald, primaryLightEmerald1, primaryRed, primaryRed2 } from '../../utils/index';

const DeckQuestions = ({ id }) => {

    const { cards } = useSelector((state) => state.cards);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCards(id));
    }, [dispatch]);

    const handleRemoveCard = (cardId) => {
        dispatch(deleteCard(cardId));
    }

    const handleEditCard = (cardId) => {
        navigate(`/card/${ cardId }`)
    }

    return(
        <Container>
            <ButtonsContainer container>
                {/* TODO: Add blank page message */}
                {cards.map((card, index) => (
                    <Question onClick={ () => handleEditCard(card._id) } key={card._id} className='ql-snow'>
                        <Grid item container xs={1} direction='row' justifyContent='flex-end'>
                            <IndexBox className='indexBox'>{index + 1}.</IndexBox>
                        </Grid>
                        <CardBox item xs={10} className='cardBox ql-editor'>
                            { parse(card.question) }
                        </CardBox>
                        <DeleteColumn item xs={1} className='cardBox'>
                            <DeleteButton onClick={(e) => {
                                e.stopPropagation(); // Avoid the <Question> onClick call
                                handleRemoveCard(card._id);
                            }}><IoMdTrash /></DeleteButton>
                        </DeleteColumn>
                    </Question>
                ))}
            </ButtonsContainer>
        </Container>
    )
}

const Container = styled.div`

`;

const ButtonsContainer = styled(Grid)(() => ({
    marginTop: '2em',
    justifyContent: 'space-between',
}));

const DeleteColumn =  styled(Grid)(() => ({
    margin: '.5em 0',
    padding: '0em .5em',
    width: '2.4em',
    borderRadius: '0 .75em .75em 0',
    cursor: 'pointer',
    border: `2px solid ${ backgroundLightBlue }`,
    borderLeft: 0,
    textAlign: 'right',
}));

const DeleteButton = styled.div`
    display: inline-block;
    margin-top: .4em;
    margin-right: 0em;
    transition: 0.2s ease-in-out;
    padding: .5em;
    width: 2.6em;
    border-radius: .75em;
    text-align: center;
    svg {
        vertical-align: middle;
        transition: 0.2s ease-in-out;
        font-size: 1.4rem;
        color: ${ primaryRed };
    }
    &:hover {
        background-color: ${ primaryRed };
        svg {
            // background-color: ${ primaryRed2 };
            // background-color: blue;
            color: white;
        }
    }
`;

const Question = styled.div`
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    
    .indexBox {
        color: ${ textColor };
        font-weight: 600;
        border: 2px solid ${ backgroundLightBlue};
        transition: 0.3s ease-in-out;
    }

    .cardBox {    
        transition: 0.3s ease-in-out;
    }
    
    &:hover {
        .cardBox, .indexBox {
            background-color: ${ backgroundLightBlue };
        }
        .indexBox {
            color: ${ primaryBlue };
        }
    }
    
    & .ql-editor > * {
        cursor: pointer !important;
    }
`;

const IndexBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: .4em 1.1em;
    margin: .5em 1em;
    height: 3em;
    border-radius: .5em;
    // background-color: ${ backgroundLightBlue };
`;

const CardBox = styled(Grid)(() => ({
    height: 'auto !important',
    overflowY: 'auto !important',
    cursor: 'pointer',
    padding: '1em 1.2em',
    margin: '.5em 0',
    borderRadius: '.5em 0 0 .5em',
    border: '2px solid ' + backgroundLightBlue,
    borderRight: 0,
    cursor: 'pointer',
    transition: '0.2s ease-in-out',
    p: {
        margin: 0,
        padding: 0,
    },
    
}));

export default DeckQuestions;