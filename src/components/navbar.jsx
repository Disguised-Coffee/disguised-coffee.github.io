// HEHEHHAW
'use client'

import Image from 'next/image'
import dcLogo from '../../public/dcLogo.png'
import { useRef } from 'react';

const NavBar = ({
  changeHC,
  passRef
}) => {
  let _;

  function buttonPiece(text, src, t, onClick = null) {
    this.text = text;
    this.src = src;
    this.titleText = t;
    this.onClick = onClick;
  }

  let navBarSlideButtons = [
    new buttonPiece("About me", "/", "Will activate an overlay", "about"),
    new buttonPiece("Projects", "#projects", "Head towards Projects", "off"),
    new buttonPiece("Contacts", "/", "Will also activate an overlay", "contacts"),
  ]

  const logo = useRef(null),
    logoText = useRef(null);

  const scrollToBottom = () => {
    console.log("ASdasds")
    console.log(window.scrollBy)
    window.scrollBy(100, 0);

    window.scrollTo({
      top: 200,
      behavior: "smooth"
    });
  };

  return (
    <nav className="top-0 fixed h-[8vh] bg-topBar w-full text-white flex flex-center drop-shadow-custom z-30">
      <a className="flex items-center pl-[10px]" href="/">
        <Image ref={logo} className="h-[3rem] max-w-full w-auto pr-[10px]" src={dcLogo} alt="hi" />
        <h1 ref={logoText} className="text-[2rem] italic ">Disguised_Coffee</h1>
      </a>
      <ul className="absolute right-0 top-0 flex-center h-[8vh] items-center hidden xl:flex">
        {navBarSlideButtons.map((obj, key) => {
          if (obj.onClick && obj.onClick !== "off") {
            return (
              <li key={key} className="p-[2vh] font-test italic block text-[1.2rem]">
                <a className="transition ease-in-out duration-[500ms] hover:drop-shadow-highlight cursor-pointer"
                  title={obj.titleText}
                  onClick={
                    (event) => {
                      changeHC(obj.onClick);
                      passRef.current.overlayOn();
                    }}>
                  {obj.text}
                </a>
              </li>
            )
          }
          else if (obj.onClick === "off") {
            return (
              <li key={key} className="p-[2vh] font-test italic block text-[1.2rem]">
                <a className="transition ease-in-out duration-[500ms] hover:drop-shadow-highlight cursor-pointer"
                  title={obj.titleText}
                  onClick={
                    (event) => {
                      if (typeof window === 'object') {
                        document.getElementById("scrollingPage").
                          scrollTo({
                            top: document.documentElement.scrollHeight,
                            left: 0,
                            behavior: 'smooth'
                          });
                      }
                      passRef.current.overlayOff();
                    }}>
                  {obj.text}
                </a>
              </li>
            )
          }
          return (
            <li key={key} className="p-[2vh] font-test italic block text-[1.2rem]">
              <a className="transition ease-in-out delay-150 duration-[500ms] hover:drop-shadow-highlight"
                href={obj.src}
                title={obj.titleText}>
                {obj.text}
              </a>
            </li>
          )
        })}
        {/* <li className="p-[2vh]" key={(_ + 1)}><button className='btn'>Switch UI Mode</button></li> */}
      </ul>
    </nav>
  )
}

export default NavBar;