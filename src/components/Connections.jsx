import React, { useEffect } from "react";
import ConnectionCard from "./ConnectionCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);
  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      //console.log(res.data.data);
      dispatch(setConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);
  return !connections || connections.length <= 0 ? (
    <EmptyConnections />
  ) : (
    <div className="h-screen">
      {connections.map((connection) => (
        <ConnectionCard key={connection._id} connection={connection} />
      ))}
    </div>
  );
};

const EmptyConnections = () => {
  return (
    <div className="hero h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">No Connections 🥺</h1>
          <p className="py-6">
            You have no connections yet. Connect with other developers to get
            started.
          </p>
          <button className="btn btn-primary"><Link to="/feed">Get Start Connected</Link></button>
        </div>
      </div>
    </div>
  );
};

export default Connections;
