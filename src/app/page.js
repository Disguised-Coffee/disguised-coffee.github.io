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
import { useRef, useState, useEffect} from "react";


const TypingScriptDynamic = ({
  word
}) => {

  //https://blog.logrocket.com/5-ways-implement-typing-animation-react/ ;-;

  let text = (!word) ? 'try{ let blah = undefined; console.log(blah.value); } finally{console.log("Hello World");}' : word;
  let delay = 10;
  
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
  
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <div className="absolute top-[10vh] left-[2vw] font-Ubuntu-Mono">{currentText}<span id="trailingChar">{"█"}</span></div>;
};


const Page = ({
  changeHC,
  passRef
}) => {
  let getWord = ()=>{
    let scripts = [
      'console.log("Hello World");',
      'System.out.println("Hello World");',
      'std::cout << "Hello World" << std::endl;',
      'print("Hello World")',
      'echo "Hello World"',
      'Serial.println("Hello World");'
    ]
    let num = Math.round(Math.random() * scripts.length - 1)
    return scripts[num];
  };

  return (
    <div className="fixed [scroll-snap-align:_start_none] h-[100vh] pt-[0vh] text-white z-[0]">
      <Image className="object-cover h-full w-full" src={bg} alt="hi" />
      {/* actual  */}
      <div className="whitespace-nowrap w-[100vw]">
        <TypingScriptDynamic word={getWord()}/>
        <div className="absolute top-[30vh] 
                        text-[1.5rem]
                        sm:text-[3.375rem]
                        md:text-[4.375rem] blah-text left-[1vw] ">
          <h1 className="main-text font-[Ubuntu] italic">&quot;Hello World&quot;</h1>
          <h1 className="w-[90vw] [animation-delay:2.7s_!important] main-text absolute left-[2rem] sm:left-[4rem]">FROM DISGUISED_COFFEE</h1>
        </div>
        <div className="absolute left-[2vw] bottom-[16vh] sm:bottom-[11vh] lazycssthing flex flex-col items-center text-center mt-[100vh]">
          <h2 className="text-[1.7rem]">
            <span className="main-captions">Student Programmer,</span><br />
            <span className="main-captions [animation-delay:4.5s_!important]">and Computer Engineer.</span>
          </h2>
          {/* DO SOMETHING ABOUT THIS. */}
          <button className="btn mt-[2rem] py-[0.5rem] px-[1.2rem] text-[1.2rem] select-all main-captions [animation-delay:5s_!important]"
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
