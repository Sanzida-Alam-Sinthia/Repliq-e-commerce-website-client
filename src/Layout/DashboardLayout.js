import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    return (
        <div>
            <div>
                {/* <Navbar></Navbar> */}
                <div className="drawer drawer-mobile">
                    <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <Outlet></Outlet>
                    </div>
                    <div className="drawer-side bg-base-200 text-base-content ">
                        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80  ">
                            {
                                isAdmin && <>
                                    <li><Link to="/dashboard/allusers" className='font-bold text-center text-2xl'>All users</Link></li>
                                    <li><Link to="/dashboard/allsellers" className='font-bold text-center text-2xl'>All Sellers</Link></li>
                                    <li><Link to="/dashboard/allbuyers" className='font-bold text-center text-2xl'>All Buyers</Link></li>

                                </>
                            }


                            {/* {
                                isBuyer &&
                                <li><Link to="/dashboard/myorders" className='font-bold text-center text-2xl'>My Orders</Link></li>
                            } */}

                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;