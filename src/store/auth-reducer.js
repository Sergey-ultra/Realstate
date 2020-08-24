let initialState = {
    userId: null,
    name: null,
    isAuth: false
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTH_STATUS':
            return {
                ...state,
                isAuth: action.status
            }
        case 'SET_USER_NAME':
            return {
                ...state,
                name: action.name
            }
        case 'SET_USER_ID':
            return {
                ...state,
                userId: action.userId
            }
        default:
            return state;
    }
}

export const setAuthStatusAC = status => ({type: 'SET_AUTH_STATUS', status})
export const setUserNameAC = name => ({type: 'SET_USER_NAME', name})
export const setUserIdAC = userId => ({type: 'SET_USER_ID', userId})


export const setAutorization = (id, name) => dispatch => {
    dispatch(setAuthStatusAC(true))
    dispatch(setUserNameAC(name))
    dispatch(setUserIdAC(id))
}

export const login = (id, name) => dispatch => {
    dispatch(setAuthStatusAC(true))
    dispatch(setUserNameAC(name))
    dispatch(setUserIdAC(id))
}


export const logout = () => dispatch => {
    dispatch(setAuthStatusAC(false))
    dispatch(setUserIdAC(null))
    dispatch(setUserNameAC(null))
}

