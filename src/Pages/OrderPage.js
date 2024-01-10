import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OrderAPI from "../Api/OrderAPI";
function OrderPage(props) {
   const [orders, setOrders] =useState([]);
   const getOrders = ()=>{
    OrderAPI.getOrdersByCustomer(props.claims.customerId)
    .then(order => setOrders(order))
    .catch(error => console.error(error));
   }
   useEffect(()=> {
    getOrders();
   },[])


    return (
      <div>
        <h2>Order Details</h2>
      <div className='orderList'>
      
      {orders.map((order) => (
        <div className='order' key={order.id}>
          <p>Order Date: {order.orderDate}</p>
          <hr/>
          {order.orderItemList.map((orderItem) => (
            <div key={orderItem.id}>
              <p>Ticket Name: {orderItem.ticket.name}</p>
              <p>Amount: {orderItem.amount}</p>
              <p>Price: {orderItem.price}</p>
              <p>Museum Name: {orderItem.ticket.museum.name}</p>
              <p>Museum Location: {orderItem.ticket.museum.location}</p>
              <hr/>
            </div>
             
          ))}
      
        </div>
      ))}
    </div>
    </div>
    );
  }
  export default OrderPage;
  