import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeCardFromFeed } from "../utils/feedSlice";
import { motion, useAnimation } from "framer-motion";
import { useDrag } from "@use-gesture/react";

const SWIPE_THRESHOLD = 120;

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, bio, photoURL, age, gender } = user;
  const dispatch = useDispatch();
  const controls = useAnimation();
  const [swipeStatus, setSwipeStatus] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  const ignoreOrInterested = async (status, requestId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeCardFromFeed(requestId));
    } catch (err) {
      console.error(err);
    }
  };

  const bind = useDrag(({ down, movement: [mx, my], velocity }) => {
    if (isExiting) return; // Prevent double interaction

    if (!down) {
      if (Math.abs(mx) > SWIPE_THRESHOLD || velocity > 0.5) {
        const status = mx > 0 ? "interested" : "ignored";
        const exitX = mx > 0 ? 1000 : -1000;

        setSwipeStatus(status);
        setIsExiting(true);

        controls
          .start({
            x: exitX,
            y: my,
            rotateZ: mx / 10,
            opacity: 0,
            transition: { duration: 0.5 },
          })
          .then(() => {
            ignoreOrInterested(status, _id);
            setSwipeStatus(null);
            setIsExiting(false);
            controls.set({ x: 0, y: 0, rotateZ: 0, opacity: 1 });
          });

        return;
      }

      setSwipeStatus(null);
      controls.start({
        x: 0,
        y: 0,
        rotateZ: 0,
        transition: { type: "spring", stiffness: 300 },
      });
    } else {
      const swipePreview = mx > 50 ? "interested" : mx < -50 ? "ignored" : null;
      setSwipeStatus(swipePreview);
      controls.start({
        x: mx,
        y: my,
        rotateZ: mx / 15,
        transition: { type: "spring", stiffness: 300 },
      });
    }
  });

  return (
    <div className="relative w-full h-full flex justify-center items-center">

      {/* Swipe Instruction Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base z-0 pointer-events-none text-center opacity-50">
        👈 Swipe Left to Ignore | Swipe Right to Like 👉
      </div>

      <motion.div
        {...bind()}
        animate={controls}
        className="relative z-10 card bg-base-300 w-60 sm:w-70 shadow-sm h-120 touch-none cursor-grab"
        style={{ touchAction: "none" }}
      >
        {/* Status Overlay */}
        {swipeStatus && (
          <div className={`absolute top-4 left-4 px-4 py-2 rounded-md text-white text-lg font-bold z-20 
            ${swipeStatus === "interested" ? "bg-green-600" : "bg-red-500"}`}>
            {swipeStatus === "interested" ? "Interested" : "Ignored"}
          </div>
        )}

        <figure className="h-7/12">
          <img className="h-full w-full object-cover" src={photoURL} alt="User" />
        </figure>

        <div className="card-body h-5/12">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          {age && gender && <p>{`${age}, ${gender}`}</p>}
          <p>{bio}</p>
          <div className="card-actions flex flex-row justify-between mt-2">
            <button
              className="btn btn-error"
              onClick={() => {
                if (isExiting) return;
                setIsExiting(true);
                controls
                  .start({
                    x: -1000,
                    opacity: 0,
                    rotateZ: -30,
                    transition: { duration: 0.5 },
                  })
                  .then(() => {
                    ignoreOrInterested("ignored", _id);
                    setIsExiting(false);
                    controls.set({ x: 0, y: 0, rotateZ: 0, opacity: 1 });
                  });
              }}
            >
              Ignore
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                if (isExiting) return;
                setIsExiting(true);
                controls
                  .start({
                    x: 1000,
                    opacity: 0,
                    rotateZ: 30,
                    transition: { duration: 0.5 },
                  })
                  .then(() => {
                    ignoreOrInterested("interested", _id);
                    setIsExiting(false);
                    controls.set({ x: 0, y: 0, rotateZ: 0, opacity: 1 });
                  });
              }}
            >
              Interested
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserCard;
