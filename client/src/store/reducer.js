const initialState = {
    isAuthenticated: false 
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case 'ON_AUTHENTICATED':
            return {
                ...state, 
                isAuthenticated: action.token ? true : false 
            }
        case 'SIGN_OUT': 
            return {
                ...state, 
                isAuthenticated: false 
            }
        default:
            return state;
    }
}

export default reducer 