import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CHARACTERS_FETCH_REQUESTED } from "../../redux/actionTypes/characters";

export const useInfiniteScroll = scrollRef => {
    const dispatch = useDispatch();
    const scrollObserver = useCallback(node => {
        new IntersectionObserver(entries => {
            if (entries[0].intersectionRatio > 0) {
                const nextPage = entries[0].target.dataset.src;
                const url = nextPage === 'undefined' ? 'https://rickandmortyapi.com/api/character' : nextPage;
                if (nextPage !== 'null') dispatch({ type: CHARACTERS_FETCH_REQUESTED, url });
            }
        }).observe(node)
    }, [dispatch]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollObserver(scrollRef.current);
        }
    }, [scrollObserver, scrollRef]);
}
