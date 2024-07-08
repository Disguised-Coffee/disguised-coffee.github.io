import React, { forwardRef, useState } from "react";
import data from "../app/TestMe.json"
import Link from "next/link";


/*
    Overhaul the overlay idea from Spot Iffy.
*/

let v = false;

const Overlay = ({
    hc
}) => {
    if (!hc) {
        return;
    }
    let i = 0;
    while (i < data.length && (data[i].name != hc)) {
        i++;
    }

    return (
        <div className="overlay">
            <div className="overlayContainer">
                {/* top bar thing for inner overlay*/}
                <div className="bg-main text-center text-white italic h-[1.2rem] text-[0.8rem]">
                    {data[i].dn ? (`"${data[i].dn}"`) : "click outside to close"}
                </div>
                <div className="innerOverlay w-[100vw] xl:w-[70vw]">
                    <OverlayContent index={i} />
                </div>
                {/* bottom bar thing */}
                <OverlayBottom index={i} />
            </div>
        </div>
    )
}

const activateOverlay = () => {
    console.log("activating!");
}

function OverlayContent(props) {
    try {
        return (
            <>
                <div className="w-full flex">
                    <div className="w-1/2">
                        {/* header */}
                        <div className="font-[Lato]">
                            <h1 className="text-[3.5rem] italic">{data[props.index].name}</h1>
                            <h2 className="text-[1.2rem] mt-[-1.1rem] font-semibold">
                                {(data[props.index].date.singleDate ? data[props.index].date.singleDate : (`${data[props.index].date.begin} - ${data[props.index].date.end}`))}
                            </h2>
                        </div>
                        <div className=" text-[1.8rem]">
                            <h3 className="italic font-semibold font-[Ubuntu] pb-[0.5rem]">
                                {`(${data[props.index].desc.caption})`}
                            </h3>
                            <p className="font-medium leading-9">
                                {data[props.index].desc.paragraph}
                            </p>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="flex justify-end">
                            BLAH
                        </div>
                    </div>
                </div>
            </>
        )
    }
    catch (TypeError) {
        return (
            <h1 className="text-center text-[1.5rem] m-auto">
                A problem has occured (and please tell me how)!<br />
                <span className="text-[1.25rem] italic">(contact me @ via email)</span>
            </h1>
        )
    }
}
/**
 * 
 * @param {*} (props) index: index of the data json array to pull from
 * @returns 
 */
function OverlayBottom(props) {
    let a = [];

    data[props.index].misc.forEach((blah, num) => {
        a.push(
            <div className="flex mr-4 items-center" key={num}>
                <img src={"icons/web/" + handleBadges(blah) + ".svg"} className="w-[1.6rem] filter invert mr-[0.2rem]" />
                <a href={blah.src} className="font-[Ubuntu] text-[var(--link-color)] underline italic text-[1.2rem]">
                    {blah.display ? blah.display : "bruh"}
                </a>
            </div>
        )
    });
    return (
        <div className="bg-[var(--overlay-highlight)] text-white pl-6 pr-6 flex h-[1.8rem]">
            {a}
        </div>
    )
}


/**
 * 
 * @returns obj with proper info for 
 */
function handleBadges(obj) {
    switch (obj.type) {
        case "site":
            return "el"

        case "video":
            return "yt"
    }
    return "no"
}

export { Overlay, activateOverlay };