export default (state = { decks: [], isLoading: true }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case 'FETCH_ALL':
            return {...state, decks: action.payload };
        case 'CREATE':
            return {...state, decks: [...state.decks, action.payload] };
        case 'UPDATE':
            return {...state, decks: state.decks.map((deck) => (deck._id === action.payload._id ? action.payload : deck)) };
        default:
            return state.decks;
    }
}