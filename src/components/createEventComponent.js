import React, { useCallback, useContext, useState, useEffect } from 'react';
import { AuthContext } from "../Auth";
import CreateEvent from './pages/createEvent';
import axios from "axios";
import { reservationApi } from './constants/endpoints';

const CreateEventComponent = ({ history }) => {

    const dummySeats = [
        { id: { seatId: "D0" } }
    ];
    const { currentUser, userGroup } = useContext(AuthContext);
    const [seats, setSeats] = useState([]);

    const fetchSeats = () => {

        try {
            const request = { id: currentUser.uid }
            if (userGroup === 0) {
                axios.post(reservationApi + "getSeats",
                    request,
                    { headers: { "Content-Type": "application/json" } }
                ).then(resp => {
                    console.log(resp);
                    if (resp && resp.data && resp.data.response) {
                        resp.data.response.forEach(seat => {
                            const item = { seatId: "" }
                            const obj = { id: item }
                            const seatList = [];
                            if (seat.id) {
                                item.seatId = seat.id;
                                obj.id = item;
                                const newArr = seats;
                                newArr.push(obj);
                                setSeats(newArr);
                            }
                        });
                    }
                });
            } else {
                history.push('/');
            }
        } catch (e) {
            console.error(e);
            // TO DO: add error handler
        }
    };

    const formatDate = (date, time = "00:00") => {
        const jsDate = new Date(date);
        const splitDate = jsDate.toISOString().split("T");
        const formatedDate = `${splitDate[0]}T${time}:00.000-05:00`;
        return formatedDate;
    };

    const handleCreateEvent = useCallback(async event => {
        event.preventDefault();
        const { startDate, endDate, name, description, endTime } = event.target;
        if (userGroup === 0) {
            const dateStart = formatDate(startDate.value);
            const dateEnd = formatDate(endDate.value, endTime.value);
            const request = {
                startDate: dateStart,
                reservationEndDate: dateEnd,
                name: name.value,
                eventSeats: seats,
                description: description.value
            };
            console.log("====> ", request)
            axios.post(reservationApi + "createEvent",
                request,
                { headers: { "Content-Type": "application/json" } }
            ).then(resp => {
                if (resp && resp.data && resp.data.response) {
                    history.push("/");
                }
            });
        }

    }, [history]);

    useEffect(() => fetchSeats(), []);

    return (
        <CreateEvent onSubmit={handleCreateEvent} />
    );

}

export default CreateEventComponent;