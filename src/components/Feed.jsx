import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import useRequest from "../customHooks/useRequest";

const Feed = () => {
  const dispatch = useDispatch();
  useRequest();
  const feed = useSelector((state) => state.feed);
  console.log(feed);
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
  return (
    feed.length > 0 && (
      <div className="flex justify-center h-screen my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
