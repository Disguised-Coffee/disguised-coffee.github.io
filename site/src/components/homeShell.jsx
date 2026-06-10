'use client'

import NavBar from "@/components/navbar";
import bg from "../../public/np_file_17300.jpeg";
import Image from "next/image";
import Content from "@/app/content";
import Overlay from "@/components/overlay";
import { RenderPortableText } from "@/components/portableText";
import { getPageSettings } from "@/lib/sanity";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

const TypingScriptDynamic = ({ word }) => {
  let text = word || 'try{ let blah = undefined; console.log(blah.value); } finally{console.log("Hello World");}';
  let delay = 10;

  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <div className="absolute top-[10vh] left-[2vw] font-Ubuntu-Mono">{currentText}<span id="trailingChar">{"█"}</span></div>;
};

const Page = ({ changeHC, passRef, pageSettings, onProjectClick }) => {
  const [typingWord, setTypingWord] = useState('');

  useEffect(() => {
    const getWord = () => {
      if (!pageSettings || !pageSettings.codeSnippets || pageSettings.codeSnippets.length === 0) {
        let scripts = [
          'console.log("Hello World");',
          'System.out.println("Hello World");',
          'std::cout << "Hello World" << std::endl;',
          'print("Hello World")',
          'echo "Hello World"',
          'Serial.println("Hello World");',
        ];
        let num = Math.floor(Math.random() * scripts.length);
        return scripts[num];
      }
      let num = Math.floor(Math.random() * pageSettings.codeSnippets.length);
      return pageSettings.codeSnippets[num];
    };

    setTypingWord(getWord());
  }, [pageSettings]);

  return (
    <div className="fixed [scroll-snap-align:_start_none] h-[100vh] pt-[0vh] text-white z-[0]">
      <Image className="object-cover h-full w-full" src={bg} alt="hi" />
      <div className="whitespace-nowrap w-[100vw]">
        <TypingScriptDynamic word={typingWord} />
        <div className="absolute top-[30vh] text-[1.5rem] sm:text-[3.375rem] md:text-[4.375rem] blah-text left-[1vw]">
          <h1 className="main-text font-[Ubuntu] italic">&quot;{pageSettings?.mainHeading || 'Hello World'}&quot;</h1>
          <h1 className="w-[90vw] [animation-delay:2.7s_!important] main-text absolute left-[2rem] sm:left-[4rem]">{pageSettings?.secondaryHeading || 'FROM DISGUISED_COFFEE'}</h1>
        </div>
        <div className="absolute left-[2vw] bottom-[16vh] sm:bottom-[11vh] lazycssthing flex flex-col items-center text-center mt-[100vh]">
          <h2 className="text-[1.7rem]">
            {pageSettings?.mainCaptions ? (
              <RenderPortableText value={pageSettings.mainCaptions} />
            ) : (
              <>
                <span className="main-captions">Connecting hardware and software</span><br />
                <span className="main-captions [animation-delay:4.5s_!important]">for the sake of the system.</span>
              </>
            )}
          </h2>
          <button
            className="btn mt-[2rem] py-[0.5rem] px-[1.2rem] text-[1.2rem] select-all main-captions [animation-delay:5s_!important]"
            onClick={() => {
              changeHC("about");
              passRef.current.overlayOn();
            }}
          >
            {pageSettings?.buttonText || 'Learn more about me!'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function HomeShell({ initialProjectId = null }) {
  const [hoverContent, changeHC] = useState(initialProjectId || "TaskMap");
  const [pageSettings, setPageSettings] = useState(null);
  const overlayRef = useRef(null);
  const router = useRouter();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchPageSettings = async () => {
      try {
        const settings = await getPageSettings();
        setPageSettings(settings);
      } catch (error) {
        console.error('Failed to fetch page settings:', error);
      }
    };

    fetchPageSettings();
  }, []);

  useEffect(() => {
    if (initialProjectId) {
      changeHC(initialProjectId);
      if (overlayRef.current) {
        overlayRef.current.overlayOn();
      }
    }
  }, [initialProjectId]);

  useEffect(() => {
    const savedScrollTop = window.sessionStorage.getItem('site-scroll-top');
    if (savedScrollTop && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = Number(savedScrollTop) || 0;
    }
  }, []);

  const navigateToProject = (projectId) => {
    if (!projectId) {
      return;
    }

    const scrollContainer = scrollContainerRef.current || document.getElementById('scrollingPage');
    if (scrollContainer) {
      window.sessionStorage.setItem('site-scroll-top', String(scrollContainer.scrollTop || 0));
    }

    router.push(`/projects/${projectId}`, { scroll: false });
  };

  const restoreScroll = () => {
    const scrollContainer = scrollContainerRef.current || document.getElementById('scrollingPage');
    if (!scrollContainer) {
      return;
    }

    const savedScrollTop = window.sessionStorage.getItem('site-scroll-top');
    if (savedScrollTop !== null) {
      scrollContainer.scrollTop = Number(savedScrollTop) || 0;
    }
  };

  return (
    <>
      <NavBar changeHC={changeHC} passRef={overlayRef} />
      <Overlay
        hc={hoverContent}
        ref={overlayRef}
        onClose={initialProjectId && hoverContent === initialProjectId ? () => router.push('/', { scroll: false }) : undefined}
      />
      <Page
        changeHC={changeHC}
        passRef={overlayRef}
        pageSettings={pageSettings}
        onProjectClick={navigateToProject}
      />
      <div
        ref={scrollContainerRef}
        id="scrollingPage"
        className="customClipPath overscroll-none [overflow-y:_scroll] [scroll-snap-type:_y_mandatory] w-[105vw] h-[100vh] relative overflow-auto"
        onScroll={() => {
          if (typeof window === 'object') {
            const toChange = document.getElementById("scrollingPage");
            window.sessionStorage.setItem('site-scroll-top', String(toChange.scrollTop || 0));
            if (toChange.scrollTop == 0) {
              toChange.classList.add("customClipPath");
            } else {
              toChange.classList.remove("customClipPath");
            }
          }
        }}
        onLoad={restoreScroll}
      >
        <div id="test" className="customClipPath [scroll-snap-align:_start_none] h-[100vh] z-[2]"></div>
        <Content onProjectClick={navigateToProject} />
      </div>
    </>
  );
}
