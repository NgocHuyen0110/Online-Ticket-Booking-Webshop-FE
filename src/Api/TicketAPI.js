import axios from "axios";
import TokenManager from "../components/TokenManager";
 const TicketAPI ={
    getTicketsByMuseumId: (id) => axios.get(`http://localhost:8080/tickets/${id}`)
    .then(result => result.data.tickets) ,
    createTicket: (newTicket) => {
        const accessToken = TokenManager.getAccessToken();
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        }; return axios.post('http://localhost:8080/tickets', newTicket, { headers })
        .then(response => response.data.id);
    },

    
}
export default TicketAPI;

