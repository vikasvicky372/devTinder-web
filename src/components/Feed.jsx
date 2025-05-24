import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import useRequest from "../customHooks/useRequest";

const Feed = () => {
  const dispatch = useDispatch();
  useRequest();
  const feed = useSelector((state) => state.feed);

  const getFeed = async () => {
    try {
      if (feed.length > 0) return;
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return feed.length <= 0 ? (
    <EmptyFeed />
  ) : (
    <div className="flex flex-col items-center justify-center px-4 py-10 mt-20">
      <UserCard user={feed[0]} />
    </div>
  );
};

const EmptyFeed = () => {
  return (
    <div className="hero h-screen py-10">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">No New Users 😂</h1>
          <p className="py-6">
            You have no new users to connect with. Please check back later or
            try again.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feed;
