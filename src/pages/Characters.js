import { useRef } from 'react';
import { useSelector } from "react-redux";

import AppLabel from "../components/App-label";
import Loader from "../components/Loader";
import CharacterCard from "../components/Character-card";
import { useInfiniteScroll } from "../lib/hooks/useInfiniteScroll";

const Characters = () => {
    const charactersList = useSelector(state => state.characters.list);
    const isFetching = useSelector(state => state.characters.fetching);
    const nextPage = useSelector(state => state.characters.nextPage);

    const bottomBoundaryRef = useRef(null);
    useInfiniteScroll(bottomBoundaryRef);

    return (
        <>
            <AppLabel/>
            <section className='charactersContainer'>
                <div className="characters">
                    <div className="characters__wrapper">
                        {charactersList.map((character, index) => (
                            <CharacterCard character={character} key={index}/>
                        ))}
                    </div>
                    <div className="characters__loaderContainer">
                        {isFetching && <Loader/>}
                    </div>
                </div>
            </section>
            <div data-src={String(nextPage)} ref={bottomBoundaryRef}/>
        </>
    )
};

export default Characters;
