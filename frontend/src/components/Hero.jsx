import React, { useState, useEffect } from "react";
import { Search, Users } from "lucide-react";
import { useSelector } from "react-redux";
import RoomCard from "./RoomCard";

const Hero = () => {
  const { allRooms } = useSelector((state) => state.room);
  const [searchQuery, setSearchQuery] = useState("");
  const [guestFilter, setGuestFilter] = useState(""); // Empty means no guest filter
  const [filteredRooms, setFilteredRooms] = useState(allRooms);

  useEffect(() => {
    // Filter rooms based on both search query and guest filter
    const filtered = allRooms?.filter((room) => {
      // Check if room matches search query (if provided)
      const matchesSearch = searchQuery.trim()
        ? room?.roomName?.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      // Check if room matches guest filter (if provided)
      const matchesGuest = guestFilter
        ? guestFilter === "4+ Guests"
          ? room.maxGuests >= 4
          : room.maxGuests >= parseInt(guestFilter, 10)
        : true;

      // Only include room if it meets both criteria
      return matchesSearch && matchesGuest;
    });
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
                <option value="1 Guest">1 Guest</option>
                <option value="2 Guests">2 Guests</option>
                <option value="3 Guests">3 Guests</option>
                <option value="4+ Guests">4+ Guests</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Render room cards from filteredRooms */}
      <div className="flex gap-5 flex-wrap">
        {filteredRooms?.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Hero;
