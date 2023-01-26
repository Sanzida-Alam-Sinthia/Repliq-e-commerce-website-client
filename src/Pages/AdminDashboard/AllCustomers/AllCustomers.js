import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';
import useToken from '../../../hooks/useToken';

const AllCustomers = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext)
    const [showModal, setShowModal] = React.useState(false);
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://repliq-dashboard-server-side.vercel.app/users');
            const data = await res.json();
            return data;
        }
    });
    const handleNewUser = (data) => {
        console.log(data);
        const userInfo = {
            displayName: data.name,
            role: data.role
        }
        updateUser(userInfo)
            .then(() => {
                saveNewUser(data.name, data.email, data.role)
            })
            .catch(err => console.log(err));



    }
    const saveNewUser = (name, email, role) => {
        const user = { name, email, role };
        fetch('https://repliq-dashboard-server-side.vercel.app/users', {
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
    const handleMakeAdmin = id => {
        fetch(`https://repliq-dashboard-server-side.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('admin successfully added')
                    refetch();
                }
            })

    }

    return (
        <div>
            <div>
                <h2 className="text-2xl text-center bg-gray-50 font-bold mb-10">Customers Details</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full text-md text-center text-black dark:text-gray-400">
                        <thead className='text-md mb-2 text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Admin</th>
                                {/* <th>Delete</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, i) => <tr key={user._id}>
                                    <th>{i + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-3 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"'>Make Admin</button>}</td>


                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
                {/* modal for adding new user */}
                <div className='m-12'>
                    <>
                        <button
                            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(true)}
                        >
                            Add A New User
                        </button>
                        {showModal ? (
                            <>
                                <div
                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                >
                                    <div className="relative w-auto my-6 mx-auto max-w-6xl">
                                        {/*content*/}
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            {/*header*/}
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                <h3 className="text-3xl font-semibold">
                                                    Add A New User
                                                </h3>
                                                <button
                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                        ×
                                                    </span>
                                                </button>
                                            </div>
                                            <form class="p-5" onSubmit={handleSubmit(handleNewUser)}>
                                                <div className="form-control w-full max-w-xs">
                                                    <label className="label"> <span className="label-text">Name</span></label>
                                                    <input type="text" {...register("name")} className="input input-bordered w-full max-w-xs" />

                                                </div>
                                                <div className="form-control w-full max-w-xs">
                                                    <label className="label"> <span className="label-text">Email</span></label>
                                                    <input type="text"
                                                        {...register("email", {
                                                            required: "Email Address is required"
                                                        })}
                                                        className="input input-bordered w-full max-w-xs" />
                                                    {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                                                </div>

                                                <div className="form-control w-full max-w-xs pb-7">
                                                    <label className="label"> <span className="label-text">Choose Role</span></label>

                                                    <select name="role" type="text" {...register("role")} className="select select-bordered w-full">
                                                        <option defaultChecked>Admin</option>
                                                        <option>User</option>

                                                    </select>
                                                </div>


                                                <input className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-full' value="Add This User" type="submit" />


                                            </form>
                                            {/*footer*/}
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                <button
                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                        ) : null}
                    </>
                </div>






            </div>


        </div>
    );
};

export default AllCustomers;