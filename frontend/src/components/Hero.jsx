import React, { useState, useEffect } from "react";
import { Search, Users } from "lucide-react";
import { useSelector } from "react-redux";
import RoomCard from "./RoomCard";

const Hero = () => {
  const { allRooms } = useSelector((state) => state.room);
  const [searchQuery, setSearchQuery] = useState("");
  const [guestFilter, setGuestFilter] = useState("");
  const [filteredRooms, setFilteredRooms] = useState(allRooms);

  useEffect(() => {
    let filtered = allRooms;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((room) =>
        room?.roomName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply guest filter
    if (guestFilter) {
      filtered = filtered.filter((room) => {
        const maxGuests = room?.maxGuests || 0;
        if (guestFilter === "4+ Guests") {
          return maxGuests >= 4;
        }
        return maxGuests >= parseInt(guestFilter, 10);
      });
    }

    setFilteredRooms(filtered);
  }, [searchQuery, guestFilter, allRooms]);

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

      {/* Integrated search UI */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search rooms..."
                className="w-full pl-10 pr-4 py-2 rounded-lg outline-none bg-gray-700 placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 rounded-lg outline-none bg-gray-700"
                value={guestFilter}
                onChange={(e) => setGuestFilter(e.target.value)}
              >
                <option value="">Any Guests</option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4+">4+ Guests</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Render room cards from filteredRooms */}
      <div className="flex gap-5 flex-wrap">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => <RoomCard key={room._id} room={room} />)
        ) : (
          <p className="text-center text-gray-500 w-full">
            No rooms match your search criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default Hero;
