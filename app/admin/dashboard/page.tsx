import { UserButton } from "@clerk/nextjs";
import { getOrCreateUser, getUserCart } from "@/lib/user-utils";
import Link from "next/link";

export default async function DashboardPage() {
  // This will create the user and cart in your Prisma DB if they don't exist
  const user = await getOrCreateUser();
  const cart = await getUserCart();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--background)] p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">User Profile</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {user.name || "Not set"}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">Role:</span> {user.role}
            </p>
            <p>
              <span className="font-medium">User ID:</span> {user.id}
            </p>
            <p>
              <span className="font-medium">Clerk ID:</span> {user.clerkId}
            </p>
          </div>
        </div>

        <div className="bg-[var(--background)] p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Cart</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Cart ID:</span>{" "}
              {cart?.id || "No cart"}
            </p>
            <p>
              <span className="font-medium">Items in cart:</span>{" "}
              {cart?.CartItem.length || 0}
            </p>
            {(cart?.CartItem?.length ?? 0) > 0 ? (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Items:</h3>
                <ul className="space-y-2">
                  {cart?.CartItem.map((item) => (
                    <li key={item.id} className="border-b pb-2">
                      <p className="font-medium">{item.Product.name}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.Product.price.toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-[var(--foreground)] mt-2">
                Your cart is empty
              </p>
            )}
            <div className="mt-4">
              <Link href="/products" className="text-blue-600 hover:underline">
                Browse Products
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-[var(--background)] p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <Link href="/orders" className="text-blue-600 hover:underline">
            View All Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
