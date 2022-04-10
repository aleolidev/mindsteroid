import * as api from '../api';

// Action Creators
export const getDecks = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING_DECKS' });
        const { data } = await api.fetchDecksById(id);
        
        dispatch({ type: 'FETCH_ALL_DECKS', payload: data });
        dispatch({ type: 'END_LOADING_DECKS' });
    } catch (error) {
        console.log(error.message);
    }
}

export const createDeck = (deck, id) => async (dispatch) => {
    try {
        const { data } = await api.createDeck(deck)
        dispatch({type: 'CREATE_DECK', payload: data});
        
        
        const fatherFolder = await api.getFolderById(id);
        const fatherData = fatherFolder.data;
        fatherData.subdecks.push(data._id)
        console.log('fatherData:', fatherData)
        const newFather = await api.updateFolder(id, fatherData);
        
        dispatch({ type: 'UPDATE_FOLDER', payload: newFather.data})
    } catch (error) {
        console.log(error.message);
    }
}

export const updateDeck = (deck) => async (dispatch) => {
    try {
        const { data } = await api.updateDeck(deck._id, deck);
        
        dispatch({ type: 'UPDATE_DECK', payload: data})
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteDeck = (id) => async (dispatch) => {
    try {
        await api.deleteDeck(id);

        dispatch({ type: 'DELETE_DECK', payload: id });
    } catch (error) {
        console.log(error.message);
    }
}