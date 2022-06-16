import styles from "./ListPoints.module.css";
import cn from "classnames";
import {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ListPointItem from "./ListPointItem/ListPointItem";
import PointFiltres from "./PointFiltres"
import {removePointRouter} from "../../actions/router";
import ListItineraryItem from "./listItineraryItem/listItineraryItem";


const ListPoints  = (props : any) => {
    const dispatch = useDispatch();
    const [activeItem, setActiveItem] = useState(1);
    const points: any = useSelector<any>(({map}) => map.points )
    const router: any = useSelector<any>(({router}) => router.points )
    const routerPoints: any = useSelector<any>(({router}) => router.points )

    return(
        <div className={styles.container}>
            <div className={styles.topSelector}>
                <div className={cn(styles.commonSelectorItem, activeItem === 1 && styles.commonSelectorItemSelected)}
                     onClick={() => setActiveItem(1)}>
                    <div className={styles.topItemText}>points d'intérêts</div>
                </div>
                <div className={cn(styles.commonSelectorItem, activeItem === 2 && styles.commonSelectorItemSelected)}
                     onClick={() => setActiveItem(2)}>
                    <div className={styles.topItemText}>itinéraire</div>
                </div>
            </div>
            <div className={styles.listContainer}>
                {activeItem === 1 &&
                    <PointFiltres />
                }
                {points && activeItem === 1 && points.map((point: any, index: number) => (
                    <ListPointItem point={point} key={index} />
                ))}
                {routerPoints && activeItem === 2 && routerPoints.map((point: any, index: number) =>(
                    <ListItineraryItem point={point} index={index}  />
                ))}
            </div>
        </div>
    )
}

export default ListPoints;
