import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import './schedule_styles.css';
import Paper from '@material-ui/core/Paper';
import {ViewState} from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Appointments,
    Toolbar,
    DateNavigator,
    AppointmentTooltip,
    TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';
import {makeStyles} from '@material-ui/core/styles';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import {Grid, IconButton} from "@material-ui/core";
import {Room} from "@material-ui/icons";

export default function MySchedule(props) {
    const store = useSelector(store => store.user.user);
    const [appointments, setAppointments] = useState([]);

    const useStyles = makeStyles(theme => ({
        todayCell: {
            backgroundColor: fade(theme.palette.primary.main, 0.1),
            '&:hover': {
                backgroundColor: fade(theme.palette.primary.main, 0.14),
            },
            '&:focus': {
                backgroundColor: fade(theme.palette.primary.main, 0.16),
            },
        },
        weekendCell: {
            backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
            '&:hover': {
                backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
            },
            '&:focus': {
                backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
            },
        },
        today: {
            backgroundColor: fade(theme.palette.primary.main, 0.16),
        },
        weekend: {
            backgroundColor: fade(theme.palette.action.disabledBackground, 0.06),
        },
    }));

    const createAppointmentData = (slots) => {
        console.log("slots", slots);
        let data = [];
        slots.map((slot, id) => {
            let tmpSlot = {};
            tmpSlot.title = "English course";
            tmpSlot.startDate = new Date(slot.begin);
            tmpSlot.endDate = new Date(slot.end);
            tmpSlot.id = slot._id;
            tmpSlot.status = slot.status;
            tmpSlot.location = "Online";
            data.push(tmpSlot);
        })
        setAppointments(data);
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/meetingSlots/getTeacherSlots/${props.teacherId}`, {
            method: 'GET',
            credentials: "include",
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }).then(r => r.json())
            .then(response => {
                createAppointmentData(response.slots);
            });
    }, [props.teacherId]);

    const TimeTableCell = (props) => {
        const classes = useStyles();
        const {startDate} = props;
        const date = new Date(startDate);

        if (date.getDate() === new Date().getDate()) {
            return <WeekView.TimeTableCell {...props} className={classes.todayCell}/>;
        }
        if (date.getDay() === 0 || date.getDay() === 6) {
            return <WeekView.TimeTableCell {...props} className={classes.weekendCell}/>;
        }
        return <WeekView.TimeTableCell {...props} />;
    };

    const DayScaleCell = (props) => {
        const classes = useStyles();
        const {startDate, today} = props;

        if (today) {
            return <WeekView.DayScaleCell {...props} className={classes.today}/>;
        }
        if (startDate.getDay() === 0 || startDate.getDay() === 6) {
            return <WeekView.DayScaleCell {...props} className={classes.weekend}/>;
        }
        return <WeekView.DayScaleCell {...props} />;
    };

    const registerToSlot = (data) => {
        console.log(data);
        fetch(`${process.env.REACT_APP_API_URL}/meetingSlots/fillSlotWithStudent`, {
            method: 'POST',
            credentials: "include",
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                slotId: data.id,
                student: store._id
            })
        }).then(r => r.json())
            .then(response => {
                console.log(response);
            });
    }

    const Header = withStyles({name: 'Header'})(({
                                                     children, appointmentData, classes, ...restProps
                                                 }) => (
        <AppointmentTooltip.Header
            {...restProps}
            appointmentData={appointmentData}
        >
            <div className={"registerToCourseButton"} onClick={() => registerToSlot(appointmentData)}>
                Register to this course
            </div>
        </AppointmentTooltip.Header>
    ));

    const Appointment = ({
                             children, style, ...restProps
                         }) => {
        console.log("rest", restProps.data.status);
        let color = "#FFC107";
        if (restProps.data.status === "Open") {
            color = "#95dd53";
        }
        return (
        <Appointments.Appointment
            {...restProps}
            style={{
                ...style,
                backgroundColor: color,
                borderRadius: '8px',
            }}
        >
            {children}
        </Appointments.Appointment>
    )};

    return (
        <div>
            {appointments && <Paper>
                <Scheduler
                    data={appointments}
                    height={660}
                >
                    <ViewState/>
                    <WeekView
                        startDayHour={8}
                        endDayHour={21}
                        timeTableCellComponent={TimeTableCell}
                        dayScaleCellComponent={DayScaleCell}
                    />
                    <Toolbar/>
                    <DateNavigator/>
                    <TodayButton/>
                    <Appointments
                        appointmentComponent={Appointment}
                    />
                    <AppointmentTooltip
                        headerComponent={Header}
                        showCloseButton
                    />
                </Scheduler>
            </Paper>}
        </div>
    );
}
