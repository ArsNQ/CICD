import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import './dashboard_styles.css';

export default function Dashboard(props) {
    const store = useSelector(store => store);

    return (
        <div>
            <h1 className={"title"}>Dashboard</h1>
        </div>
    );
}
