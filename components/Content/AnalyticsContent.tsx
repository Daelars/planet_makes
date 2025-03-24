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

export default AnalyticsContent;
