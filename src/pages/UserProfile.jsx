import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { baseUrl } from '../services/BaseUrl';
import toast from 'react-hot-toast';

const UserProfile = () => {

    const { authUser, accessToken } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [id, setUserID] = useState("");

    const [loading, setLoading] = useState(false);


    // Set current user information
    useEffect(() => {

        if (authUser) {
            setEmail(authUser.email || "");
            setUsername(authUser.username || "");
            setFirstname(authUser.firstname || "");
            setLastname(authUser.lastname || "");
            setUserID(authUser.id || "");
        }

    }, [authUser]);


    // Update user
    const handleUpdate = async (e) => {

        e.preventDefault();

        const userData = {
            email,
            username,
            firstname,
            lastname,
            phone_number: phoneNumber
        };
        console.log(userData);

       

            const res = await fetch(`${baseUrl}/edituser`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(userData)
            });

            const data = await res.json();
            console.log(data);
            toast.success(data.message );

            

        
    };


    return (
        <div className="min-h-screen bg-base-200 py-10 px-4">

            <div className="max-w-3xl mx-auto">

                <div className="card bg-base-100 shadow-xl">

                    <div className="card-body">

                        {/* Header */}
                        <div className="mb-4">

                            <h1 className="text-3xl font-bold">
                                My Profile
                            </h1>

                            <p className="text-base-content/60 mt-1">
                                Update your personal information
                            </p>

                        </div>


                        <div className="divider"></div>


                        {/* Profile Form */}
                        <form onSubmit={handleUpdate}>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                                {/* First Name */}
                                <div>

                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            First Name
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        value={firstname}
                                        onChange={(e) =>
                                            setFirstname(e.target.value)
                                        }
                                        placeholder="Enter first name"
                                        className="input input-bordered w-full"
                                    />

                                </div>


                                {/* Last Name */}
                                <div>

                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Last Name
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        value={lastname}
                                        onChange={(e) =>
                                            setLastname(e.target.value)
                                        }
                                        placeholder="Enter last name"
                                        className="input input-bordered w-full"
                                    />

                                </div>


                                {/* Username */}
                                <div>

                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Username
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        placeholder="Enter username"
                                        className="input input-bordered w-full"
                                    />

                                </div>


                                {/* Email */}
                                <div>

                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Email
                                        </span>
                                    </label>

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Enter email"
                                        className="input input-bordered w-full"
                                    />

                                </div>


                                {/* Phone Number */}
                                <div className="md:col-span-2">

                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            ID
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        value={id}
                                        onChange={(e) =>
                                            setUserID(e.target.value)
                                        }
                                        placeholder="Enter phone number"
                                        className="input input-bordered w-full"
                                    />

                                </div>

                            </div>


                            <div className="divider"></div>


                            {/* Update Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary w-full rounded-xl"
                            >

                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Updating...
                                    </>
                                ) : (
                                    "Update Profile"
                                )}

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default UserProfile;