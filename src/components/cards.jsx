import React from "react";
import Link from "next/link";

import Image from "next/image";

let counter = 0;

const makeTechList = (array) => {
    let toR;
}

/**
 * 
 * ISSUE: Fix border box stuff
 * 
 * Version3 of the card, with:
 *  - image
 *  - title of project
 *  - designation name
 *  - icons of technologies
 *  - short description.
 * 
 * @param {*} param0 
 * @returns 
 */
const Card = ({
    image,
    title,
    dn,
    tech

}) => {
    counter++;

    console.log(tech);

    return (
        <div
            className="w-auto relative m-2 aspect-[301.92/306.06] 
                          h-[34vh] overflow-hidden rounded 
                          shadow-[10px_10px_0px_#3E3D3D]">
            <img className="h-full w-full filter brightness-50 " src={image.src} alt={image.alt ? image.alt : ("project" + counter)} />
            <div className="text-white [text-shadow:_2px_2px_0px_#000000] absolute top-0 right-0 bottom-0 left-0 p-4 z-[1] flex items-center justify-center flex-col">
                {/* Title of project */}
                <h2
                    className="text-white font-bold m-0 
                                text-[1.7rem] w-max">
                    {title}
                </h2>
                {/* designation name []*/}
                <h3 className="pt-[0.25rem] text-[0.76rem] italic">
                    {("\"" + dn + "\"")}
                </h3>
            </div>
            {/* div for absolute stuff */}
            <div className="absolute h-full w-full z-[0] top-[0] flex justify-center">
                {/* div for tech icons []*/}
                <div className="absolute flex justify-center flex-col bottom-[1vh]">
                    <h4 className="italic text-center text-white text-[0.9rem]">Made with</h4>
                    <div className="flex jusify-center h-max">
                        {
                            tech.map((element) => {
                                console.log(element);
                                let j;
                                switch (element) {
                                    case "css":
                                        j = "css-3";
                                        break;
                                    case "html":
                                        j = "html-5";
                                        break;
                                    case "js":
                                        j = "js";
                                        break
                                    default:
                                        return (
                                            <div></div>
                                        );
                                }
                                return (
                                    <Image
                                        priority
                                        src={"/icons/" + j + ".svg"}
                                        height={32}
                                        width={32}
                                        alt={j}
                                    />
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Card;