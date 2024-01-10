import axios from "axios";
import TokenManager from "../components/TokenManager";
const OrderItemAPI={
  createOrderItem: (newOrderItem) => {
    const accessToken = TokenManager.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    }; return axios.post('http://localhost:8080/orderItems', newOrderItem, { headers })
    .then(response => response.data.id);
}

}
export default OrderItemAPI;