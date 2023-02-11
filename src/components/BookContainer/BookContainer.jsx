import React, {useState} from "react";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import DeleteForeverSharpIcon from "@material-ui/icons/DeleteForeverSharp";
import {makeStyles} from "@material-ui/core/styles";
import Button from "../Button";
import Paper from "../Paper";


const useStyles = makeStyles({
    card: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 0 10px 20px',
        fontSize: '1.3rem',
        backgroundColor: '#f9f9f9',
    },
    cardText: {
        width: '100%',
        textAlign: 'left',
    },
    cardTextAndBtnContainerTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardTextAndBtnContainerBottom: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    icon: {
        height: '30px',
        width: '30px',
    },
})

const BookContainer = ({book, onDelete}) => {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    return (
        <Paper onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            <div className={classes.card}>
                <div className={classes.cardText}>
                    <div className={classes.cardTextAndBtnContainerTop}>
                        <h3>{book.title}</h3>
                        {show && <Button color="primary"
                                         title="Edit"
                                         href={`book/${book.id}`}
                                         size="small"
                                         className={classes.icon}
                        >
                            <EditSharpIcon className={classes.icon}/>
                        </Button>}
                    </div>
                    <p>{`${book.author}, ${book.yearWritten}`}</p>
                    <div className={classes.cardTextAndBtnContainerBottom}>
                        <p>{book.genre}</p>
                        <Button title="Delete"
                                size="small"
                                color="secondary"
                                onClick={() => onDelete(book.id)}
                        >
                            {show && <DeleteForeverSharpIcon className={classes.icon}/>}
                        </Button>
                    </div>
                </div>
            </div>
        </Paper>
    )
}

export default BookContainer;