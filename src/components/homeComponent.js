import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../Auth";
import Home from './pages/home';
import axios from "axios";
import { reservationApi } from './constants/endpoints'


const HomeComponent = () => {

    const [reservationList, setReservationList] = useState([]);
    const [eventList, setEventList] = useState([]);
    const [eventsPending, setEventsPending] = useState(-1);
    const [reservationsPending, setReservationsPending] = useState(-1);
    const { currentUser, userName } = useContext(AuthContext);
    const fetchReservations = () => {

        try {
            const request = {
                id: currentUser.uid
            };
            console.log(reservationApi);
            axios.post(reservationApi + "/getReservations",
                request,
                { headers: { "Content-Type": "application/json" } }
            ).then(resp => {
                if (resp && resp.data && resp.data.response) {
                    setReservationList(resp.data.response);
                }
                setReservationsPending(resp && resp.data && resp.data.response ? resp.data.response.length : 0 );
            });

            axios.post(reservationApi + "/getEvents",
                request,
                { headers: { "Content-Type": "application/json" } }
            ).then(resp => {
                if (resp && resp.data && resp.data.response) {
                    setEventList(resp.data.response);
                }
                setEventsPending(resp && resp.data && resp.data.response ? resp.data.response.length : 0 );
            });



        } catch (error) {
            console.error(error);
            // TO DO: add error handler
        }
    };
    useEffect(() => fetchReservations(), []);

    return (
        <Home name={userName} reservations={reservationList} events={eventList} pendingEvents={eventsPending} pendingReservations={reservationsPending}/>
    );
}

export default HomeComponent;