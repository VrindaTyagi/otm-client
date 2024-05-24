import React, { useState } from 'react';
import testprogressbar from './components/testprogressbar';

const WakeUp = () => {

    return (

        <div className="h-screen w-screen  bg-black p-2">
            <div>
                <testprogressbar value={value} />
                <input
                    type="range"
                    min="1"
                    max="100"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <div className="relative flex items-center p-4 bg-black text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 10 18" fill="none">
                    <path d="M0 8.70206C0 9.03638 0.127827 9.32153 0.393314 9.57719L8.06293 17.0796C8.26942 17.296 8.54474 17.4041 8.85939 17.4041C9.49853 17.4041 10 16.9125 10 16.2635C10 15.9489 9.87217 15.6637 9.65585 15.4474L2.74336 8.70206L9.65585 1.95674C9.87217 1.73058 10 1.44543 10 1.13078C10 0.491642 9.49853 0 8.85939 0C8.54474 0 8.26942 0.108161 8.06293 0.324484L0.393314 7.82694C0.127827 8.0826 0.00983284 8.36775 0 8.70206Z" fill="#7E87EF" />
                </svg>

                <div className="w-full flex flex-col justify-center items-center text-center">
                    <span className="text-lightGray font-sfpro text-sm font-medium ">   <img src="/assets/small_sun.svg" alt="" /> </span>
                    <span className="text-custompurple font-sfpro text-lg block mt-1">8 AM</span>

                </div>
            </div>

            <div className="flex ">

                <h1 className="text-2xl leading-normal text-white font-sfpro font-medium capitalize p-1">🛏️ Wake Up Routine</h1>

            </div>

            <div className="w-auto p-6 ">

                <div className="mb-6">
                    <div className="">
                        <div className='bg-mediumGray rounded-xl'>
                            <div className="p-4 pb-1 rounded-md flex items-center space-x-2">
                                <h3 className="text-xl text-custompurple font-sfpro ">Go In Sunlight</h3>
                                <p className="text-customGray text-sm font-sfpro">8-10 Mins</p>
                            </div>
                            <div className="p-4 rounded-md ">
                                <div className='flex items-center space-x-2'>
                                    <h3 className="text-xl text-custompurple font-sfpro">Do Boxed Breathing</h3>
                                    <p className="text-customGray text-sm font-sfpro">5 Mins</p>
                                </div>
                                <p className="text-lightGray text-sm font-sfpro">Details of the breathing</p>
                                <p className="text-lightGray text-sm font-sfpro">Links to resource</p>
                            </div>
                            <div className=" p-4 rounded-md">
                                <h3 className="text-xl text-custompurple font-sfpro">Water Your Face</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-6">
                    <h3 className="text-xl text-white font-sfpro mb-2 leading-8">Reflect</h3>
                    <div className='bg-mediumGray rounded-xl p-2'>


                        <p className="text-lightGray mb-2 text-sm">
                            How did you feel performing this habit today?
                            <br />
                            Any insights you’d like to note?
                        </p>
                        <textarea
                            className="w-full p-2 bg-black rounded-xl text-mediumGray font-sfpro"
                            placeholder="Type your answer here..."
                        />
                    </div>

                </div>
                <div className="mb-6">
                    <h3 className="text-lg mb-2 pb-4 leading-8 font-sfpro">Feeling Check-In</h3>
                    <div className="flex justify-between">
                        {['😡', '😟', '😐', '😊', '😍'].map((emoji, index) => (
                            <button
                                key={index}
                                onClick={() => setFeeling(index)}
                                className={`p-2 rounded-full ${feeling === index ? 'bg-green-600' : 'bg-gray-800'
                                    }`}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>
                <button className="w-full p-2 leading-8 bg-custompurple text-black rounded-xl">Mark as Done</button>
            </div>

        </div>


    );
};

export default WakeUp;
