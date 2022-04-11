const authReducer = (state = { authData: null, testStudyingData: [], reviewStudyingData: [] }, action) => {
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

            return { ...state, authData: action?.data};
        case 'LOGOUT':
            localStorage.clear();

            return { ...state, authData: null};
        
        case 'START_LOADING_STUDYING_DATA':
            return { ...state, isLoading: true };
        case 'END_LOADING_STUDYING_DATA':
            return { ...state, isLoading: false };
        case 'FETCH_ALL_TEST_STUDYING_DATA':
            return {...state, testStudyingData: action.payload };
        case 'FETCH_ALL_REVIEW_STUDYING_DATA':
            return {...state, reviewStudyingData: action.payload };
        case 'UPSERT_STUDYING_DATA':
        default:
            return state;
    }
}

export default authReducer;