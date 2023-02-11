import {
    ERROR_CREATE_BOOK,
    REQUEST_CREATE_BOOK,
    SUCCESS_CREATE_BOOK,
    REQUEST_EDIT_BOOK,
    SUCCESS_EDIT_BOOK,
    ERROR_EDIT_BOOK,
    REQUEST_ONE_BOOK,
    SUCCESS_ONE_BOOK,
    ERROR_ONE_BOOK,
} from "../constants/actionTypes";

const initialState = {
    book: {},
    isLoading: false,
    isError: false,
};

export default (state = initialState, action) => {
    switch (action.type) {

        // CREATE
        case REQUEST_CREATE_BOOK: {
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        }

        case ERROR_CREATE_BOOK: {
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        }

        case SUCCESS_CREATE_BOOK: {
            return {
                ...state,
                book: action.payload,
                isLoading: false,
                isError: false,
            }
        }

        // GET BY ID
        case REQUEST_ONE_BOOK: {
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        }

        case ERROR_ONE_BOOK: {
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        }

        case SUCCESS_ONE_BOOK: {
            return {
                ...state,
                book: action.payload,
                isLoading: false,
                isError: false,
            }
        }

        // EDIT
        case REQUEST_EDIT_BOOK: {
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        }

        case ERROR_EDIT_BOOK: {
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        }

        case SUCCESS_EDIT_BOOK: {
            return {
                ...state,
                book: action.payload,
                isLoading: false,
                isError: false,
            }
        }

        default: return state;
    }
}
