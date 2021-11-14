import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import './schedule_styles.css';
import MySchedule from "../../components/MySchedule/MySchedule";

export default function Schedule() {
    const [teachers, setteachers] = useState("");
    const [teacherId, setTeacherId] = useState();
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/user/getTeacher`,{
            method: 'GET',
            credentials: "include",
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }).then(r => r.json()).then(r => {
            console.log(r);
            setteachers(r.result);
            renderTeacher();
        });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };

    const renderTeacher = () => {
        const teacherList = [];
        for (let i = 0; i < teachers.length; i++) {
            let pictureTeacher = teachers[i].pictureTeacher
            let lastName = teachers[i].lastName;
            teacherList.push(<div key={i} onClick={() => setTeacherId(teachers[i]._id)} ><img src={pictureTeacher} className="pictureTeacher"/></div>);
        }
        return teacherList;
    }
    return (
        <div className="container">
            <h4 className={"pickTeacherText"}>You can pick a teacher for see available slots</h4>
            <Slider className={"slider"} {...settings}>
                {renderTeacher()}
            </Slider>
            {teacherId && <MySchedule teacherId={teacherId} />}
        </div>
    );
}
