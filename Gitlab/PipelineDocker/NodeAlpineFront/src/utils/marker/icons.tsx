import ReactDOMServer from 'react-dom/server';
import L from 'leaflet'
import cn from "classnames";
import styles from './icons.module.css'
import React, {memo, useMemo} from "react";

interface  IconType {
    zoom: number,
    categories: Array<object>,
    isSelected?: boolean
}

export const getIcon = ({zoom, categories = [], isSelected = false}:IconType) => {
        return L.divIcon({
            className: `icon`,
            html: ReactDOMServer.renderToString(<CategoryIcon zoom={zoom} categories={categories} isSelected={isSelected} />)   ,
            iconAnchor:[15,16]
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


const getUrl : any = (category: any) => {
    const icon = category.icon;
    const size = 64;

    return `${icon.prefix}${size}${icon.suffix}`
}

export const CategoryIcon = memo(({zoom, categories = [], isSelected = false}: IconType) => {
    if (zoom < 10) return null
    const [firsCategory] = categories;
    const url = getUrl(firsCategory);

    return(
        <div className={cn(styles.container,isSelected && styles.selected)} style={{transform:  `scale(${scaleZoom[zoom] || 1 })` }} >
            <img src={url} className={styles.img} />
        </div>
    );
})