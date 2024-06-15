import React from "react";
import Link from "next/link";

const Card = ({
    bgImage,
    bgImageAltText,
    title,
    children
}) => {
    return (
        <div
            className="scale-group-leader w-auto relative m-2 aspect-[3/2] 
                          h-[34vh]">
            {/*background div */}
            <div
                className="top-[-10px] left-[-10px] scale-group-leader w-auto relative rounded-2xl m-2 aspect-[3/2] 
                          h-[34vh]
                          shadow-xl bg-white/0 ring-1 ring-black/5
                          backdrop-blur-lg
                          
                          "></div>
            <div className="absolute top-0 right-0 bottom-0 left-0 p-4 z-[1] font-IBM-Plex-Sans">
                <h5
                    className="text-shadow-asthetic text-white font-bold m-0 italic text-xl transition-all duration-[0.2s] ease-in delay-[0.05s] w-max
            scale-group">
                    {title}
                </h5>
                <div className="absolute flex flex-col items-center h-[74%] w-[91%]">
                    {" "}
                    {/*overlay */}
                    <div
                        className="text-shadow-helpful 
                          text-white 
                          overflow-y-hidden 
                          text-ellipsis
                          h-[52%] w-[91%] aspect-[3/2]  mb-[0.7rem] mt-[1rem] scale-group pb-[16vh]">
                        {children}
                    </div>
                    <Link href="/coding/registration" className="w-[29%] block sm:hidden md:block">
                        <button className="bg-pink-500 p-2 rounded-md hover:bg-pink-600 duration-200 text-white font-semibold">
                            <span>Sign up</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};