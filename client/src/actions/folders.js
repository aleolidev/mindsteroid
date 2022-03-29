import * as api from '../api';

// Action Creators
export const getFolders = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.fetchFoldersById(id);
        
        dispatch({ type: 'FETCH_ALL', payload: data });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }
}

export const createFolder = (folder, id) => async (dispatch) => {
    try {
        const { data } = await api.createFolder(folder)
        dispatch({type: 'CREATE', payload: data});
        
        const fatherFolder = await api.getFolderById(id);
        const fatherData = fatherFolder.data;
        fatherData.subfolders.push(data._id)
        const newFather = await api.updateFolder(id, fatherData);
        
        dispatch({ type: 'UPDATE', payload: newFather.data})
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

export const deleteFolder = (id) => async (dispatch) => {
    try {
        await api.deleteFolder(id);

        dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
        console.log(error.message);
    }
}