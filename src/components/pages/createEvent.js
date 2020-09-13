import React from 'react';
import { icon } from '../constants/icons';

const CreateEvent = ({ onSubmit }) => {

    return (
        <div className="container card p-5">
            <h1>{icon.add} New Event</h1>
            <hr />
            <form onSubmit={event => onSubmit(event)}>
                <div className="form-row">
                    <div className="col-md-3 mb-3">
                        <label htmlFor="eventName">{icon.book} Event Name:</label>
                        <input type="text" className="form-control" required id="eventName" name="name" placeholder="Enter the event name..." />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="startDate">{icon.play} Start date:</label>
                        <input type="date" className="form-control" required id="startDate" name="startDate" placeholder="mm/dd/yyyy" />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="endDate">{icon.calendar} Reservations due date:</label>
                        <input type="date" className="form-control" id="endDate" name="endDate" placeholder="mm/dd/yyyy" />
                        <small id="endDateHelp" className="form-text text-muted">Default date is the same event start date.</small>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="endTime">{icon.clock} Reservation due time:</label>
                        <input type="time" className="form-control" id="endTime" name="endTime" defaultValue="00:00 AM" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="description">{icon.comments} Description:</label>
                        <textarea className="form-control" id="description" name="description" placeholder="Enter the event description..." rows="3"></textarea>
                    </div>
                </div>
                <div className="text-right">
                    <button className="btn btn-outline-danger" type="submit">Create event</button>
                </div>
            </form>
        </div>
    );
};

export default CreateEvent;