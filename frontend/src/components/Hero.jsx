import React from "react";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import RoomCard from "./RoomCard";

const Hero = () => {
  let { allRooms } = useSelector((state) => state.room);
  return (
    <div className="hero px-5 py-8">
      <div>
        <h1 className="text-4xl font-bold text-center">
          Find Your Perfect Stay
        </h1>
        <p className="text-xl text-gray-500 text-center mt-3">
          Book comfortable rooms at the best prices
        </p>
      </div>
      <SearchBar allRooms = {allRooms}/>

      <div className="flex gap-5 flex-wrap">
        {allRooms?.map((room) => (
          <RoomCard room={room} />
        ))}
      </div>
    </div>
  );
};

export default Hero;
