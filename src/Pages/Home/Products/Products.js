import React, { useEffect, useState } from 'react';
import Product from './Product';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())

            .then(data => setProducts(data))
    }, [])

    return (
        <div className='justify-center'>
            <div className='items-center text-center mb-10'>

                <h2 className=" items-center text-center text-4xl font-bold mb-10 text-black"> Our Popular Products</h2>
                <p className='text-lg text-indigo-900 font-semibold'> Here are some of our popular products: </p>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:m-12 p-10'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                    >
                    </Product>)
                }
            </div>

        </div>

    );
};

export default Products;