import { createStore } from 'redux'

const initialState = {
    bookmarks: [],
    token: null,
    loginError: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_BOOKMARKS':
            return { ...state, bookmarks: action.bookmarks }
        case 'SET_TOKEN':
            return { ...state, token: action.token }
        case 'SET_LOGINERROR':
            return { ...state, loginError: action.loginError }
        default:
            return state
    }
}

export default createStore(reducer, initialState)