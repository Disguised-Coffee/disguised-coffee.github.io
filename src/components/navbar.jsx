// HEHEHHAW
'use client'

import Image from 'next/image'
import dcLogo from '../../public/dcLogo.png'
import { useRef } from 'react';
import menu from '../../public/icons/web/menu.svg'

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
    logoText = useRef(null),
    navBarButtons = useRef(null);


  let isNavContextOn = false;


  //this is a pain to look at.
  function findIfContext(e){
    let iteratingTarget = e.target;
      do{
        
        //the button
        if(iteratingTarget === document.getElementById("context")){
          return false;
        }
        //is the context menu, do nothing.
        if(iteratingTarget === navBarButtons.current){
          return false;
        }
        iteratingTarget = iteratingTarget.parentNode;
        if(!(iteratingTarget)){
          return(true)
        }
      }while (iteratingTarget)
  }

  //onclick event listener for window
  if (typeof window === 'object') {

    document.addEventListener("click", (e) => {
      if(findIfContext(e)){
        handleNavBarContextThing(false);
      }
    })
  }
  

  let handleNavBarContextThing = (changeNav) => {
    if(window.innerWidth <= 640){
      if (changeNav) {
        navBarButtons.current.style.display = "flex";
      }
      else {
        navBarButtons.current.style.display = "none";
      }
      isNavContextOn = changeNav;
    }
    // isNavContextOn = !isNavContextOn; //doesn't work since func is called twice ;-;
  }

  return (
    <nav className="top-0 fixed h-[8vh] bg-topBar w-full text-white flex flex-center drop-shadow-custom z-30">
      <a className="flex items-center pl-[10px]" href="/">
        <Image ref={logo} className="h-[2rem] xl:h-[3rem] max-w-full w-auto mr-[10px] " src={dcLogo} alt="Disguised Coffee Logo"/>
        <h1 ref={logoText} className="text-[1.76rem] xl:text-[2rem] italic ">Disguised_Coffee</h1>
      </a>
      <button
        onClick={
          ()=>{
            handleNavBarContextThing(true)
          }
        }
        className="absolute right-[1vw] 
                  top-[10%] w-[3rem]
                  block sm:hidden">
        <Image src={menu} id='context' className='h-[3rem]' alt='Menu Context button'/>
      </button>
      <ul ref={navBarButtons} className="absolute right-0 top-[8vh] 
                                        sm:top-0 
                                        flex-col sm:flex-row flex-center h-[8vh] items-center 
                                        hidden sm:flex 
                                        mr-[2rem]
                                        bg-void
                                        sm:bg-transparent
                                        h-auto
                                        ">
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
                      handleNavBarContextThing(false);
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
                      handleNavBarContextThing(false);
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