'use client'

import React, { useState, useEffect } from "react";
import { Card } from "@/components/cards";
import GLOBALSFORMRWORLDWIDE from "./const";
import { getProjects } from "@/lib/sanity";

const Content = ({
    changeHC,
    passRef
}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projects = await getProjects();
                setData(projects || []);
            } catch (error) {
                console.error('Failed to fetch projects:', error);
                setData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div id="projects"
                className="pt-[10vh] flex-col
                            [scroll-padding:_40px] [scroll-snap-align:_start_none] 
                            text-white top-10px h-auto bg-void
                            flex items-center z-3 pb-[5vh]">
                <div className="w-[100vw] sm:w-[80vw] xl:w-[60vw] flex flex-wrap justify-center min-h-[90vh] ml-auto mr-auto mb-[2vh]">
                    <p className="text-center">Loading projects...</p>
                </div>
            </div>
        );
    }

    return (
        <div id="projects"
            className="pt-[10vh] flex-col
                        [scroll-padding:_40px] [scroll-snap-align:_start_none] 
                        text-white top-10px h-auto bg-void
                        flex items-center z-3 pb-[5vh]">
            <div >
                <h1 className="font-semibold text-[2rem] text-center">My previous projects!</h1>
                <p className="text-center">(click for more info!)</p>
            </div>
            <div className="w-[100vw] sm:w-[80vw] xl:w-[60vw] flex flex-wrap justify-center min-h-[90vh] ml-auto mr-auto mb-[2vh]">
                {
                    data.map((obj, key) => {
                        return (
                            <React.Fragment key={key}>
                                <Card image={obj.image} title={obj.name} dn={obj.dn} icon={obj.icon} us={changeHC} passRef={passRef} />
                            </React.Fragment>
                        )
                    })
                }
            </div>
            <p className="w-[80vw] text-center">Content last updated {GLOBALSFORMRWORLDWIDE.lastUpdated}, and hosted on Github Pages.</p>
            <p className="italic font-semibold text-[0.7rem] mt-[0.7rem]">Disguised_Coffee ~ 2024</p>
        </div >
    );
}

export default Content