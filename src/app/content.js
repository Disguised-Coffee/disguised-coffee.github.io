import React from "react";
import data from "./TestMe.json"
import Card from "@/components/cards";

const Content = ({
    changeHC
}) => {
    let key_ = -1;

    return (
        <div className="pt-[10vh] flex-col
                        [scroll-padding:_40px] [scroll-snap-align:_start_none] 
                        text-white top-10px h-auto bg-void
                        flex items-center">
            <div>
                <h1>My previous projects!</h1>
                <p>(hover for more info!)</p>
            </div>
            <div className="w-[60vw] flex flex-wrap justify-center min-h-[100vh]">
                {
                    data.map((obj) => {
                        key_++;
                        console.log(key_);
                        return (
                            <React.Fragment key={key_}>
                                <Card image={obj.image} title={obj.name} dn={obj.dn} tech={obj.tech} us={changeHC} key={key_}/>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div >
    );
}

export default Content