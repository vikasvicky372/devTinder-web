import React from "react";
import { useNavigate } from "react-router";

const ConnectionCard = ({ connection }) => {
  console.log(connection);
  const navigate = useNavigate();
  
  const { _id,firstName, lastName, photoURL, bio, age, gender } = connection;
  return (
    <div className="card card-side bg-base-300 shadow-sm h-40 w-9/12 mx-auto my-10">
      <div className="flex items-center w-full px-4">
      <figure className="h-full flex items-center px-4">
    <img src={photoURL} alt="profile" className="h-32 w-32 object-cover rounded-full" />
  </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && <span>{age},</span>}
        {gender && <span>{gender}</span>}
        <p>{bio}</p>
      </div>
      <button className="btn btn-dash btn-accent self-center mr-4" onClick={() => {navigate("/chat/"+_id)}}>chat</button>
    </div>
    </div>
  );
};

export default ConnectionCard;
