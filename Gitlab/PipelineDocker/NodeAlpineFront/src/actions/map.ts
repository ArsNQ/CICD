import axios from "axios";
import {Dispatch} from "redux";

import {SELECT_POINT, START_FETCH_MAP, UPDATE_MAP} from '../types'


export const getPointOfInterest = (center : Array<Number>, radius: Number = 10000, type: string = "explore") => (dispatch: Dispatch) => {
    dispatch({
        type:START_FETCH_MAP,
    })
    return axios.get(`${process.env.REACT_APP_API}/places/${type}?radius=${radius}&ll=${center.splice(0,2).join(',')}`)
        .then(({data}: any) => {
            const pointsOfInterest = data.data[0]?.items;
            return dispatch({
                type:UPDATE_MAP,
                payload:pointsOfInterest.map((val: any) => ({
                    ...val,
                    select : () => {
                        dispatch({
                            type:SELECT_POINT,
                            payload:val
                        })
                    }
                }) )
            })
        })
}

export const selectPoint = (point: any) => (dispatch: Dispatch) => {
    return dispatch({
        type:SELECT_POINT,
        payload:point
    })
}
