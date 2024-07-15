import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import data from "../app/TestMe.json"
import { ReturnFileName } from "./cards";
import Image from "next/image";

/*
    Overhaul the overlay idea from Spot Iffy.
*/

let v = false;

let test;

const Overlay = forwardRef(
    ({ hc }, ref) => {
    // [][][][][]  \/
    const refTest = useRef(null);

    useImperativeHandle(ref, ()=> {
        return{
            overlayOn: () =>{
                refTest.current.style.display = "block"
            }
        }
    }, []);

    if (!hc) {
        return;
    }
    let i = 0;
    while (i < data.length && (data[i].name != hc)) {
        i++;
    }

    let [blah, updateBlah] = useState(
        data[i].dn ? () => {
            setTimeout(() => {
                //do some fancy animation thing in css
                updateBlah("click outside to close");
                //leave this up for a sec.
            }, 5000)
            return `"${data[i].dn}"`
        } : "click outside to close"
    );



    return (
        <div className="overlay"
            ref={refTest}
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    refTest.current.style.display = "none";
                }
            }}>
            <div className="overlayContainer">
                {/* top bar thing for inner overlay*/}
                <div className="bg-main text-center text-white italic h-[1.2rem] text-[0.8rem]">
                    {blah}
                </div>
                <div className="innerOverlay w-[100vw] xl:w-[70vw]">
                    <OverlayContent index={i} />
                </div>
                {/* bottom bar thing */}
                <OverlayBottom index={i} />
            </div>
        </div>
    )
})

function OverlayContent(props) {
    try {
        return (
            <>
                <div className="w-full flex">
                    <div className="w-1/2">
                        {/* header */}
                        <div className="font-[Lato]">
                            <h1 className="text-[3.5rem] italic">{data[props.index].name}</h1>
                            <h2 className="text-[1.2rem] mt-[-1.1rem] font-semibold" /*ref={refTest}*/>
                                {(data[props.index].date.singleDate ? data[props.index].date.singleDate : (`${data[props.index].date.begin} - ${data[props.index].date.end}`))}
                            </h2>
                        </div>
                        <div className="text-[1.4rem] 2xl:text-[1.8rem]">
                            <h3 className="italic font-semibold font-[Ubuntu] pb-[0.5rem]">
                                {`(${data[props.index].desc.caption})`}
                            </h3>
                            <p className="font-medium leading-9 h-[28vh] overflow-y-auto">
                                {data[props.index].desc.paragraph}
                            </p>
                        </div>
                    </div>
                    <div className="w-1/2">
                        {/* card thingy */}
                        <div className="flex flex-col items-end">
                            <h3 className="text-[1.3rem] font-bold italic font-[Ubuntu] w-auto items-end">
                                Made With
                            </h3>
                            <div className="flex jusify-center h-max">
                                {
                                    data[props.index].tech.map((element, key) => {
                                        let r = ReturnFileName(element);
                                        if (r === "") {
                                            return (
                                                <div></div>
                                            );
                                        }
                                        else {
                                            key;
                                            return (
                                                <img
                                                    src={"/icons/" + r + ".svg"}
                                                    alt={r}
                                                    key={key}
                                                    className="pl-[4px] h-[3rem]"
                                                />
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                        <div className="flex items-end flex-col pt-[2rem]">
                            <img
                                // priority
                                src={data[props.index].image.src}
                                // width={32}
                                // height={32}
                                alt="shjsad"
                                className="h-[30vh]"
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
    catch (TypeError) {
        console.log(TypeError)
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

    if(!data[props.index].misc){
        return;
    }

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
        <div className="bg-[var(--overlay-highlight)] text-white pl-6 pr-6 flex h-[1.8rem] z-[10] relative">
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

export default Overlay;