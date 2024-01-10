import axios from "axios"
import TokenManager from "../components/TokenManager";
const OrderAPI={
    createOrder: (newOrder) => {
        const accessToken = TokenManager.getAccessToken();
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        }; return axios.post('http://localhost:8080/orders', newOrder, { headers })
        .then(response => response.data.orderId);
    },
    getLastOrder: (id) => axios.get(`http://localhost:8080/orders/last/${id}`,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    })
    .then(response => response.data),   
    getOrdersByCustomer: (id) => axios.get(`http://localhost:8080/orders/${id}`,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    })
    .then(response => response.data.orders),

    getTop10MostSoldTickets: (start, end) => {
        const accessToken = TokenManager.getAccessToken();
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const params = {
          start: start,
          end: end,
        };
    
        return axios.get("http://localhost:8080/orders/top10mostsoldtickets", {
          headers,
          params,
        })
          .then(response => response.data.soldTickets)
          .catch(error => {
            // Handle error
            console.error("Error getting top 10 most sold tickets:", error);
            throw error;
          });
      },
    
}
export default OrderAPI;