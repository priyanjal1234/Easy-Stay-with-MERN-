import React from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminPanel = () => {
  return (
    <div className="w-full min-h-screen bg-[#111827] text-white">
      <AdminSidebar />
      <div className="ml-[20%] p-4 flex flex-col gap-4">
        <h1 className="text-center text-2xl font-semibold">
          This is Admin Panel
        </h1>
        <h2 className="text-lg text-center text-zinc-600">
          Restricted to Admin Users Only
        </h2>
        <h3 className="text-purple-600 text-center">
          Click on links on sidebar to move
        </h3>
      </div>
    </div>
  );
};

export default AdminPanel;
