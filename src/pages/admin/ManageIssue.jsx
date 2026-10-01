import React, { useContext, useState } from 'react';
import { baseUrl } from '../../services/BaseUrl';
import { AuthContext } from '../../context/AuthProvider';
import toast from 'react-hot-toast';

const ManageIssue = () => {
    const { accessToken } = useContext(AuthContext)

    const [issueId, setIssueId] = useState(null);
    const [payReturnIssueId, setPayReturnIssueId] = useState(null);

    const handleReturn = async (e) => {
        e.preventDefault();
        const res = await fetch(`${baseUrl}/admin/return_book/${issueId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        const data = await res.json()
        toast.success(data.message)

    };

    const handleReturnPay = async (e) => {
        e.preventDefault();
        const res = await fetch(`${baseUrl}/admin/fine/pay/${payReturnIssueId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        const data = await res.json()
        toast.success(data.message)

      
    };

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold mb-8">
                    Manage Issues
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Issue Book Card */}
                    <div className="card bg-base-100 shadow-xl">

                        <div className="card-body">

                            <h2 className="card-title">
                                Return Book
                            </h2>

                            <p className="text-base-content/60">
                                Enter the Issue ID to Return the book.
                            </p>

                            <form onSubmit={handleReturn}>

                                <div className="mt-4">

                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Issue ID
                                        </span>
                                    </label>

                                    <input
                                        type="number"
                                        value={issueId}
                                        onChange={(e) => setIssueId(e.target.value)}
                                        placeholder="Enter Issue ID"
                                        className="input input-bordered w-full"
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-full rounded-xl mt-5"
                                >
                                    Return Book
                                </button>

                            </form>

                        </div>

                    </div>


                    {/* Return Book Card */}
                    <div className="card bg-base-100 shadow-xl">

                        <div className="card-body">

                            <h2 className="card-title">
                                Return Book With Pay
                            </h2>

                            <p className="text-base-content/60">
                                Enter the issue ID to return the book with Fine.
                            </p>

                            <form onSubmit={handleReturnPay}>

                                <div className="mt-4">

                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Issue ID
                                        </span>
                                    </label>

                                    <input
                                        type="number"
                                        value={payReturnIssueId}
                                        onChange={(e) => setPayReturnIssueId(e.target.value)}
                                        placeholder="Enter issue ID"
                                        className="input input-bordered w-full"
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-full rounded-xl mt-5"
                                >
                                    Return Book by Pay
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ManageIssue;