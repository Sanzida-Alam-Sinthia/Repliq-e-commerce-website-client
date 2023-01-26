import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    return (
        // <div>
        //     <Navbar></Navbar>
        //     <div className="drawer drawer-mobile">
        //         <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        //         <div className="drawer-content">
        //             <Outlet></Outlet>
        //         </div>
        //         <div className="drawer-side bg-base-200 text-base-content ">
        //             <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        //             <ul className="menu p-4 w-80  ">
        //                 {
        //                     isAdmin && <>
        //                         <li><Link to="/dashboard/allusers" className='font-bold text-center text-2xl'>All users</Link></li>
        //                         <li><Link to="/dashboard/allsellers" className='font-bold text-center text-2xl'>All Sellers</Link></li>
        //                         <li><Link to="/dashboard/allbuyers" className='font-bold text-center text-2xl'>All Buyers</Link></li>

        //                     </>
        //                 }


        //                 {/* {
        //                         isBuyer &&
        //                         <li><Link to="/dashboard/myorders" className='font-bold text-center text-2xl'>My Orders</Link></li>
        //                     } */}

        //             </ul>

        //         </div>
        //     </div>
        // </div>

        <div>
            <Navbar></Navbar>
            <div>

                <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 ml-3 mt-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span class="sr-only">Open sidebar</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
                        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>

                <aside id="default-sidebar" class="w-64 fixed left-0 top-0 h-screen transition-transform -translate-x-full sm:translate-x-0 z-40" aria-label="Sidebar">
                    <div class="px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 h-full">
                        <ul class="space-y-2">
                            <li>
                                <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg aria-hidden="true" class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                    <span class="ml-3"> Admin Dashboard</span>
                                </a>
                            </li>


                            <li>
                                <a href="/dashboard/allusers" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                    <span class="flex-1 ml-3 whitespace-nowrap">All Customers</span>
                                </a>
                            </li>
                            <li>
                                <a href="/dashboard/myproduct" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
                                    <span class="flex-1 ml-3 whitespace-nowrap">All Products</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div class="sm:ml-64">
                    <div class="m-4 p-4 ">
                        <Outlet></Outlet>
                    </div>
                </div>

            </div>
        </div>


    );
};

export default DashboardLayout;