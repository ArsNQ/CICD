import { AnyAction } from 'redux'
import {ADD_BEGIN, ADD_BEGIN_END, UPDATE_ROUTER} from "../types";


export interface RouterType {
    points: Array<any>,

}


const initialState : RouterType = {
    points: [],
}

const RouterReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case ADD_BEGIN:
            return({
                ...state,
                points: [action.payload]
            })
        case ADD_BEGIN_END:
            return({
                ...state,
                points: action.payload
            })

        case UPDATE_ROUTER:
            return ({
                ...state,
                points: action.payload
            })
        default:
            return state
    }
}

export default  RouterReducer;
