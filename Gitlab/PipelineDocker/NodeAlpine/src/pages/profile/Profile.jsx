import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Form, FormGroup, ControlLabel, Button, ButtonToolbar} from 'rsuite';
import {Input} from 'rsuite';
import './profile_styles.css'
import {MODIFY_USER} from "../../types";
import Loading from "../../components/Loading/Loading";
import {Redirect} from "react-router-dom";

export default function Profile() {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [level, setlevel] = React.useState("A0");
    const [value] = React.useState([
        { label: "A0 - Preschool", value: "A0" },
        { label: "A1 - Starter", value: "A1-" },
        { label: "A1 - Beginner", value: "A1" },
        { label: "A2 - Elementary", value: "A2"},
        { label: "B1 - Intermediate", value: "B1"},
        { label: "B2 - Upper-Intermediate", value: "B2"},
        { label: "C1 - Advanced", value: "C1"}
    ]);
    const [age, setage] = useState("");
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);
    const [loading, setloading] = useState(false);
    const [occupation, setoccupation] = useState("");
    const [hobbies, sethobbies] = useState("");
    const [wishes, setwishes] = useState("");
    const store = useSelector(store => store);
    const dispatch = useDispatch();
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const submitProfile = async () => {
        store.user.user.level = level;
        store.user.user.firstname = firstname;
        store.user.user.lastname = lastname;
        store.user.user.age = age;
        store.user.user.occupation = occupation;
        store.user.user.hobbies = hobbies;
        store.user.user.wishes = wishes;
        setloading(true);
        await sleep(1000);
        fetch(`${process.env.REACT_APP_API_URL}/user/modifyUser`, {
            method: 'POST',
            credentials: "include",
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(store.user.user)
        }).then(res => {
            dispatch({
                type: MODIFY_USER,
                payload: store.user.user
            });
            setloading(false);
            setRedirectToDashboard(true);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        setfirstname(store.user.user.firstName);
        setlastname(store.user.user.lastName);
        setage(store.user.user.age);
        setoccupation(store.user.user.occupation);
        sethobbies(store.user.user.hobbies);
        setwishes(store.user.user.wishes);
        setlevel(store.user.user.level);
    }, []);

    if (redirectToDashboard) {
        return (
            <Redirect to="/dashboard"/>
        );
    }
    else if (loading) {
        return (<Loading/>);
    } else {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Form>
                            <legend><span className="number">1</span> Your Basic Info</legend>
                            <FormGroup>
                                <ControlLabel>First name</ControlLabel>
                                <Input className="profileEdit" value={firstname} onChange={e => setfirstname(e)} name="firstname" type="text" />
                            </FormGroup>
                            <FormGroup>
                                <label for="lastname">Last name</label>
                                <Input className="profileEdit" id="lastname" value={lastname} onChange={e => setlastname(e)} name="lastname" type="text" />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Age</ControlLabel>
                                <Input className="profileEdit" value={age} onChange={e => setage(e)} name="age" type="text"/>
                            </FormGroup>
                            <legend><span className="number">2</span> Your Profile</legend>
                            <FormGroup>
                                <ControlLabel>Occupation</ControlLabel>
                                <Input className="profileEdit" value={occupation} onChange={e => setoccupation(e)} name="occupation" type="text"/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Hobbies</ControlLabel>
                                <Input className="profileEdit" value={hobbies} onChange={e => sethobbies(e)} name="hobbies" type="text"/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Wishes</ControlLabel>
                                <Input className="profileEdit" value={wishes} componentClass="textarea" onChange={e => setwishes(e)} name="wishes" type="text"/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Level</ControlLabel>
                                <select className="profileEdit" value={level} onChange={e => setlevel(e.currentTarget.value)}>
                                    {value.map(value => (
                                        <option
                                            key={value.value}
                                            value={value.value}
                                        >
                                            {value.label}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <div className="profileAlignCenter">
                                    <ButtonToolbar>
                                        <button onClick={() => submitProfile()}>Submit</button>
                                    </ButtonToolbar>
                                </div>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

