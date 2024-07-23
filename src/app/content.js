import React from "react";
import data from "./cardData.json"
import { Card } from "@/components/cards";

const Content = ({
    changeHC,
    passRef
}) => {

    return (
        <div id="projects"
            className="pt-[10vh] flex-col
                        [scroll-padding:_40px] [scroll-snap-align:_start_none] 
                        text-white top-10px h-auto bg-void
                        flex items-center z-3">
            <div >
                <h1 className="font-semibold text-[2rem] text-center">My previous projects!</h1>
                <p className="text-center">(click for more info!)</p>
            </div>
            <div className="w-[60vw] flex flex-wrap justify-center min-h-[100vh] ml-auto mr-auto">
                {
                    data.map((obj, key) => {
                        return (
                            <React.Fragment key={key}>
                                <Card image={obj.image} title={obj.name} dn={obj.dn} tech={obj.tech} us={changeHC} passRef={passRef} />
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div >
    );
}

export default Content