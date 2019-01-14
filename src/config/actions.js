export function setBookmarksAction(bookmarks) {
    return {
        type: 'SET_BOOKMARKS',
        bookmarks
    }
}

export function setTokenAction(token) {
    return {
        type: 'SET_TOKEN',
        token
    }
}

export function setLoginErrorAction(loginError) {
    return {
        type: 'SET_LOGINERROR',
        loginError
    }
}