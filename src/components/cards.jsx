import React from "react";
import Image from "next/image";
import GLOBALSFORMRWORLDWIDE from "@/app/const" ;

let counter = 0;

function ReturnFileName(element) {
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
        case "java":
            j = "java";
            break
        case "node":
            j = "nodejs";
            break;
        case "figma":
            j = "figma";
            break;
        case "python":
            j = "python";
            break
        case "react":
            j = "react";
            break
        case "vite":
            j = "vite";
            break
        case "github":
            j = "github";
            break
        case "phaser":
            return "phaser3.png";
        case "particle":
            return "particle.png"
        default:
            return (element + ".svg");
    }
    return (j + ".svg")
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


const Card = 

({
    image,
    title,
    dn,
    tech,
    us,
    passRef
}) => {
    counter++;

    let testFunc = (title) =>{
        us(title)
        passRef.current.overlayOn();
    }
    
    let DesignationName = ()=>{
        if(dn){
            return(
                <h3 className="pt-[0.25rem] text-[0.76rem] italic">
                        {("\"" + dn + "\"")}
                </h3>
            )
        }
        else{
            return;
        }
    }

    return (
        <div className="w-auto relative m-2 aspect-[301.92/306.06] 
                          h-[34vh] overflow-hidden rounded 
                          shadow-[10px_10px_0px_#3E3D3D]" onClick={() =>{ testFunc(title)}}>
            {image ? <img className="object-cover h-full w-full filter brightness-50 blur-[1px]" src={(image ? GLOBALSFORMRWORLDWIDE.cardSRC + image.src : "" )} alt={image.alt ? image.alt : ("project" + counter)} /> 
                : <div className="object-cover h-full w-full bg-topBar shadow-inner"></div>
                    
                    }
            <div className="text-white [text-shadow:_2px_2px_0px_#000000] absolute top-0 right-0 bottom-0 left-0 p-4 z-[1] flex items-center justify-center flex-col">
                {/* Title of project */}
                <h2
                    className={`text-white font-bold m-0 
                                text-[1.7rem] w-[100%] text-center ${(title == "OPPA STOPPA") ? "oppaStoppa" : ""}`}>
                    {title}
                </h2>
                {/* designation name []*/}
                <DesignationName/>

            </div>
            {/* div for absolute stuff */}
            <div className="absolute h-full w-full z-[0] top-[0] flex justify-center">
                {/* div for tech icons []*/}
                <div className="absolute flex justify-center flex-col bottom-[1vh]">
                    <h4 className="italic text-center text-white text-[0.9rem]">Made with</h4>
                    <div className="flex jusify-center h-max">
                        {
                            tech.map((element,key) => {
                                let r =  ReturnFileName(element);
                                if (r === "") {
                                    return;
                                }
                                else {
                                    return (
                                        <Image
                                            priority
                                            src={"/icons/" + r}
                                            height={32}
                                            width={32}
                                            alt={r}
                                            key={key}
                                        />
                                    )
                                }
                            })
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export {Card, ReturnFileName};