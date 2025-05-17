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
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body