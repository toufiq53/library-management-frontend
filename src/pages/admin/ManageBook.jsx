import React, { useContext, useEffect, useState } from 'react';
import { baseUrl } from '../../services/BaseUrl';
import { AuthContext } from '../../context/AuthProvider';
import toast from 'react-hot-toast';
import { Link, } from 'react-router';

const ManageBook = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { accessToken } = useContext(AuthContext)
    const [books, setBooks] = useState([])
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        category: "",
        description: "",
        price: 0,
        total_copies: 1
    });

    const fetchBooks=()=>{
        fetch(`${baseUrl}/books/all`)
            .then(res => res.json())
            .then(data => setBooks(data))
    }

    useEffect(() => {
        fetchBooks();
    }, [])

    const deleteBooks=async (id)=>{
        const res=await fetch(`${baseUrl}/admin/delete/${id}`,{
            method:'DELETE',
            headers:{
                Authorization:`Bearer ${accessToken}`,
                
            }
        })   
       const data=await res.json()
       toast.success(data.message)
       fetchBooks()

    }
    console.log(books);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setBookData({
            ...bookData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(bookData);

        const res = await fetch(`${baseUrl}/admin/create_book`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookData)

        })

        const data = await res.json()
        toast.success(data.message)
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-base-200 p-6">

            {/* Header */}
            <div className="max-w-6xl mx-auto">

                {/* Page Header */}
                <div className="flex justify-between items-center mb-6">

                    <div>
                        <h1 className="text-3xl font-bold">
                            Manage Books
                        </h1>

                        <p className="text-base-content/60 mt-1">
                            Manage all books in your library
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn btn-primary rounded-xl"
                    >
                        + Add Book
                    </button>

                </div>

                {/* Books Table */}
                <div className="card bg-base-100 shadow-xl">

                    <div className="card-body p-0">

                        <div className="overflow-x-auto">

                            <table className="table">

                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Book</th>
                                        <th>Author</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Available</th>
                                        <th>Total</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {/* books details coming here */}
                                <tbody>
                                    {books.map((book, index) => (
                                        <tr key={book.id}>

                                            <td>{index + 1}</td>

                                            <td className="font-bold">
                                                {book.title}
                                            </td>

                                            <td>
                                                {book.author}
                                            </td>

                                            <td>
                                                <span className="badge badge-primary">
                                                    {book.category}
                                                </span>
                                            </td>

                                            <td>
                                                ৳{book.price}
                                            </td>

                                            <td className="text-success font-semibold">
                                                {book.available_copies}
                                            </td>

                                            <td>
                                                {book.total_copies}
                                            </td>

                                            <td>
                                                <div className="flex gap-2">
                                                    <Link to={`/admin/edit/book/${book.id}`} className="btn btn-sm btn-info rounded-lg">
                                                        Edit
                                                    </Link>

                                                    <button onClick={()=>deleteBooks(book.id)} className="btn btn-sm btn-error rounded-lg">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>



            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

                    <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-2xl">

                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b">

                            <div>
                                <h2 className="text-2xl font-bold">
                                    Add New Book
                                </h2>

                                <p className="text-base-content/60 mt-1">
                                    Enter the book information
                                </p>
                            </div>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="btn btn-sm btn-circle btn-ghost"
                            >
                                ✕
                            </button>

                        </div>


                        {/* Form */}
                        <form onSubmit={handleSubmit}>

                            <div className="p-6 space-y-5">

                                {/* Title */}
                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Title
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={bookData.title}
                                        onChange={handleChange}
                                        placeholder="Enter book title"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>


                                {/* Author */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                Author
                                            </span>
                                        </label>

                                        <input
                                            type="text"
                                            name="author"
                                            value={bookData.author}
                                            onChange={handleChange}
                                            placeholder="Enter author name"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>


                                    {/* Category */}

                                    <div>
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                Category
                                            </span>
                                        </label>

                                        <input
                                            type="text"
                                            name="category"
                                            value={bookData.category}
                                            onChange={handleChange}
                                            placeholder="e.g. Programming"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>
                                </div>



                                {/* Description */}
                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Description
                                        </span>
                                    </label>

                                    <textarea
                                        name="description"
                                        value={bookData.description}
                                        onChange={handleChange}
                                        placeholder="Enter book description"
                                        className="textarea textarea-bordered w-full h-28"
                                    />
                                </div>


                                {/* Price + Total Copies */}
                                <div className="grid grid-cols-2 gap-4">

                                    {/* Price */}
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                Price
                                            </span>
                                        </label>

                                        <input
                                            type="number"
                                            name="price"
                                            value={bookData.price}
                                            onChange={handleChange}
                                            min="0"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>


                                    {/* Total Copies */}
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                Total Copies
                                            </span>
                                        </label>

                                        <input
                                            type="number"
                                            name="total_copies"
                                            value={bookData.total_copies}
                                            onChange={handleChange}
                                            min="1"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>

                                </div>

                            </div>


                            {/* Modal Footer */}
                            <div className="flex justify-end gap-3 p-6 border-t">

                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn btn-ghost rounded-xl"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary rounded-xl"
                                >
                                    Add Book
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
};

export default ManageBook;