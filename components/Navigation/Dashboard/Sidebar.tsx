"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Home,
  DollarSign,
  ShoppingCart,
  BarChart,
  Users,
  Upload,
} from "lucide-react";
import { motion } from "framer-motion";
import SidebarOption from "./SidebarOption";
import SidebarTitleSection from "./SidebarTitleSection";
import SidebarToggle from "./SidebarToggle";

interface SidebarProps {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

const DarkSidebar = ({ selected, setSelected }: SidebarProps) => {
  const [open, setOpen] = useState(true);

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-gray-800 bg-black p-4 transition-all duration-300"
      style={{ width: open ? "225px" : "fit-content" }}
    >
      <SidebarTitleSection open={open} />
      <div className="space-y-1">
        <SidebarOption
          Icon={Home}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <SidebarOption
          Icon={DollarSign}
          title="Sales"
          selected={selected}
          setSelected={setSelected}
          open={open}
          notifs={3}
        />
        <SidebarOption
          Icon={ShoppingCart}
          title="Products"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <SidebarOption
          Icon={BarChart}
          title="Analytics"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <SidebarOption
          Icon={Users}
          title="Orders"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <SidebarOption
          Icon={Upload}
          title="Upload"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
      </div>
      <SidebarToggle open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

export { DarkSidebar };
