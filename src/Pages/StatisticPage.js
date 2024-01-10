import { useState } from "react";
import OrderAPI from "../Api/OrderAPI";

function StatisticPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [soldTickets, setSoldTickets] = useState([]);
  const [showTitle, setShowTitle] = useState(false);

  const startChanged = (e) => {
    setStartDate(e.target.value);
  };

  const endChanged = (e) => {
    setEndDate(e.target.value);
  };

  const getStatistic = () => {
    if (!startDate || !endDate) {
      alert("Please choose the date first.");
      return;
    }
  
    OrderAPI.getTop10MostSoldTickets(startDate, endDate)
      .then((response) => {
        setSoldTickets(response);
        setShowTitle(true);
      })
      .catch((error) => console.log(error));
  };
  

  return (
    <div>
      <h2>Choose start date:</h2>
      <div>
        <label htmlFor="startDate">Select date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={startChanged}
        />
      </div>

      <h2>Choose end date:</h2>
      <div>
        <label htmlFor="endDate">Select date:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={endDate}
          onChange={endChanged}
        />
      </div>

      <button className="inputSubmit" type="submit" onClick={getStatistic}>
        Submit
      </button>

      {showTitle && (
        <div>
          <h2>Sold Tickets:</h2>
          {soldTickets.length > 0 ? (
            <table className="sold-tickets-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Museum</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {soldTickets.map((ticket, index) => (
                  <tr key={index}>
                    <td>{ticket.name}</td>
                    <td>{ticket.museumName}</td>
                    <td>{ticket.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>There are no tickets sold in this period.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default StatisticPage;
