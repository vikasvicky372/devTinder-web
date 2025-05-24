import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router'
import Footer from './Footer'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {

  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try{
      const response = await axios.get(BASE_URL+"/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
    }catch(err){
      if(err.status === 401){
        navigate("/login");
      }
      console.log(err);
    }
  }
  useEffect(() => {
    if(!userData){
      fetchUser();
    }
  }, [])
  return (
    <div className="flex flex-col h-screen bg-[url('/images/backGround.png')] bg-cover bg-center bg-fixed overflow-hidden">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <NavBar />
      </div>

      {/* Scrollable Content */}
      <div className="mt-2 mb-18 flex-1 overflow-y-auto px-4">
        <Outlet />
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <Footer />
      </div>
    </div>
  );
}

export default Body