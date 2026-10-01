import React from 'react';
import { Link } from 'react-router';

const BookCard = ({ book }) => {
    return (
        <div className="card w-100 bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-200 overflow-hidden">

            {/* Book Cover */}
            <figure className="h-64 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                {book.cover_image ? (
                    <img
                        src={book.cover_image}
                        alt={book.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-8xl font-bold text-white">
                        {book.title.charAt(0).toUpperCase()}
                    </span>
                )}
            </figure>


            {/* Book Information */}
            <div className="card-body p-5">
                {/* Category + Price */}
                <div className="flex justify-between items-center mt-3">

                    <span className="badge badge-outline badge-primary capitalize">
                        {book.category}
                    </span>

                    <span className="font-bold text-lg">
                        ৳{book.price}
                    </span>

                </div>

                {/* Title */}
                <h2 className="card-title text-xl">
                    {book.title}
                </h2>

                {/* Author */}
                <p className="text-sm text-base-content/60">
                    By {book.author}
                </p>

                {/* Borrow Button */}
                <div className="card-actions mt-3">
                    <Link to={`/books/${book.id}`}><button className="btn btn-primary w-full"> View Details</button></Link>
                    
                </div>

            </div>
        </div>
    );
};

export default BookCard;