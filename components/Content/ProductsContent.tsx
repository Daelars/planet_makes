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

export default ProductsContent;
