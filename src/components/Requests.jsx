import React from "react";
import RequestCard from "./RequestCard";
import { useSelector } from "react-redux";
import useRequest from "../customHooks/useRequest";

const Requests = () => {
  useRequest();
  const requests = useSelector((state) => state.requests);
  console.log(requests);
  return requests.length <= 0 ? (
    <EmptyRequests />
  ) : (
    <div>
      {requests.map((request) => (
        <RequestCard key={request._id} request={request} />
      ))}
    </div>
  );
};

const EmptyRequests = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">No Requests 🥺</h1>
          <p className="py-6">You have no requests yet.</p>
        </div>
      </div>
    </div>
  );
};

export default Requests;
