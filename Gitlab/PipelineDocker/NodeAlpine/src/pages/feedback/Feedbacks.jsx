import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import "./feedback_styles.css";

export default function Profile() {
    const [feedbacks, setfeedbacks] = useState([]);
    const [finishclass, setfinishclass] = useState([]);

    const [modal, setmodal] = useState(false);
    const store = useSelector(store => store);

    const getDate = (date) => {
        var theDate = new Date(date);
        return (theDate.toGMTString());
    }

    const createFeedback = (e) => {
        setmodal(true);
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/feedback/getFeedbacks/${store.user.user._id}`, {
            method: 'GET',
            credentials: "include",
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        }).then(r => r.json()).then(r => {
            console.log(r);

            setfeedbacks(r.feedback);
        }).catch(err => {
            console.log("err", err);
        })
        fetch(`${process.env.REACT_APP_API_URL}/meetingSlots/getFinishSlot/${store.user.user._id}`, {
            method: 'GET',
            credentials: "include",
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        }).then(r => r.json()).then(r => {
            setfinishclass(r.slots);
        }).catch(err => {
            console.log("err", err);
        })
    }, );
    return (
        <div>
            <h1>Feedback</h1>
            {finishclass.map((result, id) => (
                <div key={id}>
                    {result.Student[0].firstName} {result.Student[0].lastName} {getDate(result.begin)} <button className="buttonCreateFeedback" id={result._id} onClick={e => createFeedback(e)}>Create feedback</button><br/>
                </div>
            ))}
            <hr className="solid"/>
            {feedbacks.map((feedback, id) => (
                <div key={id}>
                    {feedback.Student.firstName} {feedback.Student.lastName} {getDate(feedback.MeetingSlots.begin)}<br/>
                    Status: {feedback.status}<br/>
                    Review: {feedback.review}
                </div>
            ))}
        </div>
    );
}
