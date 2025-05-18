import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRequests } from "../utils/requestsSlice";

const  useRequest = () => {
    const dispatch = useDispatch();
    //const [requests, setRequests] = useState([]);
            useEffect(() => {
                getRequests();
            }
            , []);
            const getRequests = async () => {

                try {
                    const res = await axios.get(BASE_URL + "/user/request/received", {
                        withCredentials: true,
                    });
                    console.log(res.data.connectionRequests);
                    dispatch(addRequests(res.data.connectionRequests));
                    //setRequests(res.data.connectionRequests);
                    //return requests;
                    
                } catch (err) {
                    console.log(err);
                }
            }
};

export default useRequest;
