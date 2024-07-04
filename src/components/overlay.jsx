import React, { forwardRef, useState } from "react";
import data from "../app/TestMe.json"
// import "../app/globals.css"


/*
    Overhaul the overlay idea from Spot Iffy.
*/

let v = false;

const Overlay = ({
    hc
}) => {
    let [topBarStr, topBarModifier] = useState();

    return (
        <div className="overlay">
            <div className="overlayContainer">
                {/* top bar thing for inner overlay*/}
                <div className="bg-main text-center text-white italic h-[1.2rem] text-[0.8rem]">
                    {topBarStr ? (`"${topBarStr}"`) : "click outside to close"}
                </div>
                <div class="innerOverlay">
                    <OverlayContent p={hc} mod={topBarModifier}/>
                </div>
            </div>
        </div>
    )
}

const activateOverlay = () => {
    console.log("activating!");
}

function OverlayContent(props) {
    if (!props.p) {
        return;
    }
    let i = 0;
    while (i < data.length && (data[i].name != props.p)) {
        i++;
    }
    try{
        return (
            <>
                <div>
                    {/* header */}
                    <div>
                        <h1>{data[i].name}</h1>
                        <h2>
                            {(data[i].date.singleDate ? data[i].date.singleDate : (`${data[i].date.begin} - ${data[i].date.end}`))}
                        </h2>
                    </div>
                    <div>
    
                    </div>
                </div>
                {/* <div>
                    {
                        data[i].misc.forEach((obj) => {
                            return handleBadges(obj);
                        })
                    }
                </div> */}
            </>
        )
    }
    catch(TypeError){
        return(
            <h1 className="text-center text-[1.5rem] m-auto">
                A problem has occured (and please tell me how)!<br/>
                <span className="text-[1.25rem] italic">(contact me @ via email)</span>    
            </h1>
        )
    }
    props.mod(data[i].dn)
    
}

function handleBadges() {
    let _ = {
        icon: "link",

    }

    switch (obj.type) {
        case "site":

        case "video":


    }
    return
}

export { Overlay, activateOverlay };