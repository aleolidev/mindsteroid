export default (decks = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...decks, action.payload];
        default:
            return decks;
    }
}