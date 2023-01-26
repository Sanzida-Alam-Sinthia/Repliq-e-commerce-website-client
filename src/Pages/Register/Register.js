import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext)
    const [signUpError, setSignUPError] = useState('')
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    // const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();
    // if (token) {
    //     navigate('/');
    // }

    const handleSignUp = (data) => {
        console.log(data);
        setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast('User Created Successfully.')
                const userInfo = {
                    displayName: data.name,
                    role: data.role
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, data.role)
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
            });

    }

    const saveUser = (name, email, role) => {
        const user = { name, email, role };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                // console.log('save user', data);
                setCreatedUserEmail(email);
            })

    }
    return (
        // <div className='md:flex md:justify-center m-10'>
        //     <div class="flex flex-col w-full max-w-md mt-10 mb-10 px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        //         <div class="self-center mb-6 text-xl font-bold text-gray-600 sm:text-2xl dark:text-white">
        //             Create New Account
        //         </div>
        //         <div class="mt-8">
        //             <form action="#" autoComplete="off">
        //                 <div class="flex flex-col mb-2">
        //                     <div class="flex relative ">
        //                         <input type="text" id="name" class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your name" />
        //                     </div>
        //                 </div>
        //                 <div class="flex flex-col mb-2">
        //                     <div class="flex relative ">
        //                         <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
        //                             <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
        //                                 <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
        //                                 </path>
        //                             </svg>
        //                         </span>
        //                         <input type="text" id="sign-in-email" class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your email" />
        //                     </div>
        //                 </div>
        //                 <div class="flex flex-col mb-6">
        //                     <div class="flex relative ">
        //                         <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
        //                             <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
        //                                 <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
        //                                 </path>
        //                             </svg>
        //                         </span>
        //                         <input type="password" id="sign-in-email" class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your password" />
        //                     </div>
        //                 </div>
        //                 <div class="flex items-center mb-6 -mt-4">
        //                     <div class="flex ml-auto">
        //                         <a href="#" class="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white">
        //                             Forgot Your Password?
        //                         </a>
        //                     </div>
        //                 </div>
        //                 <div class="flex w-full">
        //                     <button type="submit" class="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
        //                         Register
        //                     </button>
        //                 </div>
        //             </form>
        //         </div>
        //         <div class="flex items-center justify-center mt-6">
        //             <a href="#" target="_blank" class="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white">
        //                 <span class="ml-2 font-semibold text-indigo-900">
        //                     <h2> Already have an account?  <Link to='/login' className='text-red-600 font-bold'>Login</Link></h2>
        //                 </span>
        //             </a>
        //         </div>
        //     </div>

        // </div>
        <div className='md:flex md:justify-center m-10'>
            <div class="flex flex-col w-full max-w-md mt-10 mb-10 px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <h2 class="self-center mb-6 text-xl font-bold text-gray-600 sm:text-2xl dark:text-white">Create New Account</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div class="form-control flex flex-col mb-6  w-full max-w-xs">
                        <div class="flex relative ">


                            <input type="text" {...register("name")} class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your name" />
                        </div>
                    </div>
                    <div className="form-control flex flex-col mb-6  w-full max-w-xs">
                        <div className='flex relative'>
                            <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                                    </path>
                                </svg>
                            </span>


                            <input type="text"
                                {...register("email", {
                                    required: "Email Address is required"
                                })}
                                className="input input-bordered w-full max-w-xs rounded-r-lg flex-1 appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your email" />
                            {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                        </div>
                    </div>
                    <div className="form-control flex flex-col mb-6  w-full max-w-xs">
                        <div className='flex relative'>
                            <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                    </path>
                                </svg>
                            </span>

                            <input type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                                })}
                                className="input input-bordered w-full max-w-xs rounded-r-lg flex-1 appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your Password" />

                            <br />
                            {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        </div>
                    </div>
                    <div class="form-control flex flex-col mb-6  w-full max-w-xs">
                        <div class="flex relative ">
                            <label className="label"> <span className="label-text mr-2">Choose a Role :   </span></label>
                            <select name="role" type="text" {...register("role")} className="select select-bordered  flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                                <option defaultChecked>Admin</option>
                                <option>User</option>

                            </select>

                        </div>
                    </div>
                    <input className='btn btn-accent w-full py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ' value="Register" type="submit" />
                    <div>
                        {signUpError && <p className='text-red-600'>{signUpError}</p>}
                    </div>
                    {/* <div className="form-control flex flex-col mb-6  w-full max-w-xs">
                        <label className="label"> <span className="label-text">Choose Role</span></label>

                        <select name="role" type="text" {...register("role")} className="select select-bordered w-full">
                            <option defaultChecked>Admin</option>
                            <option>User</option>

                        </select>
                    </div> */}

                </form>
                <div class="flex items-center justify-center mt-6">
                    <a href="#" target="_blank" class="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white">
                        <span class="ml-2 font-semibold text-lg text-indigo-900">
                            <h2> Already have an account?  <Link to='/login' className='text-red-600 font-bold'>Login</Link></h2>
                        </span>
                    </a>
                </div>

            </div>
        </div>
    );
};

export default Register;