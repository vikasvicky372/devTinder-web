import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeCardFromFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
  const {_id,firstName, lastName, bio, photoURL, age, gender} = user;
  const dispatch = useDispatch();
  const ignoreOrInterested = async (status,requestId) => {
    try{
      const res = await axios.post(BASE_URL +"/request/send/"+status+"/"+requestId,{},{withCredentials:true});
      console.log(res);
      dispatch(removeCardFromFeed(requestId));
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="card bg-base-300 w-80 shadow-sm h-126 my-auto">
      <figure className="h-7/12">
        <img className="h-full w-full object-fill"
          src={photoURL}
          alt="Shoes"
        />
      </figure>
      <div className="card-body h-5/12">
        <h2 className="card-title">{firstName + " " +lastName}</h2>
        {age && gender &&  <p>
         {age + ", "+ gender}
        </p>}
        <p>
         {bio}
        </p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary mx-5" onClick ={()=> {ignoreOrInterested("ignored",_id)}}>Ignore</button>
          <button className="btn btn-secondary mx-5" onClick ={()=> {ignoreOrInterested("interested",_id)}}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
