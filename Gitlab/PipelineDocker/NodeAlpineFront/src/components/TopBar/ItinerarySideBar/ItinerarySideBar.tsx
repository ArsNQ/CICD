import styles from './ItinerarySideBar.module.css';
import React, {useState, useEffect, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import ItineraryResume from "./itineraryResume/itineraryResume";
import {overrideRouter} from "../../../actions/router";
import cn from "classnames";

const ItinerarySideBar = () => {
    const routerPoints: any = useSelector<any>(({router}) => router.points )
    const [itinerarySave, setItinerarySave] = useState([])
    const [isSaveEnabled, setIsSaveEnabled] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        const routerStoreString: any = localStorage.getItem('router');
        const routerStore: any = JSON.parse(routerStoreString)
        if (routerStore) {
            setItinerarySave(routerStore)
        }
    },[]);


    useEffect(() => {
        setIsSaveEnabled(true)
    },[JSON.stringify(routerPoints)])



    const saveItineraryInLocalStorage = useCallback(() => {
        if (!routerPoints) return
        const allItineraries: any = [...itinerarySave, routerPoints];
        setItinerarySave(allItineraries)
        localStorage.setItem('router', JSON.stringify(allItineraries));
        setIsSaveEnabled(false)
    }, [itinerarySave, routerPoints])

    const deleteSave = useCallback((index) => {
        const updatedItineraries = [...itinerarySave];
        updatedItineraries.splice(index, 1);
        setItinerarySave(updatedItineraries);
        localStorage.setItem('router', JSON.stringify(updatedItineraries));
    },[itinerarySave])

    const deleteRouter = useCallback((index) => {
        overrideRouter([])(dispatch)
    },[])

    const actionUse = useCallback((iti) => {
        overrideRouter(iti)(dispatch)
        setTimeout(() => {
            setIsSaveEnabled(false)
        },0)
    },[])

    return (
        <div className={styles.sideBarContainer}>

            {routerPoints.length > 1 &&(
                <>
                    <div className={styles.title}>Mon itinéraires</div>
                    <ItineraryResume itinerary={routerPoints} deleteAction={deleteRouter} />
                </>)}
            {routerPoints.length > 1 &&
            <div onClick={() => isSaveEnabled &&  saveItineraryInLocalStorage()} className={cn(styles.saveItineraryButton,!isSaveEnabled && styles.disabled)}>Sauvegarder mon itinéraire</div>}

            {!!itinerarySave.length &&
                <>
                <div style={{marginTop: '20px'}} className={styles.title}>mes itineraires sauvegardés</div>
                {
                    itinerarySave.map((itinerary: any, index: number) => (
                    <ItineraryResume key={`${itinerary.length}_${index}`} itinerary={itinerary} deleteAction={() => deleteSave(index)} actionUse={() => actionUse(itinerary)} />
                ))}
                </>
            }
        </div>
    )
}

export default ItinerarySideBar;
