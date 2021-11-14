import { UPDATE_ROUTER} from "../types";
import {Dispatch} from "redux";
import store from '../reducer/store';

export const addPointRouter = (router: any, point: any) => (dispatch :Dispatch) => {
    dispatch({
        type: UPDATE_ROUTER,
        payload: [...router,point].sort((a,b) => (!a.isLast && !b.isLast)? 0 : a.isLast ? 1 : -1)
    })
}

export const removePointRouter = (router: any, point: any) => (dispatch: Dispatch) => {
    dispatch({
        type: UPDATE_ROUTER,
        payload: [...router].filter((elm) => !(elm.location?.lat== point.location?.lat && elm.location?.lng === point.location?.lng))
    })
    return (store.getState());
}


export const overrideRouter = (router: any) => (dispatch: Dispatch) => {
    dispatch({
        type: UPDATE_ROUTER,
        payload: router
    })
}
