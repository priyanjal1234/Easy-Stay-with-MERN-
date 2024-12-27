import React from "react";
import { Search, Calendar, Users } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-gray-800 text-white  rounded-lg shadow-md p-6 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 " />
            <input
              type="text"
              placeholder="Search rooms..."
              className="w-full pl-10 pr-4 py-2   rounded-lg 
                outline-none
                bg-gray-700   
                placeholder-gray-400 "
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400 " />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-2   rounded-lg 
                outline-none
                bg-gray-700    "
            />
          </div>
          <div className="relative">
            <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400 " />
            <select
              className="w-full pl-10 pr-4 py-2 rounded-lg 
              outline-none
              bg-gray-700"
            >
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4+ Guests</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
