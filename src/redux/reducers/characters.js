import {
    CHARACTERS_FETCH_FAILED,
    CHARACTERS_FETCH_REQUESTED,
    CHARACTERS_FETCH_SUCCEEDED,
    REMOVE_CURRENT_CHARACTER,
} from '../actionTypes/characters';
import initialState from '../initialState';
import { EPISODE_FETCH_SUCCEEDED } from "../actionTypes/episode";

const charactersReducer = (state = initialState.characters, action) => {
    switch (action.type) {
        case CHARACTERS_FETCH_REQUESTED:
            return {
                ...state,
                fetching: true
            };
        case CHARACTERS_FETCH_SUCCEEDED:
            return {
                ...state,
                list: state.list.concat(action.response.results),
                nextPage: action.response.info.next,
                fetching: false
            };
        case REMOVE_CURRENT_CHARACTER:
            return {
                ...state,
                currentCharacter: null,
                errorMessage: ''
            };
        case CHARACTERS_FETCH_FAILED:
            return {
                ...state,
                fetching: false,
                errorMessage: action.errorMessage
            };
        case EPISODE_FETCH_SUCCEEDED:
            return {
                ...state,
                list: state.list.map(el => {
                    if (el.id === action.characterId) el.firstSeen = action.response.name;
                    return el
                })
            };
        default:
            return state;
    }
};

export default charactersReducer;
