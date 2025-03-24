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
export default SalesContent;
