'use client'

/**
 * If you are reading my code, 
 * 
 * uh-
 * 
 * have fun i guess...
 * 
 * also hello.
 */

import NavBar from "@/components/navbar";
import bg from "../../public/np_file_17300.jpeg"
import Image from "next/image";
import Content from "./content";
import Overlay from "@/components/overlay";
import { useRef, useState } from "react";

const Page = ({
  changeHC,
  passRef
}) => {
  return (
    <div className="fixed [scroll-snap-align:_start_none] h-[100vh] pt-[0vh] text-white z-[0]">
      <Image className="object-cover h-full w-full" src={bg} alt="hi" />
      {/* actual  */}
      <div className="whitespace-nowrap w-[100vw]">
        <div className="absolute top-[30vh] 
                        text-[1.5rem]
                        sm:text-[3.375rem]
                        md:text-[4.375rem] blah-text left-[1vw] ">
          <h1 className="main-text font-[Ubuntu] italic">&quot;Hello World&quot;</h1>
          <h1 className="w-[90vw] [animation-delay:0.6s_!important] main-text absolute left-[2rem] sm:left-[4rem]">FROM DISGUISED_COFFEE</h1>
        </div>
        <div className="absolute left-[2vw] bottom-[16vh] sm:bottom-[11vh] lazycssthing flex flex-col items-center text-center mt-[100vh]">
          <h2 className="text-[1.7rem]">
            <span className="main-captions">Student Programmer,</span><br />
            <span className="main-captions [animation-delay:2.5s_!important]">and Computer Engineer.</span>
          </h2>
          {/* DO SOMETHING ABOUT THIS. */}
          <button className="btn mt-[2rem] py-[0.5rem] px-[1.2rem] text-[1.2rem] select-all main-captions [animation-delay:3.1s_!important]"
            onClick={
              (event) => {
                changeHC("about");
                passRef.current.overlayOn();
              }
            }>
            Learn more about me!
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  let [hoverContent, changeHC] = useState("TaskMap");

  let overlayRef = useRef(null);

  return (
    <>
      <NavBar changeHC={changeHC} passRef={overlayRef} />
      <Overlay hc={hoverContent} ref={overlayRef} />
      <Page changeHC={changeHC} passRef={overlayRef} />
      <div id="scrollingPage" className="customClipPath overscroll-none [overflow-y:_scroll] [scroll-snap-type:_y_mandatory] w-[105vw] h-[100vh] relative overflow-auto"
        onScroll={(e) => {
          if (typeof window === 'object') {
            let toChange = document.getElementById("scrollingPage");

            //comment doesn't work bc it will tear into the projects page
            // if(document.getElementById("scrollingPage").scrollTop <= window.innerHeight){
            if (toChange.scrollTop == 0) {
              toChange.classList.add("customClipPath");
            }
            else {
              toChange.classList.remove("customClipPath");
            }
          }
        }}
      >
        <div id="test" className="customClipPath [scroll-snap-align:_start_none] h-[100vh] z-[2]">
        </div>
        <Content changeHC={changeHC} passRef={overlayRef} />
      </div>
    </>
  );
}
