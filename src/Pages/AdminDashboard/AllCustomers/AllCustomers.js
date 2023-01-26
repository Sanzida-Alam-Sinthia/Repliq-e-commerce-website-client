import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';

const AllCustomers = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json();
            return data;
        }
    });
    const handleMakeAdmin = id => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
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
                                    <>
                                        {/* {
                                        user?.role === 'seller'
                                        <AllSellers><AllSellers></AllSellers>

                                    } */}
                                    </>
                                    {/* <td><button className='text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"'>Delete</button></td> */}
                                </tr>)
                            }

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default AllCustomers;