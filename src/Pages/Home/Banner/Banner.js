import React from 'react';
import banner from '../../../Assests/Banner.JPG'
const Banner = () => {
    return (
        <div className=' mt-5 '>

            <div class="flex flex-col w-1/2 gap-5 p-3 mx-auto  select-none sm:p-4 sm:h-64 rounded-2xl sm:flex-row ">
                <div class=" sm:h-full sm:w-72 rounded-xl ">
                    <img src={banner} alt="" />
                </div>
                <div class="flex ">
                    <div class="flex flex-col flex-3 gap-4">
                        <div class="w-full font-bold text-4xl text-indigo-800 ">
                            <h2> Welcome To Repliq E-Commerce Site</h2>
                        </div>
                        <div class="w-full font-bold text-indigo-900 ">
                            <h2>Trustable ad Reliable Market place with great user experience</h2>
                        </div>


                    </div>

                </div>
            </div>

        </div>
    );
};

export default Banner;