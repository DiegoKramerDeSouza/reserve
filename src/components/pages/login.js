import React, { useCallback, useContext } from 'react';
import { icon } from '../constants/icons';

const Login = ({ onSubmit }) => {

    return (
        <div className="container card p-5">
            <div className="row justify-content-sm-center">
                <form onSubmit={event => onSubmit(event)}>
                    <h1>Login page</h1>
                    <br />
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address:</label>
                        <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Login;