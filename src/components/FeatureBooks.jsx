import React, { useEffect, useState } from 'react';
import { baseUrl } from '../services/BaseUrl';
import BookCard from './BookCard';

const FeatureBooks = () => {

    const [featureBooks, setFeatureBooks] = useState([]);
    const [loading,setloading]=useState(true)

    useEffect(() => {
        fetch(`${baseUrl}/books/all`)
            .then(res => res.json())
            .then(data => {
                setFeatureBooks(data);
                setloading(false)
           })

    }, [])

    return (
        <div >
            <h1 className='text-center text-4xl py-16 font-bold '>Our Featured Books</h1>
            <div className='grid grid-cols-3 gap-12 px-24 '>
                {
                      loading ? (
                    <div className="col-span-full flex justify-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ):(featureBooks.slice(0-3).map(book => <BookCard book={book} key={book.id}></BookCard>))
                }
            </div>
        </div>

    );
};

export default FeatureBooks;