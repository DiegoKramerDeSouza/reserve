import React, { useEffect, useState, createContext } from "react";
import app from "./base.js";
import axios from "axios";
import { reservationApi } from './components/constants/endpoints'
import { icons2x } from './components/constants/icons';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userFamilyMembers, setUserFamilyMembers] = useState(null);
  const [userGroup, setUserGroup] = useState(1);
  const [userReservations, setUserReservations] = useState([]);
  const [pending, setPending] = useState("loading");

  const handleAuthUser = userId => {
    try{
      const request = {
        id: userId
      };
      axios.post(reservationApi + "/getUser", 
          request,
          { headers: {"Content-Type": "application/json"}}
      ).then(resp => {
          if(resp && resp.data && resp.data.response){
            setUserName(resp.data.response.firstName);
            setUserFamilyMembers(resp.data.response.familyMembers);
            setUserReservations(resp.data.response.reservations);
            setUserGroup(resp.data.response.userGroup.id);
            setPending("ready");
          } else {
            app.auth().signOut();
          }
      });
      
    } catch (error) {
      console.error(error);
      app.auth().signOut();
      // TO DO: add error handler
    };
  };

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      if(user && user.uid){
        handleAuthUser(user.uid);
      }
    });
  }, []);

  if(pending === "loading"){
    return (<div className="loading-parent"><div className="loading-child text-center"><p>{icons2x.fan}</p>Loading...</div></div>);
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userName,
        userReservations,
        userFamilyMembers,
        userGroup
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};