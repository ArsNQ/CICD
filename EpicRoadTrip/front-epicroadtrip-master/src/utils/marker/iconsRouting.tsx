import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import React, {memo} from "react";
import {CategoryIcon} from "./icons";
import cn from "classnames";
import styles from "./icons.module.css";


interface  IconType {
    zoom: number,
    index: number
}


export const getIconMarker = ({zoom, index}:IconType) => {
    return L.divIcon({
        className: `icon`,
        html: ReactDOMServer.renderToString(<RoutingIcon zoom={zoom}  index={index} />),
        iconAnchor:[13,40]
    });
}



const scaleZoom : any = {
    10:0.25,
    11:0.35,
    12:0.45,
    13:0.55,
    14:0.65,
    15:0.75,
    16:0.85,
    17:0.95,
    18:1,
}


export const RoutingIcon = memo(({zoom, index = 0}: IconType) => {
    return(
        <svg data-v-19148914="" width="30" height="40.5" viewBox="0 0 22 29" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path data-v-19148914="" fill="dodgerblue"
                  d="M10.9709 0.805908C5.3971 0.805908 0.878662 5.32435 0.878662 10.8981C0.878662 16.6161 7.22812 25.0561 9.85498 28.3015C10.4317 29.0137 11.5101 29.0137 12.0868 28.3015C14.7137 25.0561 21.0631 16.6161 21.0631 10.8981C21.0631 5.32435 16.5447 0.805908 10.9709 0.805908ZM10.9709 14.5025C8.97984 14.5025 7.36653 12.8892 7.36653 10.8981C7.36653 8.90709 8.97984 7.29377 10.9709 7.29377C12.962 7.29377 14.5753 8.90709 14.5753 10.8981C14.5753 12.8892 12.962 14.5025 10.9709 14.5025Z"></path>
            <circle data-v-19148914="" cx="10.9709" cy="11.0291" r="7.86408" fill="white"></circle>
            <text style={{fill: 'black'}} data-v-19148914="" x="7.5" y="15.5" className="text-marker">{index + 1}</text>
        </svg>
    );
})