import React from "react";
import Link from "next/link";
import { KeyObject } from "crypto";
interface CardProps {
  // bgImage: string;
  // bgImageAltText: string;
  floatingSprintSRC?: string; // Optional property with default value
  floatingSpriteAltText?: string; // Optional property with default value
  floatingSprintExtraStyling?: Object;
  title: string;
  text: string;
  children: React.ReactNode;
}

const OldCard: React.FC<CardProps> = ({
  // bgImage,
  // bgImageAltText,
  floatingSprintSRC,
  floatingSpriteAltText,
  floatingSprintExtraStyling,
  title,
  text
}) => {
  return (
    <div
      className="group w-auto relative overflow-hidden rounded-2xl m-2 aspect-[3/2] 
                        h-[30vh]   duration-[0.15s] ease-in-out 
                        shadow-xl bg-white/0
                        backdrop-blur-lg
                        ring-1 ring-black/5
                        hover:scale-[1.06]">
      {/* <img className="h-full w-full filter blur-[2.25px] " src={bgImage} alt={bgImageAltText} /> */}
      {floatingSprintSRC && ( // Check if floatingSprintSRC is provided
        <img
          className="miniImageInCard absolute h-24 opacity-0 z-10 group-hover:opacity-[1]"
          src={floatingSprintSRC}
          alt={floatingSpriteAltText}
          style={floatingSprintExtraStyling}
        />
      )}
      <div className="absolute top-0 right-0 bottom-0 left-0 p-4 z-[1] font-IBM-Plex-Sans">
        <h5
          className="font-bold m-0 italic text-xl transition-all duration-[0.2s] ease-in delay-[0.05s] w-max
                                group-hover:scale-[1.06]">
          {title}
        </h5>
        <div className="absolute flex flex-col h-[90%] w-[91%]">
          {" "}
          {/*overlay */}
          <p className="h-[52%] w-[92%] aspect-[3/2] overflow-y-hidden text-ellipsis mb-[0.7rem] mt-[1rem]">
            {text}
          </p>
          <button
            className="rounded-sm cursor-pointer mx-auto my-0 bg-[rgb(46,255,81)] text-sm font-semibold 
                                relative text-center no-underline select-none align-middle whitespace-nowraprounded-sm 
                                 whitespace-nowrap 
                                px-[16px] py-[5px]
                                duration-[0.15s] ease-in-out
                                hover:scale-[1.1]
                                ">
            Sign up!
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Card but without the button!
 *
 * @param param0
 * @returns
 */
const CardNoButton: React.FC<CardProps> = ({
  // bgImage,
  // bgImageAltText,
  floatingSprintSRC,
  floatingSpriteAltText,
  floatingSprintExtraStyling,
  title,
  children
}) => {
  return (
    <div
      className="scale-group-leader w-auto relative m-2 aspect-[3/2] 
                        h-[34vh]">
      {/*background div */}
      <div
        className="top-[-10px] left-[-10px] scale-group-leader w-auto relative rounded-2xl m-2 aspect-[3/2] 
                        h-[34vh]
                        shadow-xl bg-white/0 
                        backdrop-blur-lg
 ring-1 ring-black/5"></div>
      {floatingSprintSRC && ( // Check if floatingSprintSRC is provided
        <img
          className="miniImageInCard absolute h-24 opacity-0 z-10 group-hover:opacity-[1]"
          src={floatingSprintSRC}
          alt={floatingSpriteAltText}
          style={floatingSprintExtraStyling}
        />
      )}
      <div className="absolute top-0 right-0 bottom-0 left-0 p-4 z-[1] font-IBM-Plex-Sans">
        <h5
          className="text-shadow-asthetic text-white font-bold m-0 italic text-xl transition-all duration-[0.2s] ease-in delay-[0.05s] w-max
          scale-group">
          {title}
        </h5>
        <div className="absolute flex flex-col items-center h-[74%] w-[91%]">
          <div
            className="text-shadow-helpful 
                        text-white 
                        overflow-y-hidden 
                        text-ellipsis
                        h-[52%] w-[91%] aspect-[3/2]  mb-[0.7rem] mt-[1rem] scale-group pb-[16vh]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 *
 *  Updated Card
 *
 * @param param0
 * @returns
 */
const Card: React.FC<CardProps> = ({
  // bgImage,
  // bgImageAltText,
  floatingSprintSRC,
  floatingSpriteAltText,
  floatingSprintExtraStyling,
  title,
  children
}) => {
  return (
    <div
      className="scale-group-leader w-auto relative m-2 aspect-[3/2] 
                        h-[34vh]">
      {/*background div */}
      <div
        className="top-[-10px] left-[-10px] scale-group-leader w-auto relative rounded-2xl m-2 aspect-[3/2] 
                        h-[34vh]
                        shadow-xl bg-white/0 ring-1 ring-black/5
                        backdrop-blur-lg
                        
                        "></div>
      {floatingSprintSRC && ( // Check if floatingSprintSRC is provided
        <img
          className="miniImageInCard absolute h-24 z-10"
          src={floatingSprintSRC}
          alt={floatingSpriteAltText}
          style={floatingSprintExtraStyling}
        />
      )}
      <div className="absolute top-0 right-0 bottom-0 left-0 p-4 z-[1] font-IBM-Plex-Sans">
        <h5
          className="text-shadow-asthetic text-white font-bold m-0 italic text-xl transition-all duration-[0.2s] ease-in delay-[0.05s] w-max
          scale-group">
          {title}
        </h5>
        <div className="absolute flex flex-col items-center h-[74%] w-[91%]">
          {" "}
          {/*overlay */}
          <div
            className="text-shadow-helpful 
                        text-white 
                        overflow-y-hidden 
                        text-ellipsis
                        h-[52%] w-[91%] aspect-[3/2]  mb-[0.7rem] mt-[1rem] scale-group pb-[16vh]">
            {children}
          </div>
          <Link href="/coding/registration" className="w-[29%] block sm:hidden md:block">
            <button className="bg-pink-500 p-2 rounded-md hover:bg-pink-600 duration-200 text-white font-semibold">
              <span>Sign up</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

/**
 *
 *  Updated Card but there is no funny animation thingy
 *
 * @param param0
 * @returns
 */
const CardNoAnimation: React.FC<CardProps> = ({
  // bgImage,
  // bgImageAltText,
  floatingSprintSRC,
  floatingSpriteAltText,
  floatingSprintExtraStyling,
  title,
  children
}) => {
  return (
    <div
      className="scale-group-leader w-auto relative m-2 aspect-[3/2] 
                        h-[34vh]">
      {/*background div */}
      <div
        className="top-[-10px] left-[-10px] scale-group-leader w-auto relative rounded-2xl m-2 aspect-[3/2] 
                        h-[34vh]
                        shadow-xl bg-white/0 safari-is-blur-webkit ring-1 ring-black/5"></div>
      <img
        className="miniImageInCard absolute h-24 z-10"
        src={floatingSprintSRC}
        alt={floatingSpriteAltText}
        style={floatingSprintExtraStyling}
      />
      <div className="absolute top-0 right-0 bottom-0 left-0 p-4 z-[1] font-IBM-Plex-Sans">
        <h5
          className="text-shadow-asthetic text-white font-bold m-0 italic text-xl transition-all duration-[0.2s] ease-in delay-[0.05s] w-max
          scale-group">
          {title}
        </h5>
        <div className="absolute flex flex-col items-center h-[74%] w-[91%]">
          <div
            className="text-shadow-helpful 
                        text-white 
                        overflow-y-hidden 
                        text-ellipsis
                        h-[52%] w-[91%] aspect-[3/2]  mb-[0.7rem] mt-[1rem] scale-group pb-[16vh]">
            {children}
          </div>
          <a href="/coding/registration">
            <button className="w-[29%] block sm:hidden md:block bg-pink-500 p-2 rounded-md hover:bg-pink-600 duration-200 text-white font-semibold">
              <span>Sign up</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export { Card, CardNoButton, CardNoAnimation };
