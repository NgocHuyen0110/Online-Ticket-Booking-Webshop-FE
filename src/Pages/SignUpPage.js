import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import UserAPI from "../Api/UserAPI";
import TokenManager from "../components/TokenManager";



function SignUpPage() {

    let navigate = useNavigate();
    useEffect(() =>{
        if (TokenManager.getAccessToken()){
            navigate("/Login")
        }
    })
    const [customer, setCustomer] = useState({
        email: "",
        password: "",
        fullName: "",
    });

    const { email, password, fullName } = customer;

    const onInputChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const redirectToLogin = () => {
        navigate("/login");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        UserAPI.createCustomer(customer)
        .then((response) => {
            alert("Account has been created!");
            navigate("/login");})
        .catch(error => {
            if (error.response?.status === 400
                && error.response?.data === "EMAIL_ALREADY_EXISTS")
                alert("Email already exists")
            else (
                alert("Something went wrong. Please try again later.")
            )
        })
       
    };




           
   
    return (
        <li className="createTicketForm">
        <form onSubmit={onSubmit} >
                <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    className="inputText"
                    onChange={onInputChange}
                />
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    className="inputText"
                    onChange={onInputChange}
                />
                <input
                    id="fullName"
                    name="fullName"
                    type="fullName"
                    placeholder="Enter full name"
                    value={fullName}
                    className="inputText"
                    onChange={onInputChange}
                />
         

            <div className="inputSignUpPage" onClick={onSubmit} type="submit">
                Register
            </div>
            
                <div className="inputSignUpPage" onClick={redirectToLogin}>
                    Login
                </div>
        
        </form>
        </li>
    );
}

export default SignUpPage;