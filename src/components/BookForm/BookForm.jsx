import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {fetchCreateBook, fetchEditBook} from "../../pages/Book/actions/book";
import TextField from 'components/TextField';
import Button from 'components/Button';
import MenuItem from 'components/MenuItem';
import Select from 'components/Select';
import FormControl from 'components/FormControl';
import InputLabel from 'components/InputLabel';
import {useIntl} from "react-intl";


const useStyles = makeStyles({
    form: {
        textAlign: 'center',
        width: '65rem',
        padding: 10,
    },
    field: {
        margin: 10,
        width: 500,
        textAlign: 'left',
    },
    button: {
        marginRight: 5,
    },
});

const BookForm = ({book, formTitle}) => {
    const classes = useStyles();
    let dispatch = useDispatch();
    const { formatMessage } = useIntl();
    const [state, setState] = useState({
        title: '',
        author: '',
        genre: '',
        yearWritten: '',
        titleInvalid: false,
        titleError: '',
        authorInvalid: false,
        authorError: '',
        yearWrittenInvalid: false,
        yearWrittenError: '',
    });

    useEffect(() => {
        if (book)
            setState({...state, ...book})
    }, [book])

    const {
        title, author, genre, yearWritten,
        titleInvalid, authorInvalid, yearWrittenInvalid,
        authorError, titleError, yearWrittenError,
    } = state;

    const handleUserInput = (e) => {
        let {name, value} = e.target;
        setState({...state, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setState({
            ...state,
            titleInvalid: false,
            authorInvalid: false,
            yearWrittenInvalid: false,
        });

        const errors = validateForm();
        if (errors.formHasErrors) {
            setState({
                ...state,
                titleInvalid: errors.titleInvalid,
                titleError: errors.titleError,
                authorInvalid: errors.authorInvalid,
                authorError: errors.authorError,
                yearWrittenInvalid: errors.yearWrittenInvalid,
                yearWrittenError: errors.yearWrittenError,
            });
        } else {
            !book.id
                ? dispatch(fetchCreateBook({title, author, genre, yearWritten}))
                : dispatch(fetchEditBook(book.id, {title, author, genre, yearWritten}));
        }
    }

    const validateForm = () => {
        const errors = {
            titleInvalid: false, titleError: '',
            authorInvalid: false, authorError: '',
            yearWrittenInvalid: false, yearWrittenError: '',
            formHasErrors: false,
        }

        if (!title || title.length < 2 || title.length > 99) {
            errors.formHasErrors = true;
            errors.titleInvalid = true;
            errors.titleError = 'Title should be between 1 and 100 characters'
        }
        if (!author || author.length < 2 || author.length > 99) {
            errors.formHasErrors = true;
            errors.authorInvalid = true;
            errors.authorError = 'Author\'s name should be between 1 and 100 characters'
        }
        if (yearWritten === '' || yearWritten < 0 || yearWritten > 2023) {
            errors.formHasErrors = true;
            errors.yearWrittenInvalid = true;
            errors.yearWrittenError = 'Year written should be between 0 and 2023'
        }

        return errors;
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
            <div>
                <h1>{formTitle}</h1>
                <TextField
                    className={classes.field}
                    id="outlined-secondary"
                    name="title"
                    label={formatMessage({id: 'title'})}
                    variant="outlined"
                    color="primary"
                    onChange={handleUserInput}
                    value={title || ''}
                    error={titleInvalid}
                    helperText={titleError}
                />
            </div>
            <div>
                <TextField
                    className={classes.field}
                    id="outlined-secondary"
                    name="author"
                    label={formatMessage({id: 'author'})}
                    variant="outlined"
                    color="primary"
                    onChange={handleUserInput}
                    value={author || ''}
                    error={authorInvalid}
                    helperText={authorError}
                />
            </div>
            <div>
                <FormControl variant="outlined" className={classes.field} required>
                    <InputLabel id="demo-simple-select-outlined-label">{formatMessage({id: 'genre'})}</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name="genre"
                        value={genre || ''}
                        onChange={handleUserInput}
                        label={formatMessage({id: 'genre'})}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Fantasy">Fantasy</MenuItem>
                        <MenuItem value="Horror">Horror</MenuItem>
                        <MenuItem value="Thriller">Thriller</MenuItem>
                        <MenuItem value="Poetry">Poetry</MenuItem>
                        <MenuItem value="Drama">Drama</MenuItem>
                        <MenuItem value="Historical">Historical</MenuItem>
                        <MenuItem value="Romance">Romance</MenuItem>
                        <MenuItem value="Western">Western</MenuItem>
                        <MenuItem value="Biography">Biography</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <TextField
                    className={classes.field}
                    id="outlined-secondary"
                    name="yearWritten"
                    label={formatMessage({id: 'yearWritten'})}
                    variant="outlined"
                    color="primary"
                    type="number"
                    onChange={handleUserInput}
                    value={yearWritten || ''}
                    error={yearWrittenInvalid}
                    helperText={yearWrittenError}
                />
            </div>
            <Button className={classes.button} variant="contained" color="secondary" href="/books">{formatMessage({id: 'cancel'})}</Button>
            <Button variant="contained" color="primary" type="submit">{formatMessage({id: 'save'})}</Button>
        </form>
    );
}

export default BookForm;