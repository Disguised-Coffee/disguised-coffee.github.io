'use client'

import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react";
import { ReturnFileName } from "./cards";
import GLOBALSFORMRWORLDWIDE from "@/app/const";
import { getProjects, getAboutInfo, getContacts } from "@/lib/sanity";
import {RenderPortableText} from "./portableText"

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
        const [data, setData] = useState([]);
        const [aboutData, setAboutData] = useState(null);
        const [contactsData, setContactsData] = useState([]);
        const [isLoading, setIsLoading] = useState(false);

        useEffect(() => {
            const fetchAllData = async () => {
                try {
                    const projects = await getProjects();
                    setData(projects || []);
                    const about = await getAboutInfo();
                    setAboutData(about);
                    const contacts = await getContacts();
                    setContactsData(contacts || []);
                } catch (error) {
                    console.error('Error fetching overlay data:', error);
                }
            };
            fetchAllData();
        }, []);

        function offOverlay() {
            overlayRef.current.style.display = "none";
            innerlayRef.current.classList.remove("overlayAniOn");
            innerlayRef.current.classList.add("overlayAniOff");
            overlayRef.current.classList.add("outterOverlayOff");
            // Re-enable scrolling
            if (typeof document !== 'undefined') {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }
        }

        function onOverlay() {
            overlayRef.current.style.display = "block";
            innerlayRef.current.classList.remove("overlayAniOff");
            overlayRef.current.classList.remove("outterOverlayOff");
            innerlayRef.current.classList.add("overlayAniOn");

            // Disable scrolling when overlay is open
            if (typeof document !== 'undefined') {
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            }

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
                    console.trace(event);
                }}
            >
                <div className="overlayContainer cursor-default"
                    ref={innerlayRef}>
                    {/* top bar thing for inner overlay*/}
                    <div className="bg-main text-center text-white italic h-[1.2rem] text-[0.8rem]">
                        {"press 'escape' or click outside to close"}
                    </div>
                    <div className="innerOverlay w-[100vw] xl:w-[80vw]">
                        <OverlayContent index={i} hc={hc} data={data} aboutData={aboutData} contactsData={contactsData} />
                    </div>
                    {/* bottom bar thing */}
                    <OverlayBottom index={i} data={data} />
                </div>
            </div>
        )
    })

Overlay.displayName = 'Overlay';

function OverlayContent(props) {
    const { data, aboutData, contactsData } = props;

    try {
        if (props.index == null) {
            switch (props.hc) {
                case "about":
                    if (!aboutData) {
                        return <p className="text-center">Loading about info...</p>;
                    }
                    return (
                        <div className="w-full overflow-y-auto">
                            <div className="font-[Lato] flex flex-col">
                                <h1 className="text-[3.5rem] italic leading-[3rem] pb-[1.5rem]">About Me</h1>
                                <h2 className="text-[1.2rem] mt-[-1.1rem] font-semibold">Last Updated: 
                                    <span className="font-light italic"> {aboutData.lastUpdate || "N/A"}</span></h2>
                            </div>
                            <div className="text-[1.4rem] 2xl:text-[1.8rem] space-y-8">
                                {renderAboutSections(aboutData)}
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
                                    {(contactsData || []).map((obj, key)=>{
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
        if (!data || data.length === 0) {
            return <p className="text-center">Loading project data...</p>;
        }
        if (props.index === null || data[props.index] === undefined) {
            return <p className="text-center">Project not found</p>;
        }
        console.log(data)

        // we'll reformat the date that is displayed based on criteria:
        //  1) does it exist? --> put nothing
        //  2) is it ongoing? --> put `Month Year` - Now
        //  3) does the end date not exist and not ongoing? --> put `Month Year` (ie: for single-day projects)
        //  4) are the months the same? --> put `Month Year`
        //  5) otherwise, put `Month Year` - `Month Year`

        const formattedDate = (() => {
            // remember to reformat!
            if (!data[props.index].date) {
                return "";
            }
            const beginDate = new Date(data[props.index].date.begin).toLocaleString('default', {month: 'long', year: 'numeric'});
            if (!data[props.index].date.ongoing && !data[props.index].date.end) {
                return `${beginDate}`;
            }
            if (data[props.index].date.ongoing) {
                return `${beginDate} - Now`;
            }
            const endDate = new Date(data[props.index].date.end).toLocaleString('default', {month: 'long', year: 'numeric'});

            if (beginDate  === endDate) {
                return `${beginDate}`;
            }
            return `${beginDate} - ${endDate}`;
        })();

        return (
            <>
                <div className="w-full flex">
                    <div className="w-1/2">
                        {/* header */}
                        <div className="font-[Lato]">
                            <h1 className="text-[3.5rem] italic leading-[3rem] pb-[1.5rem]">{data[props.index] ? data[props.index].name : ""}</h1>
                            <h2 className="text-[1.2rem] mt-[-1.1rem] font-semibold">
                                {formattedDate}
                            </h2>
                        </div>
                        <div className="text-[1.4rem] 2xl:text-[1.8rem]">
                            <div className="font-medium leading-9 h-[48vh] overflow-y-auto">
                                <RenderPortableText value={data[props.index].desc} />
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 overflow-y-auto pr-[7px]">
                        {/* card thingy */}
                        {/* if there are icons, then display them */}
                        
                            { data[props.index].icons ? (
                                <div className="flex flex-col items-end">
                                <h3 className="text-[1.3rem] font-bold italic font-[Ubuntu] w-auto items-end">
                                Made With
                                </h3>
                                <div className="flex jusify-center h-max">
                                    {/* icons */}
                                    {data[props.index].icons.map((icon, index) => (
                                        <img
                                            key={index}
                                            src={icon.url}
                                            alt={icon.name}
                                            className="pl-[4px] h-[3rem]"
                                        />
                                    ))}
                                </div>
                                </div>
                            ) : ""
                            }
                        {(
                            data[props.index].image ?

                                <div className="flex items-end flex-col pt-[0.5rem] w-fit ml-auto">
                                    <img
                                        src={data[props.index].image.url}
                                        alt={data[props.index].image.alt || "Project image"}
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
                        <Note index={props.index} data={data} />
                    </div>
                </div>
            </>
        )
    }
    catch (TypeError) {
        console.error(TypeError)
        return (
            <h1 className="text-center text-[1.5rem] m-auto">
                A problem has occured (and please tell me how)!<br />
                <span className="text-[1.25rem] italic">(contact me @ via email)</span>
            </h1>
        )
    }
}

function renderAboutSections(aboutData) {
    
    console.warn(aboutData)
    
    const sections = Array.isArray(aboutData?.sections) && aboutData.sections.length > 0
        ? aboutData.sections
        : Array.isArray(aboutData?.qa) && aboutData.qa.length > 0
            ? [{_type: 'aboutQaSection', title: 'Q&A', items: aboutData.qa}]
            : [];

    if (sections.length === 0) {
        return <p className="text-center">No About sections available.</p>;
    }

    return sections.map((section, sectionIndex) => {
        if (section._type === 'aboutTextSection') {
            return (
                <section key={section._key || sectionIndex} className="space-y-4">
                    {section.title ? <h3 className="text-[1.7rem] font-semibold font-[Lato]">{section.title}</h3> : null}
                    <div className="font-medium leading-9">
                        <RenderPortableText value={section.body} />
                    </div>
                </section>
            );
        }

        if (section._type === 'aboutQaSection') {
            return (
                <section key={section._key || sectionIndex} className="space-y-4">
                    {section.title ? <h3 className="text-[1.7rem] font-semibold font-[Lato]">{section.title}</h3> : null}
                    <ul className="list-disc pl-[1.5rem] space-y-4">
                        {(section.items || []).map((item, itemIndex) => (
                            <li key={item._key || itemIndex}>
                                <h4 className="font-semibold text-[1.2rem]">{item.q}</h4>
                                <div className="font-medium leading-9 pt-[0.25rem]">
                                    <RenderPortableText value={item.a} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            );
        }

        return null;
    });
}

function Note(props) {
    const { data, index } = props;
    if (!data || !data[index] || !data[index].note) {
        return null;
    }
    return (
        <div className="pl-[3vw] text-[1.3rem] mt-[2rem]">
            {/* [][][[]] THIS DESERVES AN ANIMATION. */}
            < h4 className="font-[Ubuntu]" >
                Special Note
            </h4 >
            <p className="italic">
                {data[index].note.text}
                <br />
                <br />
                {

                    (data[index].note.links ?
                        data[index].note.links.map((ele, key) => {
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


/**
 * 
 * @param {*} (props) index: index of the data json array to pull from
 * @returns 
 */
function OverlayBottom(props) {
    const { data, index } = props;
    let a = [];
    if ( !data || !data[index] || !data[index].misc) {
        return (
            <div className="bg-[var(--overlay-highlight)] text-white pl-6 pr-6 flex h-[1.8rem] z-[10] relative"></div>
        );
    }
    
    data[index].misc.forEach((blah, num) => {
        a.push(
            <div className="flex mr-4 items-center p-2" key={num}>
                
                <a href={blah.src} className="font-[Ubuntu] text-white underline italic text-xl/6 inline flex items-center font-bold">
                    <img src={"icons/web/" + handleBadges(blah) + ".svg"} className="w-[1.6rem] mr-[0.2rem] inline" />
                    {blah.display ? blah.display : "bruh"}
                </a>
            </div>
        )
    });
    return (
        <div className="bg-[var(--overlay-highlight)] text-white pl-6 pr-6 flex z-[10] relative">
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
