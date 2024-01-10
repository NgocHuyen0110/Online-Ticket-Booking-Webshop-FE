import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MuseumApi from '../Api/MuseumApi';
import "./style.css";
import TokenManager from '../components/TokenManager';

 function CreateMuseumPage(props) {
   let navigate = useNavigate();
   const destinationUsername = "";


  const [museum, setMuseum] = useState({
    name: "",
    location: "",
    phone: "",
    description:""
}); 
 useEffect(() => {

  props.onUsernameInformed();
 
}, []);

const { name,location,phone,description } = museum;

const onInputChange = (e) => {
  setMuseum({ ...museum, [e.target.name]: e.target.value });
};



const onSubmit = (e) => {
    e.preventDefault();
    const accessToken = TokenManager.getAccessToken();
    MuseumApi.createMuseum(museum)
    .then((response) => {
      console.log(response);
      alert("Museum has been created!");
      navigate("/Museum");
    })
    .catch(error => {
        if (error.response?.status === 400
            && error.response?.data === "NAME_ALREADY_EXISTS")
            alert("Name already exists")
        else (
            alert("Something went wrong. Please try again later.")
        )
    })
    props.onMessageSend({ 'text': `Museum  ${name} is available in our website !`, 'to': destinationUsername });
   
};

    return (
      <li className="createMuseumForm" onSubmit={onSubmit}>
       <input
           type="text"
           className="inputText"
           name="name"
           placeholder="Museum name"
           value={name}
           onChange={onInputChange}
       />
       <input
           type="text"
           className="inputText"
           name="location"
           placeholder="Location"
           value={location}
           onChange={onInputChange}
       />
       <input
           type="text"
           className="inputText"
           name="phone"
           placeholder="Phone"
           value={phone}
           onChange={onInputChange}
       />
         <input
           type="text"
           className="inputText"
           name="description"
           placeholder="Description"
           value={description}
           onChange={onInputChange}
       />
        <button className="inputLogin" onClick={onSubmit} >Submit</button>
      </li>
     )
}
export default CreateMuseumPage;
