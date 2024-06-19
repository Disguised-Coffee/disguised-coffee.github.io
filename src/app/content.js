import data from "./TestMe.json"
import Card from "@/components/cards";

const Content = () => {
    console.log(data);

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
                        console.log(obj);
                        return (
                            <>
                                <Card image={obj.image} title={obj.name} dn={obj.dn} tech={obj.tech} />
                            </>
                        )
                    })
                }
            </div>
        </div >
    );
}

export default Content