"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Home,
  DollarSign,
  Monitor,
  ShoppingCart,
  BarChart,
  Users,
  ChevronDown,
  ChevronsRight,
  Upload,
} from "lucide-react";
import { motion } from "framer-motion";

// Main App Component that contains sidebar and content
export const App = () => {
  const [selected, setSelected] = useState("Dashboard");

  return (
    <div className="flex h-screen w-full bg-gray-900">
      <DarkSidebar selected={selected} setSelected={setSelected} />
      <MainContent selected={selected} />
    </div>
  );
};

// Enhanced DarkSidebar Component
export const DarkSidebar = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-gray-800 bg-black p-4 transition-all duration-300"
      style={{ width: open ? "225px" : "fit-content" }}
    >
      <TitleSection open={open} />
      <div className="space-y-1">
        <Option
          Icon={Home}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={DollarSign}
          title="Sales"
          selected={selected}
          setSelected={setSelected}
          open={open}
          notifs={3}
        />
        <Option
          Icon={ShoppingCart}
          title="Products"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={BarChart}
          title="Analytics"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={Users}
          title="Orders"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={Upload}
          title="Upload"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
      </div>
      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

// Main Content Component that changes based on selected menu item
const MainContent = ({ selected }: { selected: string }) => {
  return (
    <div className="flex-1 p-8 text-white">
      {selected === "Dashboard" && <DashboardContent />}
      {selected === "Sales" && <SalesContent />}
      {selected === "Products" && <ProductsContent />}
      {selected === "Analytics" && <AnalyticsContent />}
      {selected === "Orders" && <OrdersContent />}
      {selected === "Upload" && <UploadContent />}
    </div>
  );
};

// Individual Content Components
const DashboardContent = () => (
  <div>
    <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-lg bg-gray-800 p-6">
        <h2 className="mb-2 text-xl">Welcome Back</h2>
        <p className="text-gray-400">
          View your dashboard summary and recent activities.
        </p>
      </div>
      <div className="rounded-lg bg-gray-800 p-6">
        <h2 className="mb-2 text-xl">Quick Stats</h2>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span>Total Sales</span>
            <span className="font-semibold">$24,502</span>
          </div>
          <div className="flex justify-between">
            <span>Pending Orders</span>
            <span className="font-semibold">13</span>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-gray-800 p-6">
        <h2 className="mb-2 text-xl">Recent Activity</h2>
        <p className="text-gray-400">New order received from John Doe</p>
        <p className="text-gray-400">
          Product "Wireless Earbuds" is low in stock
        </p>
      </div>
    </div>
  </div>
);

const SalesContent = () => (
  <div>
    <h1 className="mb-6 text-3xl font-bold">Sales</h1>
    <div className="rounded-lg bg-gray-800 p-6">
      <h2 className="mb-4 text-xl">Sales Overview</h2>
      <div className="mb-6 h-64 rounded-lg bg-gray-700 p-4">
        <p className="text-center text-gray-400">
          Sales chart would appear here
        </p>
      </div>
      <div className="mt-4">
        <h3 className="mb-2 text-lg">Recent Sales</h3>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex justify-between rounded-md bg-gray-700 p-3"
            >
              <div>
                <p>Order #{1000 + i}</p>
                <p className="text-sm text-gray-400">Customer: John Doe</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ${Math.floor(Math.random() * 500) + 100}
                </p>
                <p className="text-sm text-gray-400">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ProductsContent = () => (
  <div>
    <h1 className="mb-6 text-3xl font-bold">Products</h1>
    <div className="mb-4 flex justify-between">
      <input
        type="text"
        placeholder="Search products..."
        className="rounded-md bg-gray-800 px-4 py-2 text-white"
      />
      <button className="rounded-md bg-indigo-600 px-4 py-2">
        Add New Product
      </button>
    </div>
    <div className="rounded-lg bg-gray-800 p-6">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700 text-left">
            <th className="pb-2">Product</th>
            <th className="pb-2">Stock</th>
            <th className="pb-2">Price</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700">
            <td className="py-4">Wireless Headphones</td>
            <td>24</td>
            <td>$149.99</td>
            <td>
              <span className="rounded-full bg-green-800 px-2 py-1 text-xs">
                Active
              </span>
            </td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-4">Smart Watch</td>
            <td>8</td>
            <td>$299.99</td>
            <td>
              <span className="rounded-full bg-yellow-800 px-2 py-1 text-xs">
                Low Stock
              </span>
            </td>
          </tr>
          <tr>
            <td className="py-4">Bluetooth Speaker</td>
            <td>32</td>
            <td>$89.99</td>
            <td>
              <span className="rounded-full bg-green-800 px-2 py-1 text-xs">
                Active
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const AnalyticsContent = () => (
  <div>
    <h1 className="mb-6 text-3xl font-bold">Analytics</h1>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="rounded-lg bg-gray-800 p-6">
        <h2 className="mb-4 text-xl">Sales Performance</h2>
        <div className="h-64 rounded-lg bg-gray-700 p-4">
          <p className="text-center text-gray-400">
            Sales performance chart would appear here
          </p>
        </div>
      </div>
      <div className="rounded-lg bg-gray-800 p-6">
        <h2 className="mb-4 text-xl">User Activity</h2>
        <div className="h-64 rounded-lg bg-gray-700 p-4">
          <p className="text-center text-gray-400">
            User activity chart would appear here
          </p>
        </div>
      </div>
      <div className="rounded-lg bg-gray-800 p-6">
        <h2 className="mb-4 text-xl">Top Products</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Wireless Headphones</span>
            <span>42%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-700">
            <div className="h-2 w-5/12 rounded-full bg-indigo-600"></div>
          </div>

          <div className="flex justify-between">
            <span>Smart Watch</span>
            <span>28%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-700">
            <div className="h-2 w-3/12 rounded-full bg-indigo-600"></div>
          </div>

          <div className="flex justify-between">
            <span>Bluetooth Speaker</span>
            <span>18%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-700">
            <div className="h-2 w-2/12 rounded-full bg-indigo-600"></div>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-gray-800 p-6">
        <h2 className="mb-4 text-xl">Traffic Sources</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between">
              <span>Direct</span>
              <span>45%</span>
            </div>
            <div className="h-2 rounded-full bg-gray-700">
              <div className="h-2 w-5/12 rounded-full bg-blue-600"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <span>Social Media</span>
              <span>30%</span>
            </div>
            <div className="h-2 rounded-full bg-gray-700">
              <div className="h-2 w-3/12 rounded-full bg-purple-600"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <span>Search</span>
              <span>25%</span>
            </div>
            <div className="h-2 rounded-full bg-gray-700">
              <div className="h-2 w-1/4 rounded-full bg-green-600"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const OrdersContent = () => (
  <div>
    <h1 className="mb-6 text-3xl font-bold">Orders</h1>
    <div className="mb-4 flex space-x-2">
      <button className="rounded-md bg-indigo-600 px-4 py-2">All Orders</button>
      <button className="rounded-md bg-gray-800 px-4 py-2">Pending</button>
      <button className="rounded-md bg-gray-800 px-4 py-2">Completed</button>
      <button className="rounded-md bg-gray-800 px-4 py-2">Cancelled</button>
    </div>
    <div className="rounded-lg bg-gray-800 p-6">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700 text-left">
            <th className="pb-2">Order ID</th>
            <th className="pb-2">Customer</th>
            <th className="pb-2">Date</th>
            <th className="pb-2">Amount</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700">
            <td className="py-4">#ORD-1234</td>
            <td>John Doe</td>
            <td>Mar 23, 2025</td>
            <td>$199.99</td>
            <td>
              <span className="rounded-full bg-green-800 px-2 py-1 text-xs">
                Completed
              </span>
            </td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-4">#ORD-1235</td>
            <td>Jane Smith</td>
            <td>Mar 22, 2025</td>
            <td>$149.99</td>
            <td>
              <span className="rounded-full bg-yellow-800 px-2 py-1 text-xs">
                Pending
              </span>
            </td>
          </tr>
          <tr>
            <td className="py-4">#ORD-1236</td>
            <td>Mark Johnson</td>
            <td>Mar 21, 2025</td>
            <td>$299.99</td>
            <td>
              <span className="rounded-full bg-red-800 px-2 py-1 text-xs">
                Cancelled
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const UploadContent = () => (
  <div>
    <h1 className="mb-6 text-3xl font-bold">Upload</h1>
    <div className="rounded-lg bg-gray-800 p-6">
      <div className="mb-6 rounded-lg border-2 border-dashed border-gray-600 p-8 text-center">
        <Upload className="mx-auto mb-2 h-12 w-12 text-gray-400" />
        <p className="mb-2 text-xl">Drag & Drop Files Here</p>
        <p className="text-gray-400">or</p>
        <button className="mt-4 rounded-md bg-indigo-600 px-4 py-2">
          Browse Files
        </button>
      </div>
      <div>
        <h3 className="mb-4 text-lg">Upload History</h3>
        <div className="space-y-3">
          <div className="flex justify-between rounded-md bg-gray-700 p-3">
            <div>
              <p>product-images.zip</p>
              <p className="text-sm text-gray-400">
                3.2 MB • Uploaded 2 hours ago
              </p>
            </div>
            <div className="flex items-center text-indigo-400">View</div>
          </div>
          <div className="flex justify-between rounded-md bg-gray-700 p-3">
            <div>
              <p>inventory-sheet.xlsx</p>
              <p className="text-sm text-gray-400">
                1.8 MB • Uploaded yesterday
              </p>
            </div>
            <div className="flex items-center text-indigo-400">View</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  notifs,
}: {
  Icon: React.ComponentType<any>;
  title: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  open: boolean;
  notifs?: number;
}) => {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title
          ? "bg-gray-800 text-white"
          : "text-gray-400 hover:bg-gray-800"
      }`}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          {title}
        </motion.span>
      )}
      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
        >
          {notifs}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open }: { open: boolean }) => {
  return (
    <div className="mb-3 border-b border-gray-800 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-gray-800">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold text-white">
                TomIsLoading
              </span>
              <span className="block text-xs text-gray-400">Pro Plan</span>
            </motion.div>
          )}
        </div>
        {open && <ChevronDown className="mr-2 text-white" />}
      </div>
    </div>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
    >
      <svg
        width="24"
        height="auto"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-white"
      >
        <path
          d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
          stopColor="#000000"
        ></path>
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          stopColor="#000000"
        ></path>
      </svg>
    </motion.div>
  );
};

const ToggleClose = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-gray-800 transition-colors hover:bg-gray-800"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <ChevronsRight
            className={`transition-transform ${
              open && "rotate-180"
            } text-white`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium text-white"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};
