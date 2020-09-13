import React from "react";
import { icon } from '../constants/icons';

const SignUp = ({ onSubmit }) => {

    return (
        <div className="container card p-5">
            <div className="row justify-content-sm-center">
                <form onSubmit={event => onSubmit(event)}>
                    <h1>SignUp </h1>
                    <br />
                    <div className="form-group">
                        <label htmlFor="inputFName">First Name*</label>
                        <input name="firstName" type="text" className="form-control" id="inputFName" placeholder="Enter your first name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputLName">Last Name*</label>
                        <input name="lastName" type="text" className="form-control" id="inputLName" placeholder="Enter your last name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputMName">Middle Name</label>
                        <input name="middleName" type="text" className="form-control" id="inputMName" placeholder="Enter your middle name (Optional)" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputFMembers">Number of Family Members</label>
                        <input name="familyMembers" defaultValue="1" type="number" className="form-control" id="inputFMembers" placeholder="Enter a number btween 1 and 9" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address*</label>
                        <input name="email" type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword">Password*</label>
                        <input name="password" type="password" className="form-control" id="inputPassword" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputConfirmPassword">Confirm Password*</label>
                        <input name="confirmPassword" type="password" className="form-control" id="inputConfirmPassword" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;