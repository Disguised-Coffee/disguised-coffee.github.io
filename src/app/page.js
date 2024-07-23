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

const Page = () => {
  return (
    <div className="fixed [scroll-snap-align:_start_none] h-[100vh] pt-[0vh] text-white z-[-1]">
      <Image className="" src={bg} alt="hi" />
      {/* actual  */}
      <div className="whitespace-nowrap w-[100vw]">
        <div className="absolute top-[25vh] text-[4.375rem] blah-text left-[2vw]">
          <h1 className="font-[Ubuntu] italic">&quot;Hello World&quot;</h1>
          <h1 className="absolute left-[4rem]">FROM DISGUISED_COFFEE</h1>
        </div>
        <div className="absolute left-[2vw] bottom-[16vh] lazycssthing flex flex-col items-center text-center">
          <h2 className="text-[2rem]">Student Programmer,<br />and Computer Engineer.</h2>


          {/* DO SOMETHING ABOUT THIS. */}
          <div className="btn text-[1.2rem] select-all">
            Scroll down to learn more about me!
          </div>
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
      <NavBar />
      <Overlay hc={hoverContent} ref={overlayRef} />
      <Page />
      <div className="[overflow-y:_scroll] [scroll-snap-type:_y_mandatory] w-[105vw] h-[100vh] relative overflow-auto">
        <div className="[scroll-snap-align:_start_none] h-[1vh] mb-[100vh] z-[10]">
        </div>
        <Content changeHC={changeHC} passRef={overlayRef} />
      </div>
    </>
  );
}
