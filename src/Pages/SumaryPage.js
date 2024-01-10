import React, { useState,useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import OrderAPI from "../Api/OrderAPI";
import OrderItemAPI from "../Api/OrderItemAPI";
import TokenManager from "../components/TokenManager";

export default function SummaryPage(props) {
  // const location = useLocation();
  // const selectedTickets = location.state;
  const [isAdmin, setIsAdmin] = useState(false); 
  let navigate = useNavigate();
  const location = useLocation();
  const { selectedTickets, selectDate } = location.state;


  const [order, setOrder] = useState({
    orderDate: selectDate,
    customerId: props.claims.customerId,
  });
  const redirectOrder = () => {
    navigate("/Order");
};


  const uniqueMuseums = [
    ...new Set(selectedTickets.map((ticket) => ticket.museum.id))
  ].map((museumId) => {
    const ticketsForMuseum = selectedTickets.filter(
      (ticket) => ticket.museum.id === museumId
    );
    const { museum } = ticketsForMuseum[0];
    return museum;
  });


  const handleOrder = (e) => {
    e.preventDefault();
    OrderAPI.createOrder(order)
      .then((response) => {
        console.log(response);
        const orderItems = selectedTickets.map((ticket) => ({
          ticketId: ticket.id,
          amount: ticket.amount,
          price: ticket.price,
          orderId: response,
        })
        );
        console.log("orderItem:");
        console.log(orderItems);
        orderItems.forEach((orderItem) => {
          OrderItemAPI.createOrderItem(orderItem)
            .then((orderItemResponse) => {
              console.log(orderItemResponse);
            })
            .catch((error) => {
              alert("OrderAPi went wrong. Please try again later.");
            });
        });
        alert("Order has been created!");
        navigate("/Order");


      })
      .catch((error) => {
        alert("Something went wrong. Please try again later.");
      });
  };



  useEffect(() => {
    const userClaims = TokenManager.getClaims();
    setIsAdmin(userClaims && userClaims?.roles?.includes('ADMIN'));

  },[])
  return (
    <div>
      <h2>Order Summary</h2>
      <div className="ticketPage">
        <h3>Selected Tickets:</h3>
        <ul>
          {selectedTickets.map((ticket) => (
            <div className="ticket">
              <li key={ticket.id}>
                {ticket.name} - Quantity: {ticket.amount}

              </li>
            </div>

          ))}

        </ul>
        <h3 >Selected Date: </h3>
        <p className="ticket"> {selectDate}</p>
        <h3>Museum Information:</h3>
        {uniqueMuseums.map((museum) => (
          <div key={museum.id} className="ticket">
            <p>Name: {museum.name}</p>
            <p>Address: {museum.location}</p>
          </div>
        ))}
      </div>
      {!isAdmin && (
          <button className="inputSubmit" type="submit" onClick={handleOrder}>Confirm Order!</button>
          )}

    </div>
  );
}
