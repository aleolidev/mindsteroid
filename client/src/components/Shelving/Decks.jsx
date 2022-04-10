import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { HiOutlinePencil } from 'react-icons/hi';
import { CgTrashEmpty } from 'react-icons/cg';
import { useSelector, useDispatch } from 'react-redux';

import { darkTextColor, primaryEmerald } from '../../utils'
import { createDeck, updateDeck } from '../../actions/decks';
import Deck from './Deck/Deck';
import Item from './Item';
import CustomDialog from '../Utils/CustomDialog';

const Decks = forwardRef(({ id }, ref) => {

    const { decks } = useSelector((state) => state.decks);

    const [ decksData, setDecksData ] = useState([]);
    const [ decksLength, setDecksLength ] = useState(null);
    const [ decksLastLength, setDecksLastLength ] = useState(null);
    const [ openDialog, setOpenDialog ] = useState(false);

    const decksRef = useRef();
    
    const dispatch = useDispatch();
        
    if (decks !== undefined && decks !== null){
        if (decksLength === null) {
            setDecksLastLength(decks.length);
            setDecksLength(decks.length);
        }
        
        if (decks.length !== decksLength) {
            setDecksLength(decks.length);
        }
    }

    // Adds a new item to local array of folders
    const handleDeckAdd = () => {
        const user = JSON.parse(localStorage.getItem('profile'))
        setDecksData([{ name: 'Nuevo mazo', parent: id, creator: user?.result?._id}, ...decksData])
    }

    // Saves the last created folder
    const handleSubmit = async () => {
        dispatch(await createDeck({...decksData[0]}, id))
    }

    const handleUpdateName = (index, name) => {
        const values = [...decks];
        values[index].name = name
        setDecksData(values);
        dispatch(updateDeck(decksData[index]))
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    
    useImperativeHandle(ref, () => ({
        handleDeckAdd
    }));

    // If the local array of decks changes his length...
    useEffect(() => {
        if (decks !== undefined) {
            // If new item added to decksData, insert the new item
            if (decksData[0] !== undefined && decksData[0] !== null && decksData.length > decks.length) {
                handleSubmit()
            }
        }
    }, [decksData.length])


    // If the decks array of the db changes his length...
    useEffect(() => {
        if (decksRef.current !== undefined 
            && decksRef.current !== null 
            && decksRef.current.children[decksData.length - 1] !== undefined 
            && decksRef.current.children[decksData.length - 1] !== null
            && decksLength > decksLastLength)
        {
            handleOpenDialog();
        }
        setDecksLastLength(decksLength);
    }, [decksLength])

    // Import db changes to local whenever they change...
    useEffect(() => {
        if(decks !== undefined && decks.length > 0) {
            setDecksData(decks);
        }
    }, [decks])

    const deckActions = [
        {action: null, title: <Item icon={ <HiOutlinePencil/ > }>Cambiar nombre</Item>},
        // TODO: Add delete confirmation
        {action: null, title: <Item icon={ <CgTrashEmpty/ > }>Eliminar</Item>},
    ]

    return (
        <div>
            <TitleText>Mazos</TitleText>
            <TitleUnderline />
            <CustomGrid name='deckContainer' container ref={ decksRef }>
                {/* TODO: Add blank page message */}
                {decks.map((deck, index) => (
                    <Grid name="deckGrid" key={deck._id} item xs={12} sm={6} md={3} >
                        {/* { deck.name } */}
                        <Deck deck={deck} handleUpdateName={handleUpdateName} deckObj={decksData[index]} index={index} actions={deckActions}/>
                    </Grid>
                ))}
                <Grid name="deckGrid" item xs={3}></Grid><Grid name="deckGrid" item xs={3}></Grid>
                <Grid name="deckGrid" item xs={3}></Grid><Grid name="deckGrid" item xs={3}></Grid>
            </CustomGrid>

            <CustomDialog 
                open={ openDialog } 
                handleClose={ handleCloseDialog } 
                title="Cambiar nombre" 
                currentValue="Nuevo mazo"
                handleSave={(newName) => {
                    handleUpdateName(decks.length - 1, newName);
                    handleCloseDialog();
                }} 
            />
        </div>
    )
})

const CustomGrid = styled(Grid)(() => ({
    paddingBottom: '5em',
}));

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