import React, { useContext, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { baseUrl } from '../services/BaseUrl';
import { AuthContext } from '../context/AuthProvider';
import toast from 'react-hot-toast';



const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const{authUser,setAuthUser}=useContext(AuthContext)
    const navigate=useNavigate()
    

    const handleLogin=async()=>{
        try {
            const formData=new URLSearchParams()
            formData.append('username', username);
            formData.append('password',password);

            const res=await fetch(`${baseUrl}/login`,{
                method:"POST",
                headers:{"Content-Type":'application/x-www-form-urlencoded'},
                body:formData
            })

            const data=await res.json()
            console.log(data);
            const accessToken=data?.access_token
            localStorage.setItem("lm_token",accessToken)

            const userRes=await fetch(`${baseUrl}/user`,{
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            })

            const userData=await userRes.json()

            console.log(userData);

            if(userData.id){
                setAuthUser(userData)
                 navigate('/')
               
            }else{
                toast.error('Username or password incorrect')
                return
            }

            
                

        } catch (error) {
            console.log(error);
        }
    }

    console.log(authUser);
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6 w-96">
                        Please Enter Your Credential
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Username</label>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="input" placeholder="username" />
                            <label className="label">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="input" placeholder="Password" />
                            <div><Link to={'/signup'} className="link link-hover">Don't have an account?</Link></div>
                            <button onClick={handleLogin} className="btn btn-neutral mt-4">Login</button>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;