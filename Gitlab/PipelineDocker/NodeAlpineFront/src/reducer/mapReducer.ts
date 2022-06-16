import { AnyAction } from 'redux'
import {UPDATE_MAP, START_FETCH_MAP, SELECT_POINT} from '../types'

export interface mapType {
    points: Array<any>,
    loading: Boolean,
    selected: Object | Boolean,
}


const initialState : mapType = {
    points: [],
    loading: false,
    selected: false,
}

 const mapReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case UPDATE_MAP:
            return({
                ...state,
                points: action.payload,
                loading: false,
                selected: false
            })
        case START_FETCH_MAP:
            return({
                ...state,
                loading: true,
                selected: false,
                points: initialState.points
            })
        case SELECT_POINT:
            return({
                ...state,
                selected: action.payload,
            })
        default:
            return state
    }
}

export default  mapReducer;
