import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import userService from "../services/UserService";
import { setLoggedin, setUser } from "../redux/reducers/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../components/Hero";
import roomService from "../services/RoomService";
import { setAllRooms } from "../redux/reducers/RoomReducer";

const Home = () => {
  let dispatch = useDispatch();
  let { allRooms } = useSelector((state) => state.room);

  let query1 = useQuery({
    queryKey: ["loggedinUser"],
    queryFn: async function () {
      let loggedinUser = await userService.getLoggedinUser();
      console.log(loggedinUser.data)
      return dispatch(setUser(loggedinUser.data));
    },
  });

  let query2 = useQuery({
    queryKey: ["allRooms"],
    queryFn: async function () {
      let allRooms = await roomService.getAllRooms();
      return dispatch(setAllRooms(allRooms.data));
    },
    
  });

  useEffect(() => {
    async function getUser() {
      try {
        let user = await userService.getLoggedinGoogleProfile()
        console.log(user.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    getUser()
  },[])

  return (
    <div className="w-full min-h-screen bg-[#111827] text-white">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Home;
