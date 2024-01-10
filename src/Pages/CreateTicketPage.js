import { useState, useEffect,} from "react";
import { useNavigate } from "react-router-dom";
import TicketAPI from "../Api/TicketAPI";
import MuseumApi from "../Api/MuseumApi";
import TokenManager from "../components/TokenManager";

function CreateTicketPage(){
    const [museums, setMuseums] = useState([]);
    let navigate = useNavigate();
    const getMuseums =() =>{
        MuseumApi.getMuseums()
          .then(response => setMuseums(response) )
       
          .catch(error => console.log(error))
      }
      useEffect(() => {
       
        getMuseums();
      },[])
    const[ticket,setTicket] = useState({
        name:"",
        price:"",
        description:"",
        quantity:"",
        museumName:""
    });
    const {name,price,description,quantity,museumName} = ticket;
    const onInputChange =(e) =>{
        setTicket({...ticket, [e.target.name]: e.target.value });
    };
    const onSubmit =(e)=>{
        e.preventDefault();
        TicketAPI.createTicket(ticket)
        .then((response)=>{
        console.log(ticket);
        alert("Ticket has been created!")
        window.location.reload();   
      })
      .catch(error => {
        
            alert("Something went wrong. Please try again later.")
        
    })

      
    };
    return(
        <li className="createTicketForm" onSubmit={onSubmit}>
        <input
            type="text"
            className="inputText"
            name="name"
            placeholder="Ticket name"
            value={name}
            onChange={onInputChange}
        />
        <input
            type="text"
            className="inputText"
            name="price"
            placeholder="Price"
            value={price}
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
          <input
            type="text"
            className="inputText"
            name="quantity"
            placeholder="Quantity per day"
            value={quantity}
            onChange={onInputChange}
        />
            <select
            className="inputText"
            name="museumName"
            value={museumName}
            onChange={onInputChange}
        >
            <option value="">Select a museum</option>
            {museums.map(museum => (
            <option key={museum.id} value={museum.name}>
                {museum.name}
            </option>
            ))}
      </select>
         <button className="inputLogin" type="submit" onClick={onSubmit} >Submit</button>
       </li>
    )
    
}
export default CreateTicketPage;