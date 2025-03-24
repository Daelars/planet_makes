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

export default DashboardContent;
