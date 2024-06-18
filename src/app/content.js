import data from "./TestMe.json"
import Card from "@/components/cards";

const Content = () => {
    console.log(data);

    return (
        <div className="[scroll-snap-align:_start_none]text-white top-10px h-[100vh] bg-void">
            <div>
                <h1>My previous projects!</h1>
                <p>(hover for more info!)</p>
            </div>
            {
                data.map((obj) => {
                    console.log(obj);
                    return (
                        <Card image={obj.image} title={obj.name} dn={obj.dn} tech={obj.tech}/>
                    )
                })
            }
        </div>
    );
}

export default Content