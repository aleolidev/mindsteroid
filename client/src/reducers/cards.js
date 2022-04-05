const cards = (state = { cards: [], isLoading: true }, action) => {
    switch (action.type) {
        case 'START_LOADING_CARDS':
            return { ...state, isLoading: true };
        case 'END_LOADING_CARDS':
            return { ...state, isLoading: false };
        case 'FETCH_ALL_CARDS':
            return {...state, cards: action.payload };
        case 'CREATE_CARD':
            return {...state, cards: [...state.cards, action.payload] };
        case 'DELETE_CARD':
            return { ...state, cards: state.cards.filter((card) => card._id !== action.payload) };
        case 'UPDATE_CARD':
            return {...state, cards: state.cards.map((card) => (card._id === action.payload._id ? action.payload : card)) };
        default:
            return state;
    }
}

export default cards;