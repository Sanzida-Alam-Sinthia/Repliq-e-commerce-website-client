import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err))

    }
    return (
        <div>

            <div>
                <nav class="bg-indigo-200 dark:bg-gray-800  shadow ">
                    <div class="px-8 mx-auto max-w-7xl">
                        <div class="flex items-center justify-between h-16">
                            <div class=" flex items-center">
                                <a class="flex-shrink-0 font-bold" href="/">
                                    REPLIQ
                                </a>
                                <div class="hidden md:block">
                                    <div class="flex items-baseline ml-10 space-x-4">
                                        <a class="text-black hover:text-indigo-700 dark:hover:text-white px-3 py-2 rounded-md text-md font-bold" href="/">
                                            Home
                                        </a>

                                        <a class="text-black hover:text-indigo-700 dark:hover:text-white px-3 py-2 rounded-md text-md font-bold" href="/dashboard">
                                            Admin Dashboard
                                        </a>
                                        <a class="text-black hover:text-indigo-700 dark:hover:text-white px-3 py-2 rounded-md text-md font-bold " href="/#">
                                            Contact
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="block">

                                <div class="flex items-center ml-4 md:ml-6">
                                    {
                                        user?.uid ?
                                            <>
                                                <button class="p-1 text-black text-md hover:text-indigo-700 rounded-full focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 font-bold focus:ring-white" onClick={handleLogOut} to="/login">Log Out</button>

                                            </>
                                            :
                                            <a class="p-1 text-black text-md hover:text-indigo-700 rounded-full focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 font-bold focus:ring-white" href='/login'>
                                                Login
                                            </a>
                                    }

                                    <div class="relative ml-3">
                                        <div class="relative inline-block text-left">
                                            <div>
                                                <button type="button" class="  flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-bold text-black text-md hover:text-indigo-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500" id="options-menu">
                                                    View Cart
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex -mr-2 md:hidden">
                                {/* <button class="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                                    <svg width="20" height="20" fill="currentColor" class="w-8 h-8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                                        </path>
                                    </svg>
                                </button> */}
                            </div>
                        </div>
                    </div>
                    <div class="md:hidden">
                        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a class="text-black hover:text-indigo-700 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                                Home
                            </a>

                            <a class="text-black hover:text-indigo-700 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                                Content
                            </a>
                            <a class="text-black hover:text-indigo-700 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                                Contact
                            </a>
                        </div>
                    </div>
                </nav>
            </div>

        </div>
    );
};

export default Navbar;