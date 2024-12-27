import {
  LayoutDashboard,
  ListOrdered,
  Package,
  PlusCircle,
} from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const AdminSidebar = () => {
  let adminSidebarData = [
    {
      icon: <LayoutDashboard />,
      name: "Dashboard",
    },
    {
      icon: <PlusCircle />,
      name: "Add Room",
    },
    {
      icon: <ListOrdered />,
      name: "Room List",
    },
  ];
  return (
    <div className="w-[20%] h-screen fixed top-0 left-0 px-3 border-r border-gray-800">
      <div className="flex items-center justify-center h-[12%] gap-2 border-b border-gray-800">
        <Package className="h-8 w-8 text-purple-500" />
        <span className="text-2xl font-bold text-white">Admin Panel</span>
      </div>
      <nav className="py-3 flex flex-col gap-4">
        {adminSidebarData.map((item, index) => (
          <NavLink
            to={`/${item.name.toLowerCase().trim().replace(/\s+/g, "-")}`}
            key={index}
            className={({ isActive }) =>
              `w-full h-[45px] flex items-center gap-3 px-3 ${
                isActive ? "bg-purple-600 rounded-lg" : ""
              }`
            }
          >
            <span>{item.icon}</span>
            <h1 className="text-xl font-semibold">{item.name}</h1>
          </NavLink>
        ))}
        <Link to={"/"} className="block px-3 text-purple-600">
          Go back to home
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
