'use client'

import NavBar from "@/components/navbar";
import bg from "../../public/np_file_17300.jpeg"
import Image from "next/image";
import Content from "./content";
import {Overlay} from "@/components/overlay";
import { useState } from "react";

const Page = () => {
  return (
    <div className="[scroll-snap-align:_start_none] h-[100vh] pt-[0vh]">
      <Image className="fixed z-[-1]" src={bg} alt="hi" />
      <div className=""></div>
    </div>
  )
}

export default function Home() {
  let [hoverContent,changeHC] = useState("testing project");
  
  return (
    <>
      <NavBar />
      <Overlay hc={hoverContent}/>
      {/* <div className="[overflow-y:_scroll] [scroll-snap-type:_y_mandatory] w-[100vw] h-[100vh]">
        <Page />
        <Content changeHC={changeHC}/>
      </div> */}
    </>
  );
}
