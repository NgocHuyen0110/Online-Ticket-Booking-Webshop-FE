import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TicketAPI from "../Api/TicketAPI";


export function MuseumInforPage() {
  const [subject, setSubject] = useState([]);
  const [amounts, setAmounts] = useState({});
  const [nextClicked, setNextClicked] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectDate, setSelectDate] = useState("");

  useEffect(() => {
    loadData();
    console.log("loading data");
  }, [id]);

  const loadData = async () => {
    await TicketAPI.getTicketsByMuseumId(id).then((response) => {
      setSubject(response);
      setAmounts(
        response.reduce((acc, ticket) => ({ ...acc, [ticket.id]: 0 }), {})
      );
    });
  };

  const handleDecrement = (ticketId) => {
    if (amounts[ticketId] > 0) {
      setAmounts((prevAmounts) => ({
        ...prevAmounts,
        [ticketId]: prevAmounts[ticketId] - 1,
      }));
    }
  };

  const handleIncrement = (ticketId, ticketQuantity) => {
    if (amounts[ticketId] < ticketQuantity) {
      setAmounts((prevAmounts) => ({
        ...prevAmounts,
        [ticketId]: prevAmounts[ticketId] + 1,
      }));
    }
  };

  // const handleOrderClick = () => {
  //   const selectedTickets = subject
  //     .filter((ticket) => amounts[ticket.id] > 0)
  //     .map((ticket) => ({ ...ticket, amount: amounts[ticket.id] }));
  //   navigate("/SummaryPage", { state: selectedTickets });
  // };
  const handleOrderClick = () => {
    if (selectDate === "") {
      window.alert("Please select a date first.");
    } else {
      const selectedTickets = subject
        .filter((ticket) => amounts[ticket.id] > 0)
        .map((ticket) => ({ ...ticket, amount: amounts[ticket.id] }));
      navigate("/SummaryPage", { state: { selectedTickets, selectDate } });
    }
  };
  
  const handleNextClick = () => {
    if (subject.every((ticket) => amounts[ticket.id] === 0)) {
      window.alert("Please select a ticket first.");
    } else {
      setNextClicked(true);
    }
  };
  const onInputChange = (e) => {
    setSelectDate(e.target.value);
  };
  return (
    <div><h2>Select your ticket:</h2>
    <div>
      <div className="ticketPage">
        

<div className="ticketList">
  {subject.length > 0 ? (
    <table className="ticket-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {subject.map((ticket) => (
          <tr key={ticket.id} className="ticket-row">
            <td>{ticket.name}</td>
            <td>${ticket.price}</td>
            <td>{ticket.description}</td>
            <td>
              <div className="amount-container">
                <button
                  className="amount-button decrement"
                  onClick={() => handleDecrement(ticket.id)}
                >
                  -
                </button>
                <input
                  type="number"
                  value={amounts[ticket.id]}
                  className="amount-input"
                  id="amount"
                  name="amount"
                  min="1"
                  max={ticket.quantity}
                />
                <button
                  className="amount-button increment"
                  onClick={() => handleIncrement(ticket.id, ticket.quantity)}
                >
                  +
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <h2>Loading...</h2>
  )}
  <hr />
</div>
      </div>

      {!nextClicked && (
        <button className="inputSubmit" type="button" onClick={handleNextClick}>
          Next
        </button>
      )}

      {nextClicked && subject.some((ticket) => amounts[ticket.id] > 0) && (
        <div>
          <label htmlFor="date">Select date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={selectDate}
            onChange={onInputChange}
          />

      <button className="inputSubmit" type="button" onClick={handleOrderClick}>
        Order
      </button>

        </div>
      )}
    </div>
    </div>
  );
}
