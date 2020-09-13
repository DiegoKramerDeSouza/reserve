import React, { Component, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import app from '../base.js';
import { AuthContext } from '../Auth';
import { icon } from './constants/icons';

class NavBar extends Component {

    LoginButtons = () => {
        return (
            <React.Fragment>
                <form className="form-inline my-2 my-lg-0" align="right">
                    <NavLink className="btn btn-sm btn-primary m-1 my-2 my-sm-0" exact to="/login">Login</NavLink>
                </form>
                <form className="form-inline my-2 my-lg-0" align="right">
                    <NavLink className="btn btn-sm btn-outline-primary m-1 my-2 my-sm-0" exact to="/signup">Sign up</NavLink>
                </form>
            </React.Fragment>
        );
    }

    SignOutButtons = () => {
        return (
            <form className="form-inline my-2 my-lg-0" align="right">
                <button className="btn btn-sm btn-outline-danger m-1 my-2 my-sm-0" onClick={() => app.auth().signOut()}>Sign out</button>
            </form>
        );
    }

    RenderButtons = () => {
        const { currentUser } = useContext(AuthContext);
        if (currentUser) {
            return (
                <this.SignOutButtons />
            );
        } else {
            return (
                <this.LoginButtons />
            );
        }
    }

    AdminLinks = () => {
        return (
            <React.Fragment>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/createEvent">{icon.add} New Event</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/registerSeats">{icon.users} Register Seats</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/configuration">{icon.userCog} Configuration</NavLink>
                </li>
            </React.Fragment>
        )

    }

    RenderAdminLinks = () => {
        const { userGroup } = useContext(AuthContext);
        if (userGroup === 0) {
            return (
                <this.AdminLinks />
            )
        } else {
            return (<li></li>);
        }
    }

    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
                <a className="navbar-brand mr-5" href="#">{icon.checkTitle} Reserve<b className="tomato"> It</b></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/">{icon.home} Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/profile">{icon.profile} Profile</NavLink>
                        </li>
                        <this.RenderAdminLinks />
                    </ul>
                    <this.RenderButtons />
                </div>
            </nav>
        );
    }
}

export default NavBar;