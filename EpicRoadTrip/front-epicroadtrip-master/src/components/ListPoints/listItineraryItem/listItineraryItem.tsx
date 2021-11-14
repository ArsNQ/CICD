import styles from "./listItineraryItem.module.css";
import cn from "classnames";
import {useDispatch, useSelector} from 'react-redux'
import {useCallback} from "react";
import {removePointRouter} from "../../../actions/router";
import {IconFirstItinerary, IconLastItinerary} from "../../../utils/iconItinerary";


const ListItineraryItem = ({point, index, removeFromRouter}: any) => {
    const dispatch = useDispatch();
    const router: any = useSelector<any>(({router}) => router.points)

    const removeItemFromRouter = useCallback((point: any) => {
        removePointRouter(router, point)(dispatch)
    },[router])

    return (
        <div className={cn(styles.container, )} >
            <div className={cn(styles.containerLeft, )} >
                <IconItinerary index={index} router={router} />
                <span className={styles.title}>{point.name}</span>
            </div>

            <div onClick={() => removeItemFromRouter(point)} className={cn(styles.iconDeleteContainer)}>
                <span className={cn(styles.iconDelete)}>+</span>
            </div>
        </div>
    )
}


const IconItinerary = ({index, router}:any) => {
    if (index === 0 ) return <IconFirstItinerary />
    if (index === router.length - 1 ) return <IconLastItinerary />
    return(
        <div className={styles.icon}>
            <span>{index}</span>
        </div>
    )
}

export default ListItineraryItem;
