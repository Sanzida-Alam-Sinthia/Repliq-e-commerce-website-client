import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const AllProducts = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [showModal, setShowModal] = React.useState(false);
    const [createdProducts, setCreatedProduct] = useState('')
    const [sellerProduct, setSellerProduct] = useState(null);
    // const [token] = useToken(createdUserEmail);

    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/products');
            const data = await res.json();
            return data;
        }
    });
    const handleAddProduct = data => {
        const product = {
            name: data.name,
            seller: data.seller,
            price: data.price,
            stock: data.stock,
            img: ''
            // condition: data.condition,
            // description: data.description,
        }
        console.log(product)


        fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                // authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(result => {
                setSellerProduct(product)
                console.log(result);
                toast.success(`${data.name} is added successfully`);

            })
    }
    // const handleNewProduct = (data) => {
    //     console.log(data);
    //     const userInfo = {
    //         prodName: data.name,
    //         seller: data.seller,
    //         price: data.price,
    //         stock: data.stock,
    //         img: ''
    //     }

    //         .then(() => {
    //             saveNewProduct(data.name, data.seller, data.price, data.stock, data.img)
    //         })
    //         .catch(err => console.log(err));



    // }
    // const saveNewProduct = (name, seller, price, stock, img) => {
    //     const product = { name, seller, price, stock, img };
    //     fetch('http://localhost:5000/products', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(product)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             // console.log('save user', data);
    //             setCreatedProduct(name);
    //         })

    // }
    return (
        <div>
            <h2 className="text-2xl text-center bg-gray-50 font-bold mb-10">All Products Details</h2>
            <div className="overflow-x-auto">
                <table className="table w-full text-md text-center text-black dark:text-gray-400">
                    <thead className='text-md mb-2 text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Seller Company</th>
                            <th>Price</th>
                            <th>Present Stock</th>
                            {/* <th>Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td>{product.name}</td>
                                <td>{product.seller}</td>
                                <td>${product.price}</td>
                                <td>{product.stock} pieces</td>


                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
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
                                        <form class="p-5" onSubmit={handleSubmit(handleAddProduct)}>
                                            <div className="form-control w-full max-w-xs">
                                                <label className="label"> <span className="label-text">Product Name</span></label>
                                                <input type="text" {...register("name")} className="input input-bordered w-full max-w-xs" />

                                            </div>
                                            <div className="form-control w-full max-w-xs">
                                                <label className="label"> <span className="label-text">Company</span></label>
                                                <input type="text"
                                                    {...register("seller")}
                                                    className="input input-bordered w-full max-w-xs" />

                                            </div>

                                            <div className="form-control w-full max-w-xs">
                                                <label className="label"> <span className="label-text">Price</span></label>
                                                <input type="text" {...register("price")} className="input input-bordered w-full max-w-xs" />

                                            </div>
                                            <div className="form-control w-full max-w-xs">
                                                <label className="label"> <span className="label-text">Stock</span></label>
                                                <input type="text" {...register("stock")} className="input input-bordered w-full max-w-xs" />

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
    );
};

export default AllProducts;