import React from 'react';
import styled from 'styled-components';
import { Box, Grid } from '@material-ui/core';
import { useNavigate } from 'react-router';

import { backgroundLightBlue, darkTextColor, primaryBlue, primaryEmerald, primaryLightEmerald1, primaryLightEmerald2, textColor } from '../../utils/index';

const DeckQuestions = ({ id }) => {

    
    const navigate = useNavigate();

    const handleNewCard = () => {
        navigate(`/cardinput`);
    }

    return(
        <Container>
            {/* 
            1. Test
            2. Review
            3. Add new question

            List of questions (CRUD)
            */}
            <ButtonsContainer container>
                <Grid item xs={1}/><NewCardButton item xs={11} onClick={ handleNewCard }>Tarjeta nueva...</NewCardButton>
                {/* TODO: Map items */}

                    <Question>
                        <Grid item container xs={1} direction='row' justifyContent='flex-end'>
                            <IndexBox className='indexBox'>1.</IndexBox>
                        </Grid>
                        <CardBox item xs={11} className='cardBox'>¿Cuál es la característica principal de la programación orientada a objetos? (POO)<br/><br/>Breakline</CardBox>
                    </Question>
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
`;

const IndexBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: .4em 1.6em;
    margin: .5em 1em;
    height: 3em;
    border-radius: .5em;
    // background-color: ${ backgroundLightBlue };
`;

const CardBox = styled(Grid)(() => ({
    display: 'flex',
    alignItems: 'center',
    // height: '3em',
    color: darkTextColor,
    padding: '1em 1.2em',
    margin: '.5em 0',
    borderRadius: '.5em',
    // fontWeight: 600,
    border: '2px solid ' + backgroundLightBlue,
    // borderLeft: 0,
    cursor: 'pointer',
    transition: '0.2s ease-in-out',
    // '&:hover': {
    //     backgroundColor: backgroundLightBlue,
    //     border: '3px solid' + backgroundLightBlue,
    //     color: primaryBlue,
    // }
    
}));

const NewCardButton = styled(Grid)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '3em',
    border: '2px solid transparent',
    color: primaryLightEmerald2,
    padding: '0 2em',
    marginBottom: '1em',
    borderRadius: '.7em',
    fontWeight: 600,
    cursor: 'pointer',
    border: '2px dashed ' + primaryLightEmerald2,
    transition: '0.2s ease-in-out',
    '&:hover': {
        backgroundColor: primaryLightEmerald1,
        border: '2px dashed' + primaryEmerald,
        color: primaryEmerald,
    }
    
}));

export default DeckQuestions;