import React, { useContext, useState } from 'react';
import { baseUrl } from '../services/BaseUrl';
import { AuthContext } from '../context/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';


const ChangePassword = () => {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const{accessToken}=useContext(AuthContext)
    const navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const passwordData={
            
            current_password:currentPassword,
            new_password:newPassword
        }
        const res=await fetch(`${baseUrl}/passwordchange`,{
            method:"PUT",
            headers:{
                Authorization:`Bearer ${accessToken}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(passwordData)
        }
        )
        const data=await res.json()
        toast.success(data.message)
        // navigate('/login')
        
    };
    

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4">

            <div className="max-w-xl mx-auto">

                <div className="card bg-base-100 shadow-xl">

                    <div className="card-body">

                        <h1 className="text-3xl font-bold">
                            Change Password
                        </h1>

                        <p className="text-base-content/60">
                            Update your account password
                        </p>

                        <div className="divider"></div>

                        <form onSubmit={handleSubmit}>

                            {/* Current Password */}
                            <div className="mb-5">

                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Current Password
                                    </span>
                                </label>

                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) =>
                                        setCurrentPassword(e.target.value)
                                    }
                                    placeholder="Enter current password"
                                    className="input input-bordered w-full"
                                />

                            </div>


                            {/* New Password */}
                            <div className="mb-6">

                                <label className="label">
                                    <span className="label-text font-semibold">
                                        New Password
                                    </span>
                                </label>

                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    placeholder="Enter new password"
                                    className="input input-bordered w-full"
                                />

                            </div>


                            {/* Button */}
                            <button
                                type="submit"
                                className="btn btn-primary w-full rounded-xl"
                            >
                                Change Password
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ChangePassword;