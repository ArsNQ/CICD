import styles from './Map.module.css';
import {getPointOfInterest} from '../../actions/map';
import TopBar from "../../components/TopBar/TopBar";
import cn from "classnames";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import MapView from "../../components/MapView/MapView";
import ListPoints from "../../components/ListPoints/ListPoints";

const Map = () => {
    const dispatch = useDispatch();
    const points = useSelector<any>(({map}) => map.points )
    const routerPoints = useSelector<any>(({router}) => router.points )


    useEffect(()=> {
        getPointOfInterest([51.505,-0.09])(dispatch)
    },[])
    return (
        <div className={styles.container} >
            <TopBar />
            <div className={styles.subContainer}>
                <ListPoints />
                <MapView />
            </div>
        </div>
    )
}

export default Map;
