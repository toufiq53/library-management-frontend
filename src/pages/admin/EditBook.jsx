import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { baseUrl } from '../../services/BaseUrl';
import { AuthContext } from '../../context/AuthProvider';
import toast from 'react-hot-toast';

const EditBook = () => {

    const { id } = useParams();
    const { accessToken } = useContext(AuthContext);

    const [bookDetails, setBookDetails] = useState(null);

    // Separate state for every field
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [totalCopies, setTotalCopies] = useState("");
    const [availableCopies, setAvailableCopies] = useState("");


    // Get current book
    useEffect(() => {

        if (!id || !accessToken) return;

        fetch(`${baseUrl}/books/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => setBookDetails(data))
            .catch(err => console.log(err));


    }, [id, accessToken]);

    useEffect(() => {
        if (bookDetails) {
            setTitle(bookDetails?.title || '')
            setAuthor(bookDetails?.author || '')
            setCategory(bookDetails?.category || '')
            setDescription(bookDetails?.description || '')
            setPrice(bookDetails?.price || '')
            setTotalCopies(bookDetails?.total_copies || '')
            setAvailableCopies(bookDetails?.available_copies || '')
        }


    }, [bookDetails])


    const handleSubmit =async (e) => {
        e.preventDefault();

        const updatedBook = {
            title,
            author,
            category,
            description,
            price,
            total_copies:totalCopies,
            available_copies:availableCopies
        };

        console.log(updatedBook);
        const res= await fetch(`${baseUrl}/admin/update_book/${id}`,
            {
                method:'PUT',
                headers:{
                    Authorization:`Bearer ${accessToken}`,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(updatedBook)
            }
        )
        const data=await res.json()
        toast.success(data.message)
    };


    return (
        <div className="min-h-screen bg-base-200 py-10 px-4 ">

            <div className="max-w-3xl mx-auto">

                <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl">

                    <div className="card-body  ">

                        <h1 className="text-3xl font-bold">
                            Edit Book
                        </h1>

                        <p className="text-base-content/60">
                            Update book information
                        </p>

                        <div className="divider"></div>

                        <form onSubmit={handleSubmit}>

                            {/* Title + Author */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-5'>


                                {/* Title */}
                                <div className="mb-5">

                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Title
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="input input-bordered w-full"
                                        placeholder="Book title"
                                    />

                                </div>


                                {/* Author */}
                                <div className="mb-5">

                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Author
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        className="input input-bordered w-full"
                                        placeholder="Author name"
                                    />

                                </div>

                            </div>

                            {/* Category + Price\*/}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-5' >
                                {/* Category */}
                                <div className="mb-5">

                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Category
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        value={category}

                                        onChange={(e) => setCategory(e.target.value)}
                                        className="input input-bordered w-full"
                                        placeholder="Category"
                                    />

                                </div>
                                {/* Price */}
                                <div>

                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Price
                                        </span>
                                    </label>

                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="input input-bordered w-full"
                                        min="0"
                                    />

                                </div>
                            </div>

                            {/*  Total Copies +*/}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

                                {/* Total Copies */}
                                <div>

                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Total Copies
                                        </span>
                                    </label>

                                    <input
                                        type="number"
                                        value={totalCopies}
                                        onChange={(e) =>
                                            setTotalCopies(e.target.value)
                                        }
                                        className="input input-bordered w-full"
                                        min="0"
                                    />

                                </div>
                                 {/*  Available Copies */}
                                 <div className="mb-6">

                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Available Copies
                                    </span>
                                </label>

                                <input
                                    type="number"
                                    value={availableCopies}
                                    onChange={(e) =>
                                        setAvailableCopies(e.target.value)
                                    }
                                    className="input input-bordered w-full"
                                    min="0"
                                />

                            </div>

                            </div>

                            {/* Description */}
                            <div className="mb-5">

                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Description
                                    </span>
                                </label>

                                <textarea
                                    value={description}

                                    onChange={(e) => setDescription(e.target.value)}
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Book description"
                                    rows="4"
                                />

                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                className="btn btn-primary w-full rounded-xl"
                            >
                                Update Book
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default EditBook;