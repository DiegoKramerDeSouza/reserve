import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../base";
import { AuthContext } from "../Auth";
import axios from "axios";
import SignUp from './pages/signup';
import { reservationApi } from './constants/endpoints'

const SignUpComponent = ({history}) => {

    const handleSignUp = useCallback(async event => {

        event.preventDefault();
        const { email, password, firstName, lastName, middleName, familyMembers } = event.target.elements;
        try {
            const request = {
                id: null,
                firstName: firstName.value,
                lastName: lastName.value,
                middleName: middleName.value,
                email: email.value,
                familyMembers: familyMembers.value,
                userGroup: {
                    id: 1,
                    name: "User"
                }
            }
            await app
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value).then(response  => {
                if(response && response.user && response.user.uid){
                    request.id = response.user.uid;

                    try{
                        axios.post(reservationApi + "/signup", 
                            request,
                            { headers: {"Content-Type": "application/json"}}
                        ).then(resp => {
                            history.push("/");
                        });
                    } catch(error){
                        response.user.delete().then(resp => console.error("Unable to save user.", error));
                    }
                    
                }
            });
            
        } catch (error) {
            console.error(error);
        }
    }, [history]);

    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <SignUp onSubmit={handleSignUp} />
    );
}

export default withRouter(SignUpComponent);