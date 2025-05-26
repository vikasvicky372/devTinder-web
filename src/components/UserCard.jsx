import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeCardFromFeed } from "../utils/feedSlice";
import { motion,useAnimation } from "framer-motion";
import { useDrag } from "@use-gesture/react";
import Feed from "./Feed";

const SWIPE_THRESHOLD = 150; // px threshold for considering it a swipe

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, bio, photoURL, age, gender } = user;
  const dispatch = useDispatch();
  const controls = useAnimation();
  const ignoreOrInterested = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeCardFromFeed(requestId));
    } catch (err) {
      console.log(err);
    }
  };
  const bind = useDrag(({ down, movement: [mx, my], velocity, direction: [xDir] }) => {
    if (!down) {
      if (Math.abs(mx) > SWIPE_THRESHOLD || velocity > 0.5) {
        const status = xDir > 0 ? "interested" : "ignored";
        const exitX = xDir > 0 ? 1000 : -1000;
        const exitY = my < 0 ? -200 : 200; // add a little up/down motion based on swipe

        controls
          .start({
            x: exitX,
            y: exitY,
            rotateZ: xDir * 30,
            opacity: 0,
            transition: { duration: 0.3 },
          })
          .then(() => {
            ignoreOrInterested(status, _id);
            controls.set({ x: 0, y: 0, rotateZ: 0, opacity: 1 });
          });

        return;
      }

      // Not swiped enough — bounce back
      controls.start({
        x: 0,
        y: 0,
        rotateZ: 0,
        transition: { type: "spring", stiffness: 300 },
      });
    } else {
      // Follow cursor
      controls.start({
        x: mx,
        y: my,
        rotateZ: mx / 15,
        transition: { type: "spring", stiffness: 300 },
      });
    }
  });
  return (
    <motion.div
      {...bind()}
      animate={controls}
      className="card bg-base-300 w-60 sm:w-70 shadow-sm h-120 my-auto touch-none cursor-grab mx-auto"
      style={{ touchAction: "none" }}
    >
      <figure className="h-7/12">
        <img className="h-full w-full object-fill" src={photoURL} alt="Shoes" />
      
      </figure>
      <div className="card-body h-5/12">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{bio}</p>
        <div className="card-actions flex flex-row justify-between">
          <button
            className="btn btn-primary "
            onClick={() => {
              ignoreOrInterested("ignored", _id);
            }}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary "
            onClick={() => {
              ignoreOrInterested("interested", _id);
            }}
          >
            Interested
          </button>
        </div>
      </div>
    </motion.div>
  );
};


export default UserCard;
