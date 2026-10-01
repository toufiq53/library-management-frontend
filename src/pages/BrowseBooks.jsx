import React, { useEffect, useState } from 'react';
import { baseUrl } from '../services/BaseUrl';
import BookCard from '../components/BookCard';

const BrowseBooks = () => {
    const[books,setBooks]=useState([])

    useEffect(()=>{
        fetch(`${baseUrl}/books/all`)
        .then(res=>res.json())
        .then(data=>setBooks(data))
    },[])
    return (
        <div>
           <div className='grid grid-cols-4 p-12 gap-12'>
            {
            books.map(books=><BookCard book={books}></BookCard>)
            }
           </div>
        </div>
    );
};

export default BrowseBooks;