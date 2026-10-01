import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { baseUrl } from '../services/BaseUrl';
import toast from 'react-hot-toast';
const MyReserve = () => {

    const { accessToken } = useContext(AuthContext);
    const [myReserve, setMyReserve] = useState([]);

    const cancelReserve = async (id) => {
        const res=await fetch(`${baseUrl}/reserve/cancel/${id}`,{
            method:"DELETE",
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        })
        const data= await res.json()
        toast.success(data.message)
        fetchReservation()

    }
//fetching Reservation Data
    const fetchReservation=()=>{
        fetch(`${baseUrl}/reservation/my`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setMyReserve(data);
            })
            .catch(err => console.log(err));
    }
//useEffect
    useEffect(() => {

        if (!accessToken) return;

        fetchReservation()

    }, [accessToken]);


    return (
        <div className="min-h-screen bg-base-200 py-10 px-4">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold mb-6">
                    My Reservations
                </h1>

                <div className="grid gap-4">

                    {myReserve.map(reserve => (

                        <div
                            key={reserve.id}
                            className="card bg-base-100 shadow-md"
                        >
                            <div className="card-body">

                                <div className="flex justify-between items-center">

                                    <div>
                                        <h2 className="text-xl font-bold">
                                            Reservation #{reserve.id}
                                        </h2>

                                        <p className="text-base-content/60">
                                            Book ID: {reserve.book_id}
                                        </p>

                                        <p className="text-sm text-base-content/60">
                                            Reserved at: {new Date(reserve.reservation_date).toLocaleString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                        </p>
                                    </div>


                                    <div>
                                        <span
                                            className={
                                                reserve.status === "pending"
                                                    ? "badge badge-warning"
                                                    : reserve.status === "approved"
                                                        ? "badge badge-success"
                                                        : "badge badge-error"
                                            }
                                        >
                                            {reserve.status}
                                        </span>
                                    </div>

                                </div>
                                <button onClick={()=>cancelReserve(reserve.id)} className='btn btn-warning w-20 '>Cancel</button>

                            </div>

                        </div>

                    ))}

                </div>

                {myReserve.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-xl text-base-content/60">
                            You have no reservations.
                        </p>
                    </div>
                )}

            </div>

        </div>
    );
};

export default MyReserve;