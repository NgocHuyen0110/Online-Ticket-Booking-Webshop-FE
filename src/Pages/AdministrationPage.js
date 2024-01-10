import { redirect, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserAPI from "../Api/UserAPI";
import Admin from "../components/Admin";
function AdministrationPage(){
  const[admins,setAdmins]=useState([]);
  const getAdmins=()=>{
    UserAPI.getAdmins()
    .then(response => setAdmins(response) )
    .catch(error => console.log(error))
    }
    useEffect(()=>{
        getAdmins();
    },[])
    const handleDelete =(id)=>{
        UserAPI.deleteAdmin(id)
        .then(()=> getAdmins())
        .catch(error => console.log(error))
    }

    return(
       
        <div className="admin-page">
        <h2>Administration Page</h2>
        <table  className="sold-tickets-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <Admin key={admin.id} admin={admin} onDelete={handleDelete} />
            ))}
          </tbody>
        </table>
      </div>
    );
    

    

}
export default AdministrationPage;