
import {useCallback, useState} from "react";
import styles from './itineraryResume.module.css'
import cn from "classnames";
import {IconFirstItinerary, IconLastItinerary} from "../../../../utils/iconItinerary";




const ItineraryResume = ({itinerary, deleteAction, actionUse}: any) => {
    const [isOpen, setIsOpen] = useState(false)
    const [firstElm] = itinerary;
    const lastElm = itinerary[itinerary.length - 1]

    const isSmaller = firstElm.name.length + lastElm.name.length > 30

    return (
        <div className={styles.container}>
            <div onClick={() => setIsOpen(!isOpen)} className={styles.titleContainer}>
                <div className={styles.title}>
                    <span className={cn(styles.titleText, isSmaller && styles.titleTextSmaller)}>{firstElm.name}</span>
                    <Arrow />
                    <span className={cn(styles.titleText, isSmaller && styles.titleTextSmaller)}>{lastElm.name}</span>
                </div>
                <div className={styles.actionContainer}>
                    {actionUse !== undefined && <Use actionUse={actionUse} />}
                    <div onClick={deleteAction} className={cn(styles.iconDeleteContainer)}>
                        <span className={cn(styles.iconDelete)}>+</span>
                    </div>
                </div>

            </div>
            <div className={cn(styles.details, isOpen && styles.open)}>
                {
                    itinerary.map((detail: any, index:number) => {
                        return (
                            <div className={styles.item}><IconItinerary index={index} /><span>{detail.name}</span></div>
                        )
                    })
                }
            </div>

        </div>
    )
}

const IconItinerary = ({index}:any) => {
    return(
        <div className={styles.icon}>
            <span>{index}</span>
        </div>
    )
}

const Arrow = () => {
    return(
        <svg className={styles.arrow} height="10px"   version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 480.026 480.026" >
            <g>
		    <path d="M475.922,229.325l-144-160c-3.072-3.392-7.36-5.312-11.904-5.312h-96c-6.304,0-12.032,3.712-14.624,9.472    c-2.56,5.792-1.504,12.544,2.72,17.216l134.368,149.312l-134.368,149.28c-4.224,4.704-5.312,11.456-2.72,17.216    c2.592,5.792,8.32,9.504,14.624,9.504h96c4.544,0,8.832-1.952,11.904-5.28l144-160    C481.394,244.653,481.394,235.373,475.922,229.325z"/>
            </g>
            <g>

		<path d="M267.922,229.325l-144-160c-3.072-3.392-7.36-5.312-11.904-5.312h-96c-6.304,0-12.032,3.712-14.624,9.472    c-2.56,5.792-1.504,12.544,2.72,17.216l134.368,149.312L4.114,389.293c-4.224,4.704-5.312,11.456-2.72,17.216    c2.592,5.792,8.32,9.504,14.624,9.504h96c4.544,0,8.832-1.952,11.904-5.28l144-160    C273.394,244.653,273.394,235.373,267.922,229.325z"/>

        </g>
        </svg>
    )
}


const Use = ({actionUse}:any) => {
    const action = useCallback((event) => {
        event.stopPropagation();
        actionUse();
    },[])
    return(
        <div className={styles.use} onClick={action}>
        <svg fill="white" height="15px" width="15px"   version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 148.961 148.961" >
        <g>
        <path d="M146.764,17.379c-2.93-2.93-7.679-2.929-10.606,0.001L68.852,84.697L37.847,53.691c-2.93-2.929-7.679-2.93-10.606-0.001   c-2.93,2.929-2.93,7.678-0.001,10.606l36.309,36.311c1.407,1.407,3.314,2.197,5.304,2.197c1.989,0,3.897-0.79,5.304-2.197   l72.609-72.622C149.693,25.057,149.693,20.308,146.764,17.379z"/>
        <path d="M130.57,65.445c-4.142,0-7.5,3.357-7.5,7.5v55.57H15V20.445h85.57c4.143,0,7.5-3.357,7.5-7.5c0-4.142-3.357-7.5-7.5-7.5   H7.5c-4.142,0-7.5,3.357-7.5,7.5v123.07c0,4.143,3.358,7.5,7.5,7.5h123.07c4.143,0,7.5-3.357,7.5-7.5v-63.07   C138.07,68.803,134.713,65.445,130.57,65.445z"/>
        </g>
        </svg>
        </div>
    )
}

export default ItineraryResume;