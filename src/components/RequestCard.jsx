import React from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestsSlice";

const RequestCard = ({ request }) => {
  const { _id, fromUserId } = request;
  const {firstName, lastName, age, gender, bio, photoURL} = fromUserId;
  const [acceptMsg, setAcceptMsg] = React.useState(null);
  const [rejectMsg, setRejectMsg] = React.useState(null);
  const dispatch = useDispatch();
  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      if (status === "accepted") {
        setAcceptMsg(res.data.message);
        setTimeout(() => {
          setAcceptMsg(null);
        }, 3000);
      } else {
        setRejectMsg(res.data.message);
        setTimeout(() => {
          setRejectMsg(null);
        }, 3000);
      }
      dispatch(removeRequest(requestId));
    } catch (err) {
      setRejectMsg(err?.response?.data?.message);
      setTimeout(() => {
        setRejectMsg(null);
      }, 3000);
    }
  };
  return (
    <>
      {acceptMsg && (
        <div className="alert alert-success w-4/12 mx-auto my-10">
          <span>{acceptMsg}</span>
        </div>
      )}
      {rejectMsg && (
        <div className="alert alert-error w-4/12 mx-auto my-10">
          <span>{rejectMsg}</span>
        </div>
      )}
      <div className="card card-side bg-base-300 shadow-sm h-40 w-9/12 mx-auto my-10">
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && <span>{age},</span>}
          {gender && <span>{gender}</span>}
          <p>{bio}</p>
          <div className="card-actions justify-start">
            <button
              className="btn btn-outline btn-success"
              onClick={() => {reviewRequest("accepted", _id)}}
            >
              Accept
            </button>
            <button
              className="btn btn-outline btn-error"
              onClick={() => {reviewRequest("rejected", _id)}}
            >
              Reject
            </button>
          </div>
        </div>
        <figure>
          <img src={photoURL} alt="profile" />
        </figure>
      </div>
    </>
  );
};

export default RequestCard;
