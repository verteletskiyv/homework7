import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import BooksTable from 'components/BooksTable';
import Button from 'components/Button';
import Typography from 'components/Typography';
import useAccessValidate from 'hooks/useAccessValidate';
import {fetchBooks, fetchDeleteBook} from "../actions/books";

const getClasses = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItem: 'center',
        justifyContent: 'center',
        minWidth: 400,
    },
    button: {
        alignContent: 'right',
    }
}));

const Books = ({authorities}) => {
    const classes = getClasses();
    let dispatch = useDispatch();

    const [state, setState] = useState({
        componentDidMount: false,
    });


    const canSeeList = useAccessValidate({
        ownedAuthorities: authorities,
        neededAuthorities: ['МОЖНО_ВОТ_ЭТУ_ШТУКУ'],
    });

    const {books} = useSelector(({reducer}) => reducer);

    useEffect(() => {
        dispatch(fetchBooks());
        setState(prevState => ({
            ...prevState,
            componentDidMount: true,
        }));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("CONFIRMING THIS ACTION WILL DELETE THE BOOK!")) {
            dispatch(fetchDeleteBook({id}))
        }
    }

    return (
        <div className={classes.container}>
            {canSeeList &&
                <div>
                    <br/>
                    <Button variant="contained" color="primary" href="book"><AddSharpIcon/></Button>
                    <br/><br/>
                    {state.componentDidMount && (
                        <BooksTable books={books} onDelete={handleDelete} />
                    )}
                </div>
            }
            {!canSeeList && (
                <Typography>
                    Не могу ничего показать :(
                </Typography>
            )}
        </div>
    )
};

export default Books;
