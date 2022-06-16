import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";

export default function Home() {
    const store = useSelector(store => store);

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}
