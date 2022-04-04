export default (state = { folders: [], isLoading: true }, action) => {
    switch (action.type) {
        case 'START_LOADING_FOLDERS':
            return { ...state, isLoading: true };
        case 'END_LOADING_FOLDERS':
            return { ...state, isLoading: false };
        case 'FETCH_ALL_FOLDERS':
            return {...state, folders: action.payload };
        case 'CREATE_FOLDER':
            return {...state, folders: [...state.folders, action.payload] };
        case 'DELETE_FOLDER':
            return { ...state, folders: state.folders.filter((folder) => folder._id !== action.payload) };
        case 'UPDATE_FOLDER':
            return {...state, folders: state.folders.map((folder) => (folder._id === action.payload._id ? action.payload : folder)) };
        default:
            return state;
    }
}