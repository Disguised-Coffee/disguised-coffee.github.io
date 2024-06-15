import data from "./TestMe.json"

let MakeCards = () => {
    return data[0].name;
}

const CardsContent = () => {
    return (
        <>
            <p>
                <MakeCards />
            </p>
        </>
    )
}

export { CardsContent };