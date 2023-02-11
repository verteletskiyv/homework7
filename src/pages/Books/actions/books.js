import * as types from '../constants/actionTypes';
import {deleteJson, getJson} from "../../../requests";
import config from "../../../config";
import {getToken} from "../../../token";

const receiveAllBooks = (books) => ({
    type: types.SUCCESS_ALL_BOOKS,
    payload: books,
});

const requestAllBooks = () => ({
    type: types.REQUEST_ALL_BOOKS,
});

const errorReceiveAllBooks = () => ({
    type: types.ERROR_ALL_BOOKS,
});

const getBooks = () => {
    const { BASE_URL, BOOKS_SERVICE } = config;
    return getJson({url: `${BASE_URL}${BOOKS_SERVICE}`})
        .catch(error => console.log('error fetching list of books: ' + error));
}

export const fetchBooks = () => (dispatch) => {
    if (getToken()) {
        dispatch(requestAllBooks());
        return getBooks({dispatch})
            .then(books => dispatch(receiveAllBooks(books)))
            .catch(() => dispatch(errorReceiveAllBooks()));
    }
}

const successDeleteBook = (book) => ({
    type: types.SUCCESS_DELETE_BOOK,
    payload: book,
});

const errorDeleteBook = () => ({
    type: types.ERROR_DELETE_BOOK,
});

const requestDeleteBook = () => ({
    type: types.REQUEST_DELETE_BOOK,
});

const deleteBook = (id) => {
    const { BASE_URL, BOOKS_SERVICE } = config;
    return deleteJson({url: `${BASE_URL}${BOOKS_SERVICE}/${id}`})
        .catch(error => console.log('error deleting book: ' + error));
}

export const fetchDeleteBook = ({ id }) => (dispatch) => {
    if (getToken()) {
        dispatch(requestDeleteBook());
        return deleteBook(id)
            .then(book => {
                dispatch(successDeleteBook(book));
                dispatch(fetchBooks());
            })
            .catch(() => dispatch(errorDeleteBook()));
    }
}
