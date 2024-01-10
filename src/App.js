import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import NavBar from './components/NavBar';
import MuseumPage from './Pages/MuseumPage.js'
import CreateMuseumPage from './Pages/CreateMuseumPage.js'
import UserPage from './Pages/UserPage.js'
import HomePage from './Pages/HomePage.js'
import SignUpPage from './Pages/SignUpPage';
import AdministrationPage from './Pages/AdministrationPage';
import { useState } from 'react';
import TokenManager from './components/TokenManager';
import LoginPage from './Pages/LoginPage';
import { MuseumInforPage } from './Pages/MuseumInforPage';
import CreateTicketPage from './Pages/CreateTicketPage';
import SummaryPage from './Pages/SumaryPage';
import OrderPage from './Pages/OrderPage';
import NotificationPage from './Pages/NotificationPage';
import StatisticPage from './Pages/StatisticPage';
import UpdatePage from './Pages/UpdateMuseumPage';
import PrivateRoute from './Pages/PrivateRoute';


function App() {
  const [claims, setClaims] = useState(TokenManager.getClaims());

  const handleLoginSuccess = (claims) => {
    setClaims(claims);
  };
  const [stompClient, setStompClient] = useState();
  const [messagesReceived, setMessagesReceived] = useState([]);
  const SENDER = "Museum Ticket shop Inc.";

  const setupStompClient = () => {
    // stomp client over websockets
    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    stompClient.onConnect = () => {
      // subscribe to the backend public topic
      stompClient.subscribe('/topic/publicmessages', (data) => {
        console.log(data);
        onMessageReceived(data);
      });
    };

    // initiate client
    stompClient.activate();

    // maintain the client for sending and receiving
    setStompClient(stompClient);
  };

  // send the data using Stomp
  const sendMessage = (newMessage) => {
    const payload = { 'id': uuidv4(), 'from': SENDER, 'to': newMessage.to, 'text': newMessage.text };
    if (stompClient && stompClient.connected) {
      stompClient.publish({ 'destination': '/topic/publicmessages', body: JSON.stringify(payload) });
    } else {
      console.log('Stomp client not yet connected.');
    }
  };

  // display the received data
  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    setMessagesReceived(messagesReceived => [...messagesReceived, message]);
  };

  const onUsernameInformed = () => {
    setupStompClient();
  }

  return (
    <div className="App">
      <Router>
        <NavBar claims={claims}/>
        <Routes>
          <Route path="/" element={<UserPage claims={claims} onLoginSucceded={handleLoginSuccess}/>} />
      
          <Route path="/Login" element={<UserPage claims={claims} onLoginSucceded={handleLoginSuccess}/>} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Museum" element={<MuseumPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Administration" element={<AdministrationPage />} />
          <Route path="/MuseumInfor/:id" element={<MuseumInforPage onUsernameInformed={onUsernameInformed} />} />
          <Route path="/SummaryPage" element={<SummaryPage  claims={claims} />} />
          <Route path="/Order" element={<OrderPage claims={claims}  />} />
          <Route path="/Notification" element={<NotificationPage onUsernameInformed={onUsernameInformed} messagesReceived={messagesReceived}  />} />
         
          <Route element={<PrivateRoute/>}>
          <Route path="/CreateMuseum" element={<CreateMuseumPage onUsernameInformed={onUsernameInformed} onMessageSend={sendMessage}/>} />
          <Route path="/CreateTicket" element={<CreateTicketPage />} />
          <Route path="/Statistic" element={<StatisticPage   />} />
          <Route path="/UpdateMuseum" element={<UpdatePage />} />
            </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
