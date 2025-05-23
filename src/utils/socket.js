import { io, Socket } from "socket.io-client";
import { BASE_URL } from "./constants";
import { getCookie } from "./getCookie";
export const createSocketConnection = () => {
  const token = getCookie("token");
  return io(BASE_URL, {
    auth: {
      token: token,
    },
  });
  // return io(BASE_URL);
};
