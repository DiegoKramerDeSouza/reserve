import React, { useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext } from "../Auth";
import Reserve from './pages/reserve';
import axios from "axios";
import { reservationApi } from './constants/endpoints';


const ReserveComponent = (props) => {

    const initialStorage = JSON.parse(window.localStorage.getItem('selectedEvent'));
    const eventProps = props && props.location && props.location.eventProps ? props.location.eventProps : initialStorage
    const [selectedEvent, setSelectedEvent] = useState(eventProps);
    const [reservedSeats, setReservedSeats] = useState([]);

    const fetchReservations = event => {
        if (event !== null) {
            try {
                const request = {
                    id: event.id
                };
                axios.post(reservationApi + "/getReservedSeats",
                    request,
                    { headers: { "Content-Type": "application/json" } }
                ).then(resp => {
                    if (resp && resp.data && resp.data.response) {
                        setReservedSeats(resp.data.response);
                    }
                });
            } catch (error) {
                console.error(error);
                // TO DO: add error handler
            }
        }
    };

    const { userFamilyMembers, currentUser } = useContext(AuthContext);
    const [counter, setCounter] = useState(userFamilyMembers);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const getAvailableSeatlist = () => {
        const seatList = selectedEvent.eventSeats.map(seat => {
            let available = true;
            reservedSeats.forEach(element => {
                if (element.id.seatId === seat.id.seatId) {
                    available = false;
                }
            });
            return { ...seat.id, available }
        });
        return seatList;
    }

    const onToggle = (seatId, event) => {
        let count = counter;
        const selected = selectedSeats;
        if (event.target.checked) {
            selected.push(seatId);
            count = count - 1;
        } else {
            const index = selected.indexOf(seatId);
            if (index > -1) {
                selected.splice(index, 1);
            }
            count = count + 1;
        }
        if (count >= 0) {
            setSelectedSeats(selected);
            setCounter(count);
        }
    }

    const renderSeatsColumns = (seats, column) => {

        return seats.map((seat, index) => {
            if (column === seat.seatId.charAt(0)) {
                const labelClass = seat.available ? "custom-control-label text-success" : "custom-control-label text-danger";
                return (
                    <div className="col custom-control custom-checkbox" key={index}>
                        <input type="checkbox" className="custom-control-input" onClick={event => onToggle(seat.seatId, event)} disabled={!seat.available} id={seat.seatId} />
                        <label className={labelClass} htmlFor={seat.seatId}> {seat.seatId} </label>
                    </div>
                )
            }
        });

    }

    const renderSeats = () => {
        const seats = getAvailableSeatlist();
        if (seats && seats.length > 0) {
            let column;
            seats.sort(function (a, b) { return a.seatId > b.seatId });
            return seats.map((seat, index) => {
                if (index === 0 || column !== seat.seatId.charAt(0)) {
                    column = seat.seatId.charAt(0);
                    return (
                        <div className="form-row" key={index}>
                            {renderSeatsColumns(seats, column)}
                        </div>
                    )
                }
            });
        } else {
            return (<div className="text-danger"><h2>No seats available...</h2></div>);
        }

    }

    const onSubmit = useCallback(async () => {
        const seats = selectedSeats.join(",");
        const request = {
            owner: currentUser.uid,
            event: selectedEvent.id,
            seats: seats,
            eventName: selectedEvent.name,
            eventDate: selectedEvent.startDate
        }
        
        axios.post(reservationApi + "/createReservation",
            request,
            { headers: { "Content-Type": "application/json" } }
        ).then(resp => {
            props.history.push("/");
        });
    }, [props.history]);

    useEffect(() => {
        fetchReservations(eventProps);
        window.localStorage.setItem('selectedEvent', JSON.stringify(eventProps));
    }, [selectedEvent])


    return (
        <Reserve
            event={selectedEvent}
            familyMembers={userFamilyMembers}
            counter={counter}
            selectedSeats={selectedSeats}
            reservedSeats={reservedSeats}
            onSubmit={onSubmit}
            renderSeats={renderSeats}
        />
    );
}

export default ReserveComponent;