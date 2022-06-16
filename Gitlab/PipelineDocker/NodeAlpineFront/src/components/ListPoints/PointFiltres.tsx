import styles from "./ListPoints.module.css";
import cn from "classnames";

import LocalBarIcon from '@material-ui/icons/LocalBar';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import HotelIcon from '@material-ui/icons/Hotel';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';

import {getPointOfInterest} from "../../actions/map";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";

const PointFiltres = () => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('explore');

    useEffect(() => {
        getPointOfInterest([51.505,-0.09], 1000, filter)(dispatch)
    }, [filter])

    const updatePointsList = (type: string) => {
        if (filter === type) {
            setFilter('explore')
        } else {
            setFilter(type);
        }
    }

    return (
        <div className={styles.filtres_container}>
            <button className={cn(styles.filtres_button, filter === 'eat' && styles.filtres_button_selected)}
                    onClick={() => updatePointsList("eat")}  title={"Looking for eating"}>
                <FastfoodIcon />
            </button>
            <button className={cn(styles.filtres_button, filter === 'drink' && styles.filtres_button_selected)}
                    onClick={() => updatePointsList("drink")} title={"Looking for drinks"}>
                <LocalBarIcon />
            </button>
            <button className={cn(styles.filtres_button, filter === 'shopping' && styles.filtres_button_selected)}
                    onClick={() => updatePointsList("shopping")} title={"Looking for shopping"}>
                <ShoppingBasketIcon />
            </button>
            <button className={cn(styles.filtres_button, filter === 'sleep' && styles.filtres_button_selected)}
                    onClick={() => updatePointsList("sleep")} title={"Looking for hotels"}>
                <HotelIcon />
            </button>
            <button className={cn(styles.filtres_button, filter === 'travel' && styles.filtres_button_selected)}
                    onClick={() => updatePointsList("travel")} title={"Looking for Transport"}>
                <CardTravelIcon />
            </button>
            <button className={cn(styles.filtres_button, filter === 'enjoy' && styles.filtres_button_selected)}
                    onClick={() => updatePointsList("enjoy")} title={"Looking for local activity"}>
                <LocalActivityIcon />
            </button>
        </div>
    )
}

export default PointFiltres;