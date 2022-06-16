import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet'
import styles from './MapView.module.css'
import MapContent from "./MapContent/MapContent";
import {useRef} from "react";
import {useSelector} from "react-redux";

const MapView = () => {

    return (
            <MapContainer   className={styles.container} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} >
                <MapContent  />
                <TileLayer

                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

            </MapContainer>

)}



export default MapView;