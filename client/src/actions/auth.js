import * as api from '../api/index.js';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        // Log in
        const { data } = await api.signIn(formData);

        dispatch({ type: 'AUTH', data });

        navigate('/');
    } catch (error) {
        console.error(error);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        // Register
        const { data } = await api.signUp(formData);

        dispatch({ type: 'AUTH', data });
    } catch (error) {
        console.error(error);
    }
}

export const firstLoginFolder = (id) => async (dispatch) => {
    
    try {
        const { data: folderExists} = await api.getFolderById(id);
        if (!folderExists) {
            const folder = { name: 'Estantería', _id: id, creator: id}
            const { data } = await api.createFolder(folder)
            dispatch({type: 'CREATE_FOLDER', payload: data});
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const getReviewCardsById = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING_STUDYING_DATA' });
        const { data } = await api.getReviewCardsById(id)
        
        dispatch({ type: 'FETCH_ALL_STUDYING_DATA', payload: data });
        dispatch({ type: 'END_LOADING_STUDYING_DATA' });
    } catch (error) {
        console.log(error.message)
    }
}

export const setOrUpdateCardStatus = (deck) => async (dispatch) => {
    try {
        const { data } = await api.setOrUpdateCardStatus(deck);
        
        dispatch({ type: 'UPSERT_STUDYING_DATA', payload: data})
    } catch (error) {
        console.log(error.message);
    }
}
