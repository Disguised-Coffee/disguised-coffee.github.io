'use client'

import React, { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/cards";
import GLOBALSFORMRWORLDWIDE from "./const";
import { getProjects } from "@/lib/sanity";

const Content = ({
    changeHC,
    passRef
}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTag, setSelectedTag] = useState('Featured');
    const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'alphabetical'


    useEffect(() => {
        const fetchData = async () => {
            try {
                const projects = await getProjects();
                // We can't filter here yet, as we'll violate the rule of hooks
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

    // This is a quick way of sorting projects
    const filteredProjects = useMemo(() => {
        const dateFiltering = (arr) => {
            // --- SORTING ---
            if (sortBy === 'newest') {
                arr.sort((a, b) => new Date(b.date?.begin).getTime() - new Date(a.date?.begin).getTime());
            } else if (sortBy === 'oldest') {
                arr.sort((a, b) => new Date(a.date?.begin).getTime() - new Date(b.date?.begin).getTime());
            } else if (sortBy === 'alphabetical') {
                arr.sort((a, b) => a.name.localeCompare(b.name));
            }
            return arr;
        };
        
        let result = [...data];

        // --- FILTERING ---
        // if (selectedTag !== 'All') {
        //   result = result.filter(project => project.chips?.includes(selectedTag));
        // }
        console.log(result);

        // we can also have a double stack approach for having featured projects first
        // and everything else second.

        // [] be default,
        if(selectedTag === 'Featured') {
            // make a copy of the data to make the top piece
            let highlights = result.filter(project => project.isHighlight);
            highlights = dateFiltering(highlights);

            let rest = result.filter(project => !project.isHighlight);
            rest = dateFiltering(rest);

            result = [...highlights, ...rest];

            return result;
        }
        else {
            result = dateFiltering(result);
        }

        return result;
        }, [data, sortBy]);  //selectedTag, sortBy]);

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
                    filteredProjects.map((obj, key) => {
                        return (
                            <React.Fragment key={key}>
                                <Card image={obj.image} title={obj.name} dn={obj.dn} icons={obj.icons} us={changeHC} passRef={passRef} />
                            </React.Fragment>
                        )
                    })
                }
            </div>
            <p className="w-[80vw] text-center">Content made on Sanity CDN, and hosted on Github Pages.</p>
            <p className="italic font-semibold text-[0.7rem] mt-[0.7rem]">Disguised_Coffee ~ 2026</p>
        </div >
    );
}

export default Content