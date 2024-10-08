import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import data from "../app/cardData.json"
import { ReturnFileName } from "./cards";
import GLOBALSFORMRWORLDWIDE from "@/app/const";
import infoJson from "../app/info.json"

/*
    Overhaul the overlay idea from Spot Iffy.
*/

let v = false;

let test = "this is a test";

const Overlay = forwardRef(
    ({ hc }, ref) => {
        // [][][][][]  \/
        const overlayRef = useRef(null);

        const innerlayRef = useRef(null);


        function offOverlay() {
            innerlayRef.current.classList.remove("overlayAniOn");
            innerlayRef.current.classList.add("overlayAniOff");
            overlayRef.current.classList.add("outterOverlayOff");
        }

        function onOverlay() {
            overlayRef.current.style.display = "block";
            innerlayRef.current.classList.remove("overlayAniOff");
            overlayRef.current.classList.remove("outterOverlayOff");
            innerlayRef.current.classList.add("overlayAniOn");

            //fixes speedup css glitch
            setTimeout(()=>{
                innerlayRef.current.classList.remove("overlayAniOn");
            },700)
        }

        // necessary for deployment
        if (typeof window === 'object') {
            document.addEventListener('keydown', (e) => {
                // console.log(e.key);
                if (e.key == "Escape") {
                    offOverlay();
                }
                else if (e.key == "1") {
                    onOverlay();
                }
            })
        }

        useImperativeHandle(ref, () => {
            return {
                overlayOn: () => {
                    //turn off overlay
                    onOverlay();
                },
                overlayOff: () => {
                    //turn off overlay
                    offOverlay();
                }
            }
        }, []);

        let i;

        //if nothing.
        if (!hc) {
            return;
        }
        // exception for the about me page:
        else if (hc === "about" || hc ==="contacts") {
            i = null;
        }
        else {
            i = 0;
            //search for the data
            while (i < data.length && (data[i].name != hc)) {
                i++;
            }
        }
        //CSS animation for the 
        // data[i].dn ? () => {
        //     setTimeout(() => {
        //         //do some fancy animation thing in css
        //         updateBlah("click outside to close");
        //         //leave this up for a sec.
        //     }, 5000)
        //     return `"${data[i].dn}"`
        // } : "click outside to close"

        // let [blah, updateBlah] = useState(


        //     "click outside to close"
        // );

        //exception for the about me stuff

        return (
            <div className="overlay cursor-pointer ease-in-out duration-300"
                ref={overlayRef}
                onClick={(event) => {
                    if (event.target === event.currentTarget) {
                        offOverlay();
                    }
                }}
                onKeyDown={(event) => {
                    console.log(event);
                }}
            >
                <div className="overlayContainer cursor-default"
                    ref={innerlayRef}>
                    {/* top bar thing for inner overlay*/}
                    <div className="bg-main text-center text-white italic h-[1.2rem] text-[0.8rem]">
                        {"press 'escape' or click outside to close"}
                    </div>
                    <div className="innerOverlay w-[100vw] xl:w-[80vw]">
                        <OverlayContent index={i} hc={hc} />
                    </div>
                    {/* bottom bar thing */}
                    <OverlayBottom index={i} />
                </div>
            </div>
        )
    })

Overlay.displayName = 'Overlay';

function OverlayContent(props) {
    let EnnumList = (props) => {
        let toR = [];
        props.arr.forEach((obj, key) => {
            toR.push(
                <li className="list-item text-[1rem]" key={key}>
                    
                    <ParseForSpecialTags obj={obj}/>
                </li>
            )
        })
        return (
            <ol className="list-decimal ml-[2rem]">
                {toR}
            </ol>
        )
    }

    try {
        if (props.index == null) {
            switch (props.hc) {
                case "about":
                    return (
                        <div className="w-full overflow-y-auto">
                            <div className="font-[Lato] flex flex-col">
                                <h1 className="text-[3.5rem] italic leading-[3rem] pb-[1.5rem]">About Me</h1>
                                <h2 className="text-[1.2rem] mt-[-1.1rem] font-semibold">Last Updated: 
                                    <span className="font-light italic"> {infoJson.about.lastUpdate}</span></h2>
                            </div>
                            <div className="text-[1.4rem] 2xl:text-[1.8rem]">
                                <ul className="list-disc">
                                    {infoJson.about.qa.map((obj, key) => {
                                        return (
                                            <li key={key}>
                                                <h3>{obj.q}</h3>
                                                <EnnumList arr={obj.a} />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    );
                case "contacts":
                    return (
                        <div className="w-full overflow-y-auto">
                            <div className="font-[Lato] flex flex-col">
                                <h1 className="text-[3.5rem] italic leading-[3rem] pb-[1.5rem]">Contacts</h1>
                                <h2 className="text-[1.2rem] mt-[-1.1rem] font-semibold">Last Updated: 
                                    <span className="font-light italic"> August 14, 2024</span></h2>
                            </div>
                            <div className="text-[1.4rem] 2xl:text-[1.8rem]">
                                <p className="text-[19rem]">hi</p>
                                <p className="text-[0.9rem]">well, there&#39;s not a &#39;direct&#39; way to contact me...</p>
                                <ul className="list-disc">
                                    {infoJson.contacts.map((obj, key)=>{
                                        return(
                                            <p key={key}>
                                                <span className="font-semibold">{obj.site}</span>: <a href={obj.link} className="underline underline-offset-2 text-link text-lg italic">{obj.link}</a>
                                            </p>
                                        )
                                    })
                                    }
                                </ul>
                            </div>
                        </div>
                    );
                default:
                // throw new Error;
            }
        }
        return (
            <>
                <div className="w-full flex">
                    <div className="w-1/2">
                        {/* header */}
                        <div className="font-[Lato]">
                            <h1 className="text-[3.5rem] italic leading-[3rem] pb-[1.5rem]">{data[props.index].name}</h1>
                            <h2 className="text-[1.2rem] mt-[-1.1rem] font-semibold">
                                {((!data[props.index].date.end && data[props.index].date.ongoing) ? (`${data[props.index].date.begin} - Now`) // single date that is ongoing
                                    : (!data[props.index].date.end && !data[props.index].date.ongoing) ? (`${data[props.index].date.begin}`)
                                        : (`${data[props.index].date.begin} - ${data[props.index].date.end}`)
                                )}
                            </h2>
                        </div>
                        <div className="text-[1.4rem] 2xl:text-[1.8rem]">
                            {(
                                data[props.index].desc.caption ?
                                    <h3 className="italic font-semibold font-[Ubuntu] pb-[0.5rem]">
                                        {`(${data[props.index].desc.caption})`}
                                    </h3>
                                    : ""
                            )}
                            <div className="font-medium leading-9 h-[48vh] overflow-y-auto">
                            <ParseForSpecialTags obj={data[props.index].desc.paragraph} />
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 overflow-y-auto pr-[7px]">
                        {/* card thingy */}
                        <div className="flex flex-col items-end">
                            <h3 className="text-[1.3rem] font-bold italic font-[Ubuntu] w-auto items-end">
                                Made With
                            </h3>
                            <div className="flex jusify-center h-max">
                                {/* tech symbols */}
                                {
                                    data[props.index].tech.map((element, key) => {
                                        let r = ReturnFileName(element);
                                        if (r === "") {
                                            return;
                                        }
                                        else {
                                            key;
                                            return (
                                                <img
                                                    src={"/icons/" + r}
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
                        {(
                            data[props.index].image ?

                                <div className="flex items-end flex-col pt-[0.5rem] w-fit ml-auto">
                                    <img
                                        // priority
                                        src={GLOBALSFORMRWORLDWIDE.cardSRC + data[props.index].image.src}
                                        // width={32}   
                                        // height={32}
                                        alt="shjsad"
                                        className="h-[23vh] ml-auto mr-auto"
                                    />

                                    <p className="italic text-[0.7rem] w-[20vw] mr-auto ml-auto">
                                        {data[props.index].image.caption}
                                    </p>
                                </div>
                                : ""
                        )}
                        {/* Chips */}
                        <div className="flex justify-end flex-wrap mb-[10px]">
                            {
                                data[props.index].chips ?
                                    data[props.index].chips.map((obj, key) => {
                                        return (
                                            <div className="rounded-lg bg-[white] p-1 text-[black] 
                                                        shadow-[5px_5px_0px_0px_#B5B5B5] w-fit h-fit text-[1.35rem] 
                                                        text-[Inter] font-semibold ml-[10px] mt-[10px] min-w-fit
                                                        text-center
                                                        "
                                                key={key}>
                                                {obj}
                                            </div>
                                        )
                                    }) : ""
                            }
                        </div>
                        {/* Special Note */}
                        <Note index={props.index} />
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

function Note(props) {
    if (data[props.index].note) {
        return (
            <div className="pl-[3vw] text-[1.3rem] mt-[2rem]">
                {/* [][][[]] THIS DESERVES AN ANIMATION. */}
                < h4 className="font-[Ubuntu]" >
                    Special Note
                </h4 >
                <p className="italic">
                    {data[props.index].note.text}
                    <br />
                    <br />
                    {

                        (data[props.index].note.links ?
                            data[props.index].note.links.map((ele, key) => {
                                return (
                                    <a className="flex text-[var(--link-color)]" href={ele.src} key={key}>
                                        <span></span>
                                        <img src={"icons/web/" + handleBadges(ele) + ".svg"} className="h-[100%] w-[1.6rem] mr-[0.2rem]" />
                                        {ele.display}<br />
                                    </a>
                                )
                            })
                            : ""
                        )
                    }
                </p>
            </div>
        )
    }
    else {
        return;
    }

}


/**
 * 
 * @param {*} (props) index: index of the data json array to pull from
 * @returns 
 */
function OverlayBottom(props) {
    let a = [];
    if (!props.index || !data[props.index].misc) {
        return (
            <div className="bg-[var(--overlay-highlight)] text-white pl-6 pr-6 flex h-[1.8rem] z-[10] relative"></div>
        );
    }

    data[props.index].misc.forEach((blah, num) => {
        a.push(
            <div className="flex mr-4 items-center" key={num}>
                <img src={"icons/web/" + handleBadges(blah) + ".svg"} className="w-[1.6rem] mr-[0.2rem]" />
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
 * @param {*} obj the 
 * @returns 
 */
function ParseForSpecialTags({
    obj
}) {
    if (obj.indexOf("<br/>") != -1) {
        let toR = []; //list?
        //with obj, look for instances of <br/>
        // [text <br/]
        let index = obj.indexOf("<br/>");

        let key = 0
        while (index != -1) {
            //push string before
            toR.push(
                <span key={key}>{obj.substring(0, index)}</span>
            );
            key++;
            // add br
            for (let i = 0; i < 2; i++) {
                toR.push(<br key={key} />);
                key++;
            }

            obj = obj.substring(index + 6)

            index = obj.indexOf("<br/>");
        }

        //end of the string
        key++;
        toR.push(<span key={key}>{obj}</span>)
        return (
            <p key={key} className="font-medium leading-9 h-[48vh] overflow-y-auto">
                {toR}
            </p>
        )
    }
    else if(obj.indexOf("<sl>") != -1){
        let toR = []; //list?
        //with obj, look for instances of <br/>
        // [text <br/]
        let index = obj.indexOf("<sl>");

        let key = 0
        while (index != -1) {
            //push string before
            let end = obj.indexOf("</sl>");
            toR.push(
                <span className="line-through" key={key}>{obj.substring(4, end)}</span>
            );
            key++;

            obj = obj.substring(end + 5)

            index = obj.indexOf("<sl>");
        }

        //end of the string
        key++;
        toR.push(<span key={key}>{obj}</span>)
        return (
            <p className="">
                {toR}
            </p>
        )
    }
    return (
        <p >
            {obj}
        </p>
    )

}

/**
 * 
 * @returns obj with proper info for 
 */
function handleBadges(obj) {
    if (!obj.type) {
        return "el"
    }

    switch (obj.type) {
        case "site":
            return "el"
        case "video":
            return "yt"
        case "github":
            return "../github"
        case "lin":
            return "../linkedin"
        default:
            return obj.type;
    }
}

export default Overlay;
