import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

import useBooks from "../../hooks/useBooks";
import { useSelector } from "react-redux";
import AddBook from "./AddBook";
import Book from './Book';


const BookList = () => {



    const { fetchBooks, books, setBooks, loading } = useBooks();
    const auth = useSelector(state => state.auth);

    



    useEffect(() => {
        fetchBooks({user_id:auth.user._id})
    }, [])
    

    return (
        <div>

            <AddBook books={books} setBooks={setBooks} />
            {books.length>0 ? (loading ? <div className="w-full flex justify-center"><CircularProgress size={20}  color="secondary" /></div> : <Book books={books} setBooks={setBooks} />) : null}

        </div>
    );
};

export default BookList;
