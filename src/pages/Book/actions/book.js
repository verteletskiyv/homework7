import * as types from '../constants/actionTypes';
import {getJson, postJson, putJson} from "../../../requests";
import config from "../../../config";
import {getToken} from "../../../token";


// CREATE
const requestCreateBook = () => ({
    type: types.REQUEST_CREATE_BOOK,
})

const errorCreateBook = () => ({
    type: types.ERROR_CREATE_BOOK,
})

const successCreateBook = payload => ({
    payload,
    type: types.SUCCESS_CREATE_BOOK,
})

const createBook = ({
        title,
        author,
        genre,
        yearWritten,
    }) => {
    const {
        BASE_URL,
        BOOKS_SERVICE,
    } = config;
    return postJson({
        body: {
            title,
            author,
            genre,
            yearWritten,
        },
        url: `${BASE_URL}${BOOKS_SERVICE}`,
    }).catch(error => console.log("Failed to create book: " + error.message))
}

export const fetchCreateBook = ({
    title,
    author,
    genre,
    yearWritten,
}) => (dispatch) => {
    dispatch(requestCreateBook())
    return createBook({
        title,
        author,
        genre,
        yearWritten,
    }).then(() => {
        dispatch(successCreateBook());
        window.location.replace("/books");
    })
    .catch(() => dispatch(errorCreateBook()))
}

// GET BY ID
const requestGetBook = () => ({
    type: types.REQUEST_ONE_BOOK,
})

const errorGetBook = () => ({
    type: types.ERROR_ONE_BOOK,
})

const successGetBook = (book) => ({
    type: types.SUCCESS_ONE_BOOK,
    payload: book,
})

const getOneBook = (id) => {
    const { BASE_URL, BOOKS_SERVICE } = config;
    return getJson({url: `${BASE_URL}${BOOKS_SERVICE}/${id}`})
        .catch(error => console.log('error fetching a book: ' + error));
}

export const fetchOneBook = ({id}) => (dispatch) => {
    if (getToken()) {
        dispatch(requestGetBook());
        return getOneBook(id)
            .then(book => dispatch(successGetBook(book)))
            .catch(() => dispatch(errorGetBook()));
    }
}

// EDIT
const requestEditBook = () => ({
    type: types.REQUEST_EDIT_BOOK,
})

const errorEditBook = () => ({
    type: types.ERROR_EDIT_BOOK,
})

const successEditBook = payload => ({
    payload,
    type: types.SUCCESS_EDIT_BOOK,
})

const editBook = (
    id,
    {
        title,
        author,
        genre,
        yearWritten,
    }) => {
    const {
        BASE_URL,
        BOOKS_SERVICE,
    } = config;
    return putJson({
        body: {
            title,
            author,
            genre,
            yearWritten,
        },
        url: `${BASE_URL}${BOOKS_SERVICE}/${id}`,
    }).catch(error => console.log("Failed to update book: " + error.message))
}

export const fetchEditBook = (
    id,
    {
        title,
        author,
        genre,
        yearWritten,
    }) => (dispatch) => {
    dispatch(requestEditBook())
    return editBook(
        id,
        {
        title,
        author,
        genre,
        yearWritten,
    }).then(() => {
        dispatch(successEditBook());
        window.location.replace("/books");
    })
        .catch(() => dispatch(errorEditBook()))
}