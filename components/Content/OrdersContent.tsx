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

export default OrdersContent;
