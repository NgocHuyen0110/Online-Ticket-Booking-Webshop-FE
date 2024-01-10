const UserDetails = ({ userDetails }) => {
    return (
        <form className= "accountDetailsForm" >
            <h2>Account Details:</h2>
            <ul>
                <li className="ticket">ID: {userDetails.id}</li>
                <br/>
                <li
                className="ticket">Full Name: {userDetails.fullName}</li>
                 <br/>
                {userDetails.address && (
                    <li className="ticket">Address: {userDetails.address}</li>
                    )}
                     <br/>
                    {userDetails.dob && (
                    <li className="ticket">Date of Birth: {userDetails.dob}</li>
                    )}
                     <br/>
            </ul>
        </form>
    );
};

export default UserDetails;