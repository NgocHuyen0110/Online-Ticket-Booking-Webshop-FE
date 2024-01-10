import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import MuseumApi from "../Api/MuseumApi";

function UpdatePage() {
  let navigate = useNavigate();
  const location = useLocation();
  const museum = location.state;

  const [museumData, setMuseumData] = useState({
    id: museum.id,
    name: museum.name || "", 
    location: museum.location || "", 
    phone: museum.phone || "",
    description: museum.description || "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!museumData.name || !museumData.location || !museumData.phone || !museumData.description) {
      alert("Please input all fields.");
      return;
    }
  
    const updatedMuseum = {
      name: museumData.name,
      location: museumData.location,
      address: museumData.address,
      phone: museumData.phone,
      description: museumData.description,
    };
  
    MuseumApi.updateMuseum(museumData.id, updatedMuseum)
      .then((response) => {
        console.log(response);
        alert("Museum has been updated!");
        navigate("/Museum");
      })
      .catch((error) => {
        if (error.response?.status === 400 && error.response?.data === "NAME_ALREADY_EXISTS")
          alert("Name already exists");
        else alert("Something went wrong. Please try again later.");
      });
  };
  const onCancel = () => {
    navigate("/Museum");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMuseumData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <li className="createMuseumForm" onSubmit={onSubmit}>
      <input
        type="text"
        className="inputText"
        name="name"
        placeholder="Museum name"
        value={museumData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        className="inputText"
        name="location"
        placeholder="Location"
        value={museumData.location}
        onChange={handleChange}
      />
      <input
        type="text"
        className="inputText"
        name="phone"
        placeholder="phone"
        value={museumData.phone}
        onChange={handleChange}
      />
      <input
        type="text"
        className="inputText"
        name="description"
        placeholder="description"
        value={museumData.description}
        onChange={handleChange}
      />
      <button className="inputSubmit" type="submit" onClick={onSubmit}>
        Update
      </button>
      <button className="inputSubmit" type="submit" onClick={onCancel}>
        Cancel
      </button>
    </li>
  );
}

export default UpdatePage;
