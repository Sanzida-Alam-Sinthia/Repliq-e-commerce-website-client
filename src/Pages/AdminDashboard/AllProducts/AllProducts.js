import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllProducts = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json();
            return data;
        }
    });

    return (
        <div>
            <h2>this is all products</h2>
        </div>
    );
};

export default AllProducts;