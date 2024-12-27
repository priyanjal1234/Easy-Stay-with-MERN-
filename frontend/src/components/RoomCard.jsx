import { AirVent, Car, Dumbbell, Tv, Users, Wifi, Wind } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <div className="w-fit bg-gray-800 rounded-xl overflow-hidden shadow-lg">
      <div className="w-full h-[340px]">
        <img src={room?.image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-white">{room?.roomName}</h3>
          <div className="mt-2 flex items-center text-gray-600 dark:text-gray-300">
            <Users className="h-5 w-5 mr-2" />
            <span>{room?.maxGuests} guests</span>
          </div>
        </div>
        <p className="mt-2 text-gray-400">{room?.roomType}</p>
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {room?.facilities?.map((item,index) => (
              <div key={index}>
                {item === "Wifi" && <Wifi className="h-5 w-5 text-gray-500 dark:text-gray-400" /> }
                {item === "Tv" && <Tv className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
                {item === "AC" && <Wind className="h-5 w-5 text-gray-500 dark:text-gray-400"  />}
                {item === "Car" && <Car className="h-5 w-5 text-gray-500 dark:text-gray-400"/>}
                {item === "Gym" && <Dumbbell className="h-5 w-5 text-gray-500 dark:text-gray-400"/>}
              </div> 
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="text-white">
            <span className="text-2xl font-bold">
              &#8377; {room?.pricePerNight}
            </span>

            <span className="text-gray-400"> / night</span>
          </div>
          <Link to={`/room/${room?._id}`} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
