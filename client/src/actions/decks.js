import * as api from '../api';

// Action Creators
export const getDecks = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.fetchDecksById(id);
        
        dispatch({ type: 'FETCH_ALL', payload: data });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }
}

export const createDeck = (deck, id) => async (dispatch) => {
    try {
        console.log("0");
        const { data } = await api.createDeck(deck)
        console.log("1");
        dispatch({type: 'CREATE', payload: data});
        console.log("2");
        
        const fatherFolder = await api.getFolderById(id);
        console.log("3");
        const fatherData = fatherFolder.data;
        console.log("4");
        fatherData.subfolders.push(data._id)
        console.log("5");
        const newFather = await api.updateFolder(id, fatherData);
        console.log("6");
        
        dispatch({ type: 'UPDATE', payload: newFather.data})
        console.log("7");
    } catch (error) {
        console.log(error.message);
    }
}

export const updateFolder = (folder) => async (dispatch) => {
    try {
        const { data } = await api.updateFolder(folder._id, folder);
        
        dispatch({ type: 'UPDATE', payload: data})
    } catch (error) {
        console.log(error.message);
    }
}