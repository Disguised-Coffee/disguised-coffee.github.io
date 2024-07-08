// HEHEHHAW
'use client'

import Image from 'next/image'
import dcLogo from '../../public/dcLogo.png'
import { useRef } from 'react';

const NavBar = () => {
  let cumulativeID = 0;

  function buttonPiece(text, src, t) {
    cumulativeID++;
    this.id = cumulativeID;
    this.text = text;
    this.src = src;
    this.titleText = t;

  }

  let navBarSlideButtons = [
    new buttonPiece("About me", "/test1", "No, I won't send you to another page."),
    new buttonPiece("Projects", "/test2", "I won't send you to another page too!"),
    new buttonPiece("Contacts", "/test2", "What the last two said"),
  ]

  const logo = useRef(null),
    logoText = useRef(null);

  return (
    <nav className="top-0 fixed h-[8vh] bg-topBar w-full text-white flex flex-center drop-shadow-custom z-30">
      <a className="flex items-center pl-[10px]" href="/">
        <Image ref={logo} className="h-[3rem] max-w-full w-auto pr-[10px]" src={dcLogo} alt="hi" />
        <h1 ref={logoText} className="text-[2rem] italic ">Disguised_Coffee</h1>
      </a>
      <ul className="absolute right-0 top-0 flex-center h-[8vh] items-center hidden xl:flex">
        {navBarSlideButtons.map((obj) => {
          return (
            <li key={obj.id} className="p-[2vh] font-test italic block text-[1.2rem]"><a className="transition ease-in-out delay-150 duration-[500ms] hover:drop-shadow-highlight" href={obj.src} title={obj.titleText}>{obj.text}</a>
              {/* {console.log(obj.id)} */}
            </li>
          )
        })}
        <li className="p-[2vh]" key={(cumulativeID + 1)}><button className='btn'>Switch UI Mode</button></li>
      </ul>
    </nav>
  )
}

export default NavBar;