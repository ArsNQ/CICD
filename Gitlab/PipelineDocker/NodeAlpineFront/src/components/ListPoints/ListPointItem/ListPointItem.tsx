import styles from "./ListPointItem.module.css";
import cn from "classnames";
import {useDispatch, useSelector} from 'react-redux'
import {CategoryIcon} from '../../../utils/marker/icons'
import {useCallback} from "react";
import {addPointRouter, removePointRouter} from "../../../actions/router";

const ListPointItem = ({point}: any) => {
    const dispatch = useDispatch();
    const selected: any = useSelector<any>(({map}) => map.selected)
    const router: any = useSelector<any>(({router}) => router.points)
    const isSelected = selected.location?.lat === point.location?.lat && selected.location?.lng === point.location?.lng;
    const isInRouter = router.some((elm:any) => elm.location?.lat === point.location?.lat && elm.location?.lng === point.location?.lng)

    const handleRouter = useCallback(() => {
        if (isInRouter) {
            return removePointRouter(router, point)(dispatch)
        }
        addPointRouter(router, point)(dispatch)
    },[router, point, isInRouter])

    return (
        <div className={cn(styles.container, isSelected && styles.containerSelected)} onClick={point.select}>
            <div onClick={handleRouter} className={cn(styles.addToRouter, isInRouter && styles.isInRouter)}>
                <span className={cn(styles.icon, isInRouter && styles.iconInRouter)}>+</span>
            </div>
            <div className={cn(styles.name, isSelected && styles.selectedName)}>{point.name}</div>

            {
                point.categories.map((val: any, index: number) => (
                        <div key={index} className={styles.category}>
                            <CategoryIcon zoom={16} isSelected={false} categories={[val]}/>
                            <span className={styles.categoryText}>{val.name}</span>
                        </div>
                    )
                )}
            <div className={styles.address}>
                {point.location.formattedAddress[0]} {point.location.formattedAddress[1]} {point.location.formattedAddress[2]}
            </div>
        </div>
    )
}

export default ListPointItem;
