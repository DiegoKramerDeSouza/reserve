import React from 'react';
import { icon } from '../constants/icons';

const Reserve = ({ event, familyMembers, counter, selectedSeats, onSubmit, renderSeats }) => {

    const getDate = date => {
        const stringDate = new Date(date);
        return stringDate.toDateString();
    }

    const getTime = date => {
        const stringDate = new Date(date);
        return stringDate.toLocaleTimeString();
    }

    return (
        <div className="container card p-5">
            <h1>{icon.add} Make a reservation</h1>
            <br />
            <hr />
            <div className="row">
                <div className="col col-sm-12 col-md-4">
                    <div className="card m-1">
                        <div className="card-body">
                            <h5 className="card-title"><b>{event.id}. {event.name}</b></h5>
                            <p className="card-text">{icon.play} Start Date: </p><p><b>{getDate(event.startDate)}</b></p>
                            <p className="card-text">{icon.clock} Reservations Due Date: </p><p><b>{getDate(event.reservationEndDate)} {getTime(event.reservationEndDate)}</b></p>
                            <p>{icon.users} Max number of seats: <b>{familyMembers}</b></p>
                        </div>
                    </div>
                </div>
                <div className="col col-sm-12 col-md-8">
                    <div className="card m-1">
                        <div className="card-body">
                            <h5 className="card-title">Select up to {counter} seats:</h5>
                            <form className="m-3">
                                {renderSeats()}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-right">
                {selectedSeats.length !== 0 ?
                    <button onClick={() => onSubmit()} className="btn btn-outline-danger white">Reserve It</button> :
                    <button disabled={true} className="btn btn-outline-danger white">Select your seats...</button>
                }
            </div>
        </div>
    );
};

export default Reserve;