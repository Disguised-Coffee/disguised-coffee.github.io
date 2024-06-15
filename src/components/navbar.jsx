// HEHEHHAW
'use client'

import Image from 'next/image'
import dcLogo from '../../public/dcLogo.png'
import { useRef } from 'react';

const NavBar = () => {
  let cumulativeID = 0;

  function buttonPiece(text, src) {
    cumulativeID++;
    this.id = cumulativeID;
    this.text = text;
    this.src = src;
  }

  let navBarSlideButtons = [
    new buttonPiece("About me", "/test1"),
    new buttonPiece("Projects", "/test2"),
    new buttonPiece("Contacts", "/test2"),
  ]

  const logo = useRef(null),
        logoText = useRef(null);

  return (
    <nav className="fixed h-[10vh] bg-topBar w-full text-white flex flex-center drop-shadow-custom z-2">
          <a className="flex items-center pl-[10px]" href="./Coffee2wtrace.png" title="Back to homepage">
            <Image ref={logo} className="h-[3rem] max-w-full w-auto pr-[10px]" src={dcLogo} alt="hi" />
            <h1 ref={logoText} className="text-[2rem] italic ">Disguised_Coffee</h1>
          </a>
      <div className="absolute right-0 top-0 flex items-center h-[10vh]">
        <ul className="flex flex-center">
          {navBarSlideButtons.map((obj) => {
            return (
              <li className="p-[2vh] font-test italic block text-[1.2rem]"><a className="transition ease-in-out delay-150 duration-[500ms] hover:drop-shadow-highlight" href={obj.src} title="TO BE FILLED" key={(obj.id).toString()}>{obj.text}</a>
              {/* {console.log(obj.id)} */}
              </li>
            )
          })}
          <li className="p-[2vh]" key={(cumulativeID + 1).toString()}><button className='btn'>Switch UI Mode</button></li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;