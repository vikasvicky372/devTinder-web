import React from 'react'

const ConnectionCard = ({connection}) => {
    console.log(connection);
    const {firstName, lastName, photoURL,bio, age, gender} = connection;
  return (
    <div className="card card-side bg-base-300 shadow-sm h-40 w-9/12 mx-auto my-10">
  <figure>
    <img
      src={photoURL}
      alt="profile" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " "+ lastName}</h2>
    {age && <span>{age},</span>}{gender&&<span>{gender}</span>}
    <p>{bio}</p>
  </div>
</div>
  )
}

export default ConnectionCard