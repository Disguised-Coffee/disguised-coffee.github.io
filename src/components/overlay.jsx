import React, { forwardRef, useState } from "react";
import data from "../app/TestMe.json"


/*
    A function activates the overlay by changing part of the CSS

    have a useState variable in the Overlay that can be updated by the activateOverlay function

*/

let v = false;

const Overlay = ({
    hc
}) => {

    return (    
        <div style={{height:"1000px", paddingTop:"10vh"}}>
            <OverlayContent p={hc}/>
        </div>
    )
}

const activateOverlay = ()=>{
    v = !v;
    console.log(v);
}

function OverlayContent(p){
    let i = 0;
    console.log(p)
    while(i < data.length && (data[i].name != p)){
        i++;
    }
    console.log(data[i])
    return(
        data[i]
    )
}

export {Overlay, activateOverlay};