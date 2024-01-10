import React, { useEffect, useState } from 'react'
import MuseumApi from '../Api/MuseumApi';
import MuseumList from '../components/MuseumList';
import Museum from '../components/Museum';
import "./style.css";
import SearchBar from '../components/SearchBar';
import TokenManager from '../components/TokenManager';
import TicketAPI from "../Api/TicketAPI";

function MuseumPage() {
    const [museums, setMuseums] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false); 
    const getMuseums =() =>{
      MuseumApi.getMuseums()
        .then(response => setMuseums(response) )
     
        .catch(error => console.log(error))
    }

    useEffect(() => {
      getMuseums();
      const userClaims = TokenManager.getClaims();
      setIsAdmin(userClaims && userClaims?.roles?.includes('ADMIN'));

    },[])
    // const handleDelete = (id) =>{
    //   MuseumApi.deleteMuseum(id)
    //   .then(()=> getMuseums())
    //   .catch(error => console.log(error))
    // }
    const handleDelete = async (id) => {
      try {
        const tickets = await TicketAPI.getTicketsByMuseumId(id);
        if (tickets.length > 0) {
          alert("Cannot delete the museum. There are remaining tickets.");
          return;
        }
    
        await MuseumApi.deleteMuseum(id);
        getMuseums();
      } catch (error) {
        console.log(error);
      }
    };
    const handleResponseMuseum = (data) => {
      setMuseums(data)
  }

  return (
    <div className="MuseumPage">
      <div className='playerList'>

    <SearchBar searchMethod={MuseumApi.getMuseumsByName}
    responseHandler={handleResponseMuseum} />

    

  </div>
     <div className='museumList'>
        {museums.map(museum => ( 
          <><Museum key={museum.id} museum={museum} onDelete={handleDelete} isAdmin={isAdmin}/>
         </> 
        ))}
      </div>
      </div>

  )
}

export default MuseumPage;
