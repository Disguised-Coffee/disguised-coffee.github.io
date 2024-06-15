'use client'

import NavBar from "@/components/navbar";
import bg from "../../public/np_file_17300.jpeg"
import Image from "next/image";
import { CardsContent } from "./content";

const Content = () => {
  return(
    <div className="h-[100vh] pt-[10vh]">
      <Image className="fixed z-[-1]" src={bg} alt="hi" />
      <div className=""></div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* <NavBar /> */}
      {/* <Content/> */}
      <CardsContent/>
    </>
  );
}
