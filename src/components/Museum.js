  import React from "react";
  import "../Pages/style.css";
  import { useNavigate } from "react-router-dom";




  function Museum(props){
    const navigate = useNavigate();

    const handleDelete = () => {
      props.onDelete(props.museum.id);
    };

    const viewClick = () =>{
        navigate(`/MuseumInfor/${props.museum.id}`)
    }
    const handleUpdate =() =>{
      navigate("/UpdateMuseum", { state: props.museum });
    }
      return (
          <div className="museum">
              <h2 >{props.museum.name}</h2>
              <p >Location: {props.museum.location}</p>
              <p >Phone: {props.museum.phone}</p>
              <p >Description: {props.museum.description}</p>
              {props.isAdmin && (
                <div>
            <button className="inputSubmit" type="submit" onClick={handleDelete}>
              Delete
            </button>
            <button className="inputSubmit" onClick={handleUpdate}> Update </button>
            </div>
          )}
          
          <button className="inputSubmit" onClick={viewClick}> View Ticket</button>
  
          </div>
        
        
      )
  }
  export default Museum;