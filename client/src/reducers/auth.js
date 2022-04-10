const authReducer = (state = { authData: null, studyingData: [] }, action) => {
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
        case 'FETCH_ALL_STUDYING_DATA':
            return {...state, studyingData: action.payload };
        // case 'CREATE_STUDYING_DATA':
        //     return {...state, studyingData: [...state.studyingData, action.payload] };
        // case 'DELETE_STUDYING_DATA':
        //     return { ...state, studyingData: state.studyingData.filter((card) => card._id !== action.payload) };
        case 'UPSERT_STUDYING_DATA':
            console.log('PAYLOAD:', action.payload)
            // return {...state, studyingData: state.studyingData.map((card) => (card._id === action.payload._id ? action.payload : card)) };
            // return {...state, studyingData: () => {
            //     let newData = state.studyingData.map((card) => (card._id === action.payload._id ? action.payload : card));

            // } };

        default:
            return state;
    }
}

export default authReducer;