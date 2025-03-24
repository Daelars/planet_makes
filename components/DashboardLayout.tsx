"use client";
import { useState } from "react";
import { DarkSidebar } from "./Navigation/Dashboard/Sidebar";
import DashboardContent from "./Content/DashboardContent";
import SalesContent from "./Content/SalesContent";
import ProductsContent from "./Content/ProductsContent";
import AnalyticsContent from "./Content/AnalyticsContent";
import OrdersContent from "./Content/OrdersContent";
import UploadContent from "./Content/UploadContent";

const DashboardLayout = () => {
  const [selected, setSelected] = useState("Dashboard");

  return (
    <div className="flex h-screen w-full bg-gray-900">
      <DarkSidebar selected={selected} setSelected={setSelected} />
      <div className="flex-1 p-8 text-white">
        {selected === "Dashboard" && <DashboardContent />}
        {selected === "Sales" && <SalesContent />}
        {selected === "Products" && <ProductsContent />}
        {selected === "Analytics" && <AnalyticsContent />}
        {selected === "Orders" && <OrdersContent />}
        {selected === "Upload" && <UploadContent />}
      </div>
    </div>
  );
};

export default DashboardLayout;
