import * as api from '../api';

// Action Creators
export const getCards = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING_CARDS' });
        const { data } = await api.fetchCardsById(id);
        
        dispatch({ type: 'FETCH_ALL_CARDS', payload: data });
        dispatch({ type: 'END_LOADING_CARDS' });
    } catch (error) {
        console.log(error.message);
    }
}

export const createCard = (card, id) => async (dispatch) => {
    try {
        const { data } = await api.createCard(card)
        dispatch({type: 'CREATE_CARD', payload: data});
        
        
        const fatherDeck = await api.getDeckById(id);
        const fatherData = fatherDeck.data;
        fatherData.cardset.push(data._id)
        const newFather = await api.updateDeck(id, fatherData);
        
        dispatch({ type: 'UPDATE_DECK', payload: newFather.data})
    } catch (error) {
        console.log(error.message);
    }
}

export const updateCard = (card) => async (dispatch) => {
    try {
        const { data } = await api.updateCard(card._id, card);
        
        dispatch({ type: 'UPDATE_CARD', payload: data})
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteCard = (id) => async (dispatch) => {
    try {
        await api.deleteCard(id);

        dispatch({ type: 'DELETE_CARD', payload: id });
    } catch (error) {
        console.log(error.message);
    }
}