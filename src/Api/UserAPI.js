import axios from "axios"
import TokenManager from "../components/TokenManager";

const UserAPI = {
  
    getCustomer: (id) => axios.get(`http://localhost:8080/customers/${id}`,
   {
       headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
   })
   .then(response => response.data),
   getAdmin: (id) => axios.get(`http://localhost:8080/admins/${id}`,
   {
       headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
   })
   .then(response => response.data),
   createCustomer:(newCustomer) =>axios.post("http://localhost:8080/customers", newCustomer)
   .then(respone => respone.data.id),

   getAdmins: (id) => axios.get(`http://localhost:8080/admins`,
   {
       headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
   })
   .then(response => response.data.admins),
   deleteAdmin: (id) => axios.delete(`http://localhost:8080/admins/${id}`,
   {
       headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
   }) 
}
export default UserAPI;