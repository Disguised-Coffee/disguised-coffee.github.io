import React from "react";

let counter = 0;

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
    us,
    icons,
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
                <h3 className="pt-[0.25rem] italic
                                text-[0.76rem]">
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
                          h-[21vh] sm:h-[34vh] 
                          overflow-hidden rounded 
                          shadow-[10px_10px_0px_#3E3D3D] m-4
                          hover:scale-[105%] group ease-in-out duration-300 cursor-pointer" onClick={() =>{ testFunc(title)}}>
            {image ? (
                <img className="object-cover h-full w-full filter brightness-50 blur-[1px]" 
                    src={image.url} 
                    alt={image.alt ? image.alt : ("project" + counter)} />
            ) : (
                <div className="object-cover h-full w-full bg-topBar shadow-inner"></div>
            )}
            <div className="text-white [text-shadow:_2px_2px_0px_#000000] absolute top-0 right-0 bottom-0 left-0 p-4 z-[1] flex items-center justify-center flex-col">
                {/* Title of project */}
                <h2
                    className={`text-white font-bold m-0 leading-[2rem] 
                                text-[1rem] sm:text-[1.5rem]
                                leading-4 sm:leading-none
                                w-[100%] text-center ${(title == "OPPA STOPPA") ? "oppaStoppa" : ""}`}>
                    {title}
                </h2>
                {/* designation name []*/}
                <DesignationName/>

            </div>
            {/* div for absolute stuff */}
            <div className="absolute h-full w-full z-[0] top-[0] flex justify-center">
                {/* div for tech icons []*/}
                <div className="absolute hidden sm:flex justify-center flex-col bottom-[1vh] opacity-0 group-hover:opacity-100 ease-in-out duration-300">
                    {/* if icons exist, create the div below and array of icons */}
                    { icons ? (
                        <>
                            <h4 className="italic text-center text-white text-[0.9rem]">Made with</h4>
                            <div className="flex justify-center h-max">
                                {icons.map((icon, index) => (
                                    <img
                                        key={index}
                                        src={icon.url}
                                        alt={icon.name}
                                        className="pr-[3px] h-[32px] w-[32px]"
                                    />
                                ))}
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export {Card};