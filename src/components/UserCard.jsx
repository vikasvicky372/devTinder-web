import React from "react";

const UserCard = ({user}) => {
  console.log(user);
  const {firstName, lastName, bio, photoURL, age, gender} = user;
  return (
    <div className="card bg-base-300 w-80 shadow-sm h-126">
      <figure className="h-7/12">
        <img
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
          <button className="btn btn-primary mx-5">Ignore</button>
          <button className="btn btn-secondary mx-5">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
