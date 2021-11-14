import styles from './SearchBlock.module.css';
import {useState} from "react";
import SearchInput from "./SearchInput/SearchInput";
import cn from "classnames";
import {getFullDataPlaceId} from "../../actions/searchPlace";
import {ADD_BEGIN, ADD_BEGIN_END} from "../../types";
import {useDispatch} from "react-redux";
import {Redirect} from "react-router";
import {overrideRouter} from "../../actions/router";

function SearchBlock() {
    const dispatch = useDispatch();
    const [activeItem, setActiveItem] = useState(1);
    const [seeAroundValue, setSeeAroundValue] = useState("");
    const [routerBegin, setRouterBegin] = useState("");
    const [routerEnd, setRouterEnd] = useState("");
    const [redirectMap, setRedirectMap] = useState(false);

    const submitSeeAround = () => {
        if (seeAroundValue) {
            overrideRouter([])(dispatch)
            getFullDataPlaceId(seeAroundValue).then((placeData: any) => {
                dispatch({
                    type: ADD_BEGIN,
                    payload: {
                        location: placeData.geometry.location,
                        address: placeData.formatted_address,
                        name: placeData.formatted_address,
                    }
                })
                setRedirectMap(true);
            })
        }
    }

    const submitRoadTrip = () => {
        if (routerBegin && routerEnd) {
            overrideRouter([])(dispatch)
            let promises = [];
            promises.push(getFullDataPlaceId(routerBegin));
            promises.push(getFullDataPlaceId(routerEnd));
            Promise.all(promises).then((result: any) => {

                //let points = [];
                let points = result.map((point: any, index: number) => ({
                    location: point.geometry.location,
                    address: point.formatted_address,
                    name: point.formatted_address,
                    isLast: index === 1
                }))
                dispatch({
                    type: ADD_BEGIN_END,
                    payload: points
                })
            });
            setRedirectMap(true);
        }
    }


    if (redirectMap) {
        return (<Redirect to={'/map'}/>)
    } else {
        return (
            <div className={styles.SearchBlockContainer}>
                <div className={styles.topPart}>
                    <div
                        className={cn(styles.topPartItemCommon, activeItem !== 1 && styles.topPartItemDisable)}
                        onClick={() => setActiveItem(1)}>
                        VOIR AUTOUR DE
                    </div>
                    <div
                        className={cn(styles.topPartItemCommon, activeItem !== 2 && styles.topPartItemDisable)}
                        onClick={() => setActiveItem(2)}>
                        ROAD TRIP
                    </div>
                </div>
                <div className={styles.BottomPart}>
                    {activeItem === 1 ? (
                            <>
                                <SearchInput style={{width: '100%'}} setterSeeAroundValue={(value: string) => setSeeAroundValue(value)}
                                             placeholder={"Indiquez votre adresse"} className={styles.input}/>
                                <div onClick={() => submitSeeAround()} className={styles.SeeAroundButton}>
                                    voir les lieux d'intérêt
                                </div>
                            </>
                        )
                        : (
                            <>
                                <SearchInput style={{width: '90%'}} setterSeeAroundValue={(value: string) => setRouterBegin(value)}
                                             className={styles.input} placeholder={"Départ"}/>
                                <SearchInput style={{width: '90%'}} setterSeeAroundValue={(value: string) => setRouterEnd(value)}
                                             className={styles.input} placeholder={"Arrivée"}/>
                                <div onClick={() => submitRoadTrip()} className={styles.roadTripButton}>voir les lieux d'intérêt</div>
                            </>
                        )}

                </div>
            </div>
        );
    }
}

export default SearchBlock;
