export default (state = { folders: [], isLoading: true }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case 'FETCH_ALL':
            return {...state, folders: action.payload };
        case 'CREATE':
            return {...state, folders: [...state.folders, action.payload] };
        case 'DELETE':
            return { ...state, folders: state.folders.filter((folder) => folder._id !== action.payload) };
        case 'UPDATE':
            return {...state, folders: state.folders.map((folder) => (folder._id === action.payload._id ? action.payload : folder)) };
        default:
            return state.folders;
    }
}