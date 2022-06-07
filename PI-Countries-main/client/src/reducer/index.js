const initialState = {
    countries: [],
    country: {},
};

function reducer(state = initialState, action) {

    switch (action.type) {
        case 'SET_COUNTRIES':
            return {
                ...state,
                countries: action.countries
            };
        case 'SET_COUNTRY':
            return {
                ...state,
                country: action.country
            };
        default:
            return state;
    }
    
}

export default reducer;
