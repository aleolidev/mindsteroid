import * as api from '../api';

// Action Creators
export const getDecks = () => async (dispatch) => {
    try {
        const { data } = await api.fetchDecks();
        
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const createDeck = (deck) => async (dispatch) => {
    try {
        const { data } = await api.createDeck(deck)
        dispatch({type: 'CREATE', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}