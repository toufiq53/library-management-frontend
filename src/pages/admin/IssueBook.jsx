import React, { useContext, useState } from 'react';
import { baseUrl } from '../../services/BaseUrl';
import { AuthContext } from '../../context/AuthProvider';
import toast from 'react-hot-toast';

const IssueBook = () => {

    const [userId, setUserId] = useState("");
    const [bookId, setBookId] = useState("");
    const{accessToken}=useContext(AuthContext)
    const handleSubmit =async (e) => {
        e.preventDefault();

        const issueData = {
            user_id: userId,
            book_id: bookId
        };

        const res=await fetch(`${baseUrl}/admin/create_issue`,{
            method:"POST",
            headers:{
                
                Authorization:`Bearer ${accessToken}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(issueData)
        })
        const data=await res.json()
        toast.success(data.message)
    };

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4">

            <div className="max-w-xl mx-auto">

                <div className="card bg-base-100 shadow-xl">

                    <div className="card-body">

                        <h1 className="text-3xl font-bold">
                            Issue Book
                        </h1>

                        <p className="text-base-content/60">
                            Enter user and book information
                        </p>

                        <div className="divider"></div>

                        <form onSubmit={handleSubmit}>

                            {/* User ID */}
                            <div className="mb-5">

                                <label className="label">
                                    <span className="label-text font-semibold">
                                        User ID
                                    </span>
                                </label>

                                <input
                                    type="number"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    placeholder="Enter user ID"
                                    className="input input-bordered w-full"
                                    required
                                />

                            </div>


                            {/* Book ID */}
                            <div className="mb-6">

                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Book ID
                                    </span>
                                </label>

                                <input
                                    type="number"
                                    value={bookId}
                                    onChange={(e) => setBookId(e.target.value)}
                                    placeholder="Enter book ID"
                                    className="input input-bordered w-full"
                                    required
                                />

                            </div>


                            <button
                                type="submit"
                                className="btn btn-primary w-full rounded-xl"
                            >
                                Issue Book
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default IssueBook;