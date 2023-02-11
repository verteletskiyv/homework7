import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from 'components/Typography';
import useAccessValidate from 'hooks/useAccessValidate';
import BookForm from "components/BookForm";
import {useDispatch, useSelector} from "react-redux";
import {fetchOneBook} from "../actions/book";

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

const Book = ({id, formTitle, authorities}) => {
    const classes = getClasses();
    const dispatch = useDispatch();
    const canSeeList = useAccessValidate({
        ownedAuthorities: authorities,
        neededAuthorities: ['МОЖНО_ВОТ_ЭТУ_ШТУКУ'],
    });

    let {book} = useSelector(({reducer}) => reducer);
    useEffect(() => {
        if (id) {
            dispatch(fetchOneBook({id: id}));
        }
    }, [id])

    return (
        <div className={classes.container}>
            {canSeeList &&
                <div>
                    <BookForm book={book} formTitle={formTitle || "Add Book"} />
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

export default Book;
