'use client'

import NavBar from "@/components/navbar";
import bg from "../../public/np_file_17300.jpeg"
import Image from "next/image";
import Content from "./content";

const Page = () => {
  return (
    <div className="[scroll-snap-align:_start_none] h-[100vh] pt-[0vh]">
      <Image className="fixed z-[-1]" src={bg} alt="hi" />
      <div className=""></div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="[overflow-y:_scroll] [scroll-snap-type:_y_mandatory] w-[100vw]">
        <Page />
        <Content />
      </div>
    </>
  );
}
