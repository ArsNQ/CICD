import { useMap } from "react-leaflet";
import L from "leaflet";
import  "leaflet-routing-machine";
import {memo, useEffect} from 'react'
import {useSelector} from "react-redux";


import {getIconMarker} from '../../../utils/marker/iconsRouting'



const Routing = memo(() => {
    const router: any = useSelector<any>(({router}) => router.points)
    console.log(router)
    const map = useMap()
    const zoom = map.getZoom()

    // @ts-ignore
    useEffect(() => {
        console.log(router)
        if (!map) return;
        // @ts-ignore
        const routingControl = L.Routing.control({
            waypoints: router.map((point: any) =>  L.latLng([point.location.lat, point.location.lng]) ),
            routeWhileDragging: false,
            addWaypoints: false,
            // @ts-ignore
            lineOptions: {
                styles: [
                    {
                        color: "dodgerblue",
                        opacity: 1,
                        weight: 4
                    }
                ]
            },
            // @ts-ignore
            createMarker: () => null,
        }).addTo(map);

        return () => map.removeControl(routingControl);
    }, [map,router]);

    return null;

})
export default Routing
