import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BookContainer from "../BookContainer";


const useStyles = makeStyles({
    body: {
        maxWidth: '600px',
        margin: '0 auto',
    },
    container: {
        display: 'grid',
        gridTemplateColumns: '580px 580px',
        columnGap: '10px',
        rowGap: '1em',
        textAlign: 'center',
    },
});

const BooksTable = ({books, onDelete}) => {
    const classes = useStyles();
    return (
        <div className={classes.body}>
            <div className={classes.container}>
                {books.map((book) => (
                    <BookContainer book={book} onDelete={onDelete} />
                ))}
            </div>
        </div>
    );
}

export default BooksTable;
