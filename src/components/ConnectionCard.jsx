import React from "react";
import { useNavigate } from "react-router";

const ConnectionCard = ({ connection }) => {
  console.log(connection);
  const navigate = useNavigate();

  const { _id, firstName, lastName, photoURL, bio, age, gender } = connection;
  return (
    <div className="card bg-base-300 shadow-sm mx-auto my-6 w-full max-w-md sm:max-w-2xl mt-16 mb-20 flex-1 overflow-y-auto">
      <div className="flex flex-col sm:flex-row items-center sm:items-start p-4 gap-4">
        {/* Profile Image */}
        <figure className="flex-shrink-0">
          <img
            src={photoURL}
            alt="profile"
            className="h-20 w-20 sm:h-28 sm:w-28 object-cover rounded-full"
          />
        </figure>

        {/* Info + Button */}
        <div className="flex flex-col justify-center flex-1 text-center sm:text-left">
          <h2 className="text-lg sm:text-xl font-semibold">
            {firstName + " " + lastName}
          </h2>
          <div className="text-sm text-gray-400 mt-1">
            {age && <span>{age}, </span>}
            {gender && <span>{gender}</span>}
          </div>
          <p className="text-sm mt-1">{bio}</p>

          {/* Button aligned better */}
          <div className="mt-3 sm:mt-4">
            <button
              className="btn btn-accent"
              onClick={() => navigate("/chat/" + _id)}
            >
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
