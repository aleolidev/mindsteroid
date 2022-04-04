const decks = (state = { decks: [], isLoading: true }, action) => {
    switch (action.type) {
        case 'START_LOADING_DECKS':
            return { ...state, isLoading: true };
        case 'END_LOADING_DECKS':
            return { ...state, isLoading: false };
        case 'FETCH_ALL_DECKS':
            return {...state, decks: action.payload };
        case 'CREATE_DECK':
            return {...state, decks: [...state.decks, action.payload] };
        case 'DELETE_DECK':
            return { ...state, decks: state.decks.filter((deck) => deck._id !== action.payload) };
        case 'UPDATE_DECK':
            return {...state, decks: state.decks.map((deck) => (deck._id === action.payload._id ? action.payload : deck)) };
        default:
            return state;
    }
}

export default decks;