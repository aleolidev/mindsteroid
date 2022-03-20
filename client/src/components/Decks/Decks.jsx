import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { HiOutlinePlus } from 'react-icons/hi'
import { darkTextColor, primaryEmerald, inputSvgColor } from '../../utils'
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import 'react-edit-text/dist/index.css';

import { createDeck } from '../../actions/decks';
import Deck from './Deck/Deck';

const Decks = () => {
    const decks = useSelector((state) => state.decks);
    const [decksData, setDecksData] = useState([]);
    const decksImported = useRef(false);
    const dispatch = useDispatch();

    const decksRef = useRef();

    const handleSubmit = () => {
        // Saves the last created deck
        dispatch(createDeck(decksData[0]))
    }

    // Adds a new item to local array of decks
    const handleDeckAdd = () => {
        setDecksData([{ name: 'Nuevo mazo'}, ...decksData])
    }

    const handleChangeName = (index, e) => {
        const values = [...decks];
        // Due to it's loaded reversed, we need to reverse the index too
        values[decks.length - index - 1].name = e
        setDecksData(values);
    }

    // If the local array of decks changes his length...
    useEffect(() => {
        if (decks.length) {
            // If new item added to decksData, insert the new item
            if (decksData[0] !== undefined && decksData[0] !== null && decksData.length > decks.length) {
                handleSubmit()
            }
        }
    }, [decksData.length])

    
    // If the decks array of the db changes his length...
    useEffect(() => {
        if (decksImported.current)
        {
            if (decksRef.current !== undefined && decksRef.current.children[1] !== undefined && decksRef.current.children[1] !== null) {
                decksRef.current.children[1].firstChild.firstChild.click();
            }
        }
    }, [decks.length])
    
    
    // Import db changes to local whenever they change...
    useEffect(() => {
        if(decks.length > 0) {
            setDecksData(decks);
            decksImported.current = true;
        }
    }, [decks])

    return (
        !decks.length ? <CircularProgress /> : (
        <Container>
            <TitleText>Mazos</TitleText>
            <TitleUnderline />
            <Grid container spacing={3} ref={decksRef}>
                <Grid item xs={12} sm={6} md={2}>
                    <NewDeck onClick={() => {
                                handleDeckAdd()
                            }
                        }>
                        <NewDeckIcon>
                            <HiOutlinePlus />
                        </NewDeckIcon>
                    </NewDeck>
                </Grid>
                
                {decks.slice(0).reverse().map((deck, index) => (
                    <Grid key={deck._id} item xs={12} sm={6} md={2}>
                        <Deck deck={deck} handleChangeName={handleChangeName} index={index} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    ))
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
        border: dashed 3px  #7770b7; 
        svg {
            color: #7770b7;
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
            color: #7770b7;
        }
    }
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