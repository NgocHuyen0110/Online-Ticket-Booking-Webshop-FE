import React, { useState, useEffect } from 'react';
import LoginPage from "./LoginPage";
import TokenManager from "../components/TokenManager";
import AuthAPI from "../Api/AuthAPI";
import UserDetails from  "../components/UserDetails";
import UserAPI from '../Api/UserAPI';

function UserPage(props) {
    const [userDetails, setUserDetails] = useState(null);
  
    const handleLogin = (email, password)=> {
      AuthAPI.login(email, password)
        .catch(() => alert("Login failed!"))
        .then(claims => props.onLoginSucceded(claims))
        .then(getUserDetails)
        .catch(error => console.error(error));
    }
  
    const getUserDetails = () => {
      
      const claims = TokenManager.getClaims();
      console.log(claims)
     

      if (claims?.roles?.includes('CUSTOMER') && claims?.customerId) {
        UserAPI.getCustomer(claims.customerId)
          .then(user => setUserDetails(user))
          .catch(error => console.error(error));
      }
      else if(claims?.roles?.includes('ADMIN') && claims?.adminId){
        UserAPI.getAdmin(claims.adminId)
          .then(user => setUserDetails(user))
          .catch(error => console.error(error));
      }
    }
  
    const handleLogout = () => {
      TokenManager.clear();
      props.onLoginSucceded(undefined);
      setUserDetails(null);
      
    }
  
    useEffect(() => {
      if (props.claims) {
        getUserDetails();
      }
    }, []);
  
  console.log("Account detail: "+ JSON.stringify(userDetails))
    return (
      <div>
        {props?.claims? (
          <div >
            {userDetails &&
              <UserDetails userDetails={userDetails} />
            }
            <br/>
           
            <button className="inputSubmit" onClick={handleLogout}>Logout</button>
          
          </div>
        ) : (
          <LoginPage onLogin={handleLogin} />
        )}
      </div>
    );
  }
export default UserPage;