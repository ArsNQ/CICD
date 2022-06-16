import styles from './TopBar.module.css';
import {Map as MapIcon} from '@material-ui/icons';
import {Tooltip} from '@material-ui/core';
import {Link} from 'react-router-dom';
import React, {useRef, useState, useEffect} from "react";
import {Redirect} from "react-router";
import cn from "classnames";
import ItinerarySideBar from "./ItinerarySideBar/ItinerarySideBar";

const TopBar = () => {
    const sideBar = React.useRef<HTMLDivElement>(null);
    const [redirectHome, setRedirectHome] = useState(false);
    const [translate, setTranslate] = useState(false);

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const handleClick = (e: any) => {
        // @ts-ignore
        if (sideBar.current.contains(e.target)) {
            // inside click
            return;
        }
        console.log("je click à côté");
        setTranslate(false);
        // outside click
    };

    if (redirectHome) {
        return (<Redirect to={'/'}/>)
    } else {
        // @ts-ignore
        return (
            <div className={styles.TopBarContainer}>
                {window.location.pathname === "/map" && <Tooltip title={"Sauvegarder l'itinéraire"} arrow>
                    <div onClick={() => setTranslate(true)} className={styles.saveItinerary}>Mes itinéraires</div>
                </Tooltip>}
                <div onClick={() => {
                    if (window.location.pathname !== "/")
                        setRedirectHome(true)
                }} className={styles.logo}>EPIC ROAD TRIP</div>
                <Tooltip title={"Voir la carte"} arrow>
                    <Link className={styles.linkPosition} to={'/map'}>
                        <MapIcon className={styles.mapIcon}/>
                    </Link>
                </Tooltip>
                <div ref={sideBar} className={cn(styles.sideBarItinerary, translate && styles.translate || styles.translateBack)}>
                    <ItinerarySideBar/>
                </div>
                {translate && <div className={styles.background}/>}
            </div>
        );
    }
}

export default TopBar;
