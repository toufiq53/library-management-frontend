import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { baseUrl } from '../services/BaseUrl';
import { AuthContext } from '../context/AuthProvider';
import toast from 'react-hot-toast';

const BookDetails = () => {

    const { id } = useParams()
    const [bookDetails, setBookDetails] = useState(null)
    const { accessToken } = useContext(AuthContext)

    const handleReserve= async()=>{
        const res=await fetch(`${baseUrl}/reserve/${id}`,{
            method:"POST",
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        })
        const data= await res.json();
        if (data){
           toast.success(data.message) 
        }
        
        // console.log(data);
    }

    useEffect(() => {
        if (!id) return
        fetch(`${baseUrl}/books/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => setBookDetails(data))
            .catch(err => console.log(err))
    }, [id])

   
    return (
        <div className="min-h-screen  bg-base-200 py-10 px-4">

            {/* Outer Card */}
            <div className="card max-w-6xl h-150  mx-auto bg-base-100 shadow-2xl">

                <div className="card-body mt-3">

                    {/* Book Details Content */}
                    <div className="flex flex-col lg:flex-row gap-5  ">

                        {/* Book Cover */}
                        <div className="lg:w-1/2 flex items-center justify-center ">

                            {bookDetails?.cover_image ? (

                                <img
                                    src={bookDetails.cover_image}
                                    alt={bookDetails.title}
                                    className="w-full max-w-md h-[500px] object-cover rounded-xl shadow-lg"
                                />

                            ) : (

                                <div className="w-full max-w-md h-[500px] flex items-center justify-center bg-base-300 rounded-xl">

                                    {/* Book Shape */}
                                    <div className="relative w-64 h-96">

                                        <div className="absolute inset-0 bg-primary rounded-r-xl shadow-2xl">

                                            {/* Spine */}
                                            <div className="absolute left-0 top-0 h-full w-6 bg-primary-focus rounded-l-xl">
                                            </div>

                                            {/* Inner Border */}
                                            <div className="absolute inset-5 border-2 border-primary-content/30 rounded-lg">
                                            </div>

                                            {/* Book Text */}
                                            <div className="relative h-full flex flex-col items-center justify-center px-10">

                                                <p className="text-sm uppercase tracking-widest text-primary-content/70 mb-6">
                                                    Book
                                                

                                                </p>

                                                <h2 className="text-3xl font-bold text-primary-content text-center leading-tight">
                                                    {bookDetails?.title}
                                                </h2>

                                                <div className="w-20 h-1 bg-primary-content/40 rounded-full mt-8">
                                                </div>

                                                <p className="text-sm text-primary-content/70 mt-5">
                                                    {bookDetails?.author}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )}

                        </div>


                        {/* Book Information */}
                        <div className="lg:w-1/2 flex flex-col justify-center pr-6">
                        <p>ID: {bookDetails?.id}</p>

                            {/* Category */}
                            <span className="badge badge-primary w-fit">
                                {bookDetails?.category}
                            </span>


                            {/* Title */}
                            <h1 className="text-4xl font-bold mt-4">
                                {bookDetails?.title}
                            </h1>


                            {/* Author */}
                            <p className="text-lg text-base-content/60 mt-2">
                                <span>by </span>
                                <span className=' text-gray-950 font-semibold'>{bookDetails?.author}</span> 
                            </p>


                            


                            {/* Description */}
                            <h3 className="text-xl font-semibold mb-2">
                                Description
                            </h3>

                            <p className="leading-7 text-base-content/70">
                                {bookDetails?.description}
                            </p>


                           


                            {/* Book Information */}
                            <div className="grid grid-cols-2 gap-4 w-full">

                                {/* Price */}
                                <div className="bg-base-200 rounded-xl p-4 border border-gray-200">
                                    <p className="text-sm text-base-content/60">
                                        Price
                                    </p>

                                    <p className="text-2xl font-bold text-black mt-1">
                                        ৳{bookDetails?.price}
                                    </p>
                                </div>

                                {/* Available Copies */}
                                <div className="bg-base-200 rounded-xl p-4 border border-gray-200">
                                    <p className="text-sm text-base-content/60">
                                        Available Copies
                                    </p>

                                    <p
                                        className={
                                            bookDetails?.available_copies > 0
                                                ? "text-2xl font-bold text-success mt-1"
                                                : "text-2xl font-bold text-error mt-1"
                                        }
                                    >
                                        {bookDetails?.available_copies}
                                    </p>
                                </div>

                                {/* Total Copies */}
                                <div className="col-span-2 w-full bg-base-200 rounded-xl p-4 border border-gray-100">

                                    <div className="grid grid-cols-2 w-full items-center">

                                        <p className="text-base-content">
                                            Total Copies
                                        </p>

                                        <p className="text-xl font-bold text-right">
                                            {bookDetails?.total_copies}
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* Reserve */}
                            <div className='pt-5 px-1'>

                                <button
                                onClick={handleReserve}
                                    className=" mt-6 bg-blue-600 px-6 py-4 text-lg font-semibold w-full  rounded-xl text-white"
                                    disabled={bookDetails?.available_copies === 0}
                                >
                                    {bookDetails?.available_copies > 0
                                        ? "Reserve"
                                        : "Not Available"}
                                </button>
                            </div>




                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default BookDetails;