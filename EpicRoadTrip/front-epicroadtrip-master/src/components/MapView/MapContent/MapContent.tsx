import { useMap, useMapEvent, Marker} from "react-leaflet";
import {getPointOfInterest, selectPoint} from "../../../actions/map";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useState} from 'react'
import {getIcon} from "../../../utils/marker/icons";
import Routing from "../Routing/Routing";
import {getIconMarker} from "../../../utils/marker/iconsRouting";

interface MapContentProps  {

}

const MapContent = ( ) => {
    const dispatch = useDispatch()
    const [zoom, setZoom] = useState(13)
    const map = useMap();
    useMapEvent ('moveend',(event) =>{
        const {target } = event;
        const {lat, lng} = target.getCenter()
        getPointOfInterest([lat,lng])(dispatch)
    })

    useMapEvent ('zoomend',(event) =>{
        const {target } = event;
        return setZoom(target.getZoom())
    })

    const points :any = useSelector<any>(({map}) => map.points )
    const selected :any = useSelector<any>(({map}) => map.selected )
    const router :any = useSelector<any>(({router}) => router.points )



    return(
        <>
            {
                points.map((point: any, index: Number) => {
                    const isSelected =selected.location?.lat === point.location?.lat && selected.location?.lng === point.location?.lng;
                    return(

                        <Marker key={`${point.name}_${index}`}
                                position={[point.location.lat,point.location.lng]}
                                icon={getIcon({zoom, categories:point.categories, isSelected: isSelected })}
                                eventHandlers={{
                                    click: (e) => {
                                        point.select()
                                    },
                                }}
                        />

                    )
                })
            }
            {
                router.map((point: any, index: number) => {
                    return(
                        <Marker key={`${point.name || point.address}_${index}`}
                                position={[point.location.lat,point.location.lng]}
                                icon={getIconMarker({zoom,index })}
                        />

                    )
                })
            }
            <Routing />
        </>
    );
}

export default MapContent;