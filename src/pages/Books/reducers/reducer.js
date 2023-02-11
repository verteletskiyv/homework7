import {
    ERROR_ALL_BOOKS,
    REQUEST_ALL_BOOKS,
    SUCCESS_ALL_BOOKS,
    ERROR_DELETE_BOOK,
    SUCCESS_DELETE_BOOK,
    REQUEST_DELETE_BOOK
} from "../constants/actionTypes";

const initialState = {
    books: [],
    isLoading: false,
    isError: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ERROR_ALL_BOOKS: {
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        }
        case SUCCESS_ALL_BOOKS: {
            return {
                ...state,
                books: action.payload,
                isLoading: false,
                isError: false,
            }
        }

        case REQUEST_ALL_BOOKS: {
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        }

        case ERROR_DELETE_BOOK: {
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        }
        case SUCCESS_DELETE_BOOK: {
            return {
                ...state,
                isLoading: false,
                isError: false,
            }
        }

        case REQUEST_DELETE_BOOK: {
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        }


        default: return state;
    }
}
