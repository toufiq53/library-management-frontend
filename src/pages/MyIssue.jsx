import React, { useContext, useEffect, useState } from 'react';
import { baseUrl } from '../services/BaseUrl';
import { AuthContext } from '../context/AuthProvider';

const MyIssue = () => {

    const [myIssues, setMyIssues] = useState([]);
    const { accessToken } = useContext(AuthContext);

    useEffect(() => {

        if (!accessToken) return;

        fetch(`${baseUrl}/issues/my`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => setMyIssues(data))
            .catch(err => console.log(err));
        
    }, [accessToken]);
console.log(myIssues);

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    };


    return (
        <div className="min-h-screen bg-base-200 p-6">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold mb-6">
                    My Issued Books
                </h1>

                <div className="card bg-base-100 shadow-xl">

                    <div className="card-body p-0">

                        <div className="overflow-x-auto">

                            <table className="table">

                                <thead>
                                    <tr>
                                        <th>Issue ID</th>
                                        <th>Book ID</th>
                                        <th>Issue Date</th>
                                        <th>Due Date</th>
                                        <th>Return Date</th>
                                        <th>Fine</th>
                                        <th>Fine Paid</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {myIssues.map((issue) => (

                                        <tr key={issue.id}>

                                            <td>
                                                {issue.id}
                                            </td>

                                            <td>
                                                {issue.book_id}
                                            </td>

                                            <td>
                                                {formatDate(issue.issue_date)}
                                            </td>

                                            <td>
                                                {formatDate(issue.due_date)}
                                            </td>

                                            <td>
                                                {formatDate(issue.return_date)}
                                            </td>

                                            <td>
                                                ৳{issue.fine_amount}
                                            </td>

                                            <td>
                                                {issue.fine_paid}
                                            </td>

                                            <td>
                                                <span
                                                    className={
                                                        issue.status === "issued"
                                                            ? "badge badge-warning"
                                                            : "badge badge-success"
                                                    }
                                                >
                                                    {issue.status}
                                                </span>
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default MyIssue;