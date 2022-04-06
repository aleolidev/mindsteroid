import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { Button, Grid, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Editor from '../TextEditor';

import { createCard, updateCard } from '../../actions/cards';
import { darkTextColor, primaryEmerald, primaryDarkEmerald, primaryRed, primaryRed2, inputSvgColor, primaryBlue, backgroundLightBlue } from '../../utils';
import { MdSettings } from 'react-icons/md';
import ConfigDialog from './ConfigDialog';
import { getCardById } from '../../api';

const EditCard = () => {

    const [ snackbarOpen, setSnackbarOpen ] = useState(false);
    const [ snackbarStatus, setSnackbarStatus ] = useState({
        severity: "success", 
        message: "Tarjeta añadida correctamente"
    });
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const questionRef = useRef();
    const answerRef = useRef();
    
    const { id: cardId } = useParams();

    const [ deckId, setDeckId] = useState();

    const handleEditCard = async () => {
        const question = questionRef.current?.getInnerHtml();
        const answer = answerRef.current?.getInnerHtml();

        let card = await getCardById(cardId);
        card = card.data;
        card.question = question;
        card.answer = answer;
        
        try {
            await dispatch(updateCard({...card}))
            returnToDeck();
        } catch (error) {
            setSnackbarStatus({
                severity: "error", 
                message: `ERROR: ${ error.message }`
            })
            handleOpenSnackbar();
        }
    }

    const returnToDeck = () => {
        navigate(`/deck/${ deckId }`);
    }


    const handleOpenSnackbar = () => {
        setSnackbarOpen(true);
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setSnackbarOpen(false);
    };

    useEffect(async () => {
        const card = await getCardById(cardId);
        setDeckId(card.data.parent);

        questionRef.current?.setInnerHtml(card.data.question);
        answerRef.current?.setInnerHtml(card.data.answer);
    }, [dispatch])

    return (
        <Container>
            <TitleContainer>
                <TitleText>Crear nueva tarjeta</TitleText>
            </TitleContainer>
            <TitleUnderline />
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Question>
                        <Subtitle>Pregunta</Subtitle>
                        {/* TODO: Validate is !== null && "" && undefined */}
                        <Editor ref={questionRef} placeholder={'Write something...'} />
                    </Question>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Answer>
                        <Subtitle>Respuesta</Subtitle>
                        {/* TODO: Validate is !== null && "" && undefined */}
                        <Editor ref={answerRef} placeholder={'Write something...'} />
                    </Answer>
                </Grid>
            </Grid>
            <ButtonsContainer>
                <SaveButton onClick={ handleEditCard }>Guardar</SaveButton>
                <CancelButton onClick={ returnToDeck }>Cancelar</CancelButton>
            </ButtonsContainer>

            <CustomSnackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarStatus.severity} sx={{ width: '100%' }}>
                    {snackbarStatus.message}
                </Alert>
            </CustomSnackbar>
        </Container>
    )
}

const Container = styled.div`
    padding: 2.5em;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
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

const SaveButton = styled(Button)(() => ({
    display: 'flex',
    textTransform: 'none',
    fontFamily: '\'Khula\', sans-serif',
    fontSize: '1em',
    alignItems: 'center',
    justifyContent: 'center',
    height: '2.5em',
    backgroundColor: primaryEmerald,
    padding: '0 2em',
    marginRight: '1em',
    borderRadius: '.7em',
    fontWeight: 600,
    color: 'white',
    cursor: 'pointer',
    transition: '0.2s ease-in-out',
    '&:hover': {
        backgroundColor: primaryDarkEmerald,
    }
}));

const CancelButton = styled(Button)(() => ({
    display: 'flex',
    textTransform: 'none',
    fontFamily: '\'Khula\', sans-serif',
    fontSize: '1em',
    alignItems: 'center',
    justifyContent: 'center',
    height: '2.5em',
    backgroundColor: primaryRed,
    padding: '0 2em',
    marginRight: '1em',
    borderRadius: '.7em',
    fontWeight: 600,
    color: 'white',
    cursor: 'pointer',
    transition: '0.2s ease-in-out',
    '&:hover': {
        backgroundColor: primaryRed2,
    }
}));

const CustomSnackbar = styled(Snackbar)(() => ({
    '& .MuiPaper-root': {
        fontWeight: 600,
        color: 'white',
    },
    '& .MuiAlert-standardSuccess': {
        backgroundColor: primaryEmerald,
    },
    '& .MuiAlert-standardError': {
        backgroundColor: primaryRed2,
    },
    '& .MuiAlert-icon': {
        color: 'white',
    },
}));

export default EditCard
