import { io, Socket } from "socket.io-client";
import { BASE_URL } from "./constants";
import { getCookie } from "./getCookie";
export const createSocketConnection = () => {
  const token = getCookie("token");
  if(location.hostname === "localhost"){
    return io(BASE_URL, {
    auth: {
      token: token,
    },
  });
  } else{
    return io("/", {
    path: "/api/socket.io/",
    auth: {
      token: token,
    },
  });
  }
  
  // return io(BASE_URL);
};
