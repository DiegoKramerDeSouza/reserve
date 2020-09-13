import React from 'react';
import { Link } from 'react-router-dom';
import { icon } from '../constants/icons';

const Home = ({ name, reservations, events, pendingEvents, pendingReservations }) => {

    const getDate = date => {
        const stringDate = new Date(date);
        return stringDate.toDateString();
    }

    const getTime = date => {
        const stringDate = new Date(date);
        return stringDate.toLocaleTimeString();
    }

    return (
        <div className="container card bg-white p-5">
            <div className="m-2">
                <h1>Welcome {name}</h1>
                <h5>These are your reservations and available events.</h5>
            </div>
            <hr />
            <div className="row">
                <div className="col col-sm-12 col-md-6">
                    <h3>Open events:</h3>
                    {pendingEvents === -1 ?
                        <div>Loading...</div> :
                        pendingEvents > 0 ?
                            events.map((event, index) => {

                                return (
                                    <div key={index++} className="card m-1">
                                        <div className="card-body">
                                            <h5 className="card-title"><b><span className="tomato">{index}.</span> {event.name}</b></h5>
                                            <p className="card-text">{icon.play} Start Date: <i>{getDate(event.startDate)}</i></p>
                                            <p className="card-text">
                                                {icon.clock} Reservations Due Date: <i>{getDate(event.reservationEndDate)} {getTime(event.reservationEndDate)}</i>
                                            </p>
                                            <div className="text-right">
                                                <Link to={{
                                                    pathname: '/reserve',
                                                    eventProps: event
                                                }} className="btn btn-outline-primary text-right">Reserve</Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <div>No Events</div>}
                </div>
                <div className="col col-sm-12 col-md-6">
                    <h3>My reservations:</h3>
                    {pendingReservations === -1 ?
                        <div>Loading...</div> :
                        pendingReservations > 0 ?
                            reservations.map((resv, index) => {

                                return (
                                    <div key={index++} className="card m-1">
                                        <div className="card-body">
                                            <h5 className="card-title"><b><span className="tomato">{index}.</span> {resv.eventName}</b></h5>
                                            <p className="card-text">{icon.play} Event date: {getDate(resv.eventDate)}</p>
                                            <p className="card-text">{icon.users} Reserved seats: {resv.seats}</p>
                                            <div className="text-right">
                                                <Link to={{
                                                    pathname: '/editReservation',
                                                    reservationProps: resv
                                                }} className="btn btn-outline-primary">Edit</Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <div>No Reservations</div>}
                </div>
            </div>
        </div>
    );
};

export default Home;