export default function CartCheckoutButton({
  cart,
}: {
  cart: {
    CartItem: {
      Product: { name: string; price: number };
      quantity: number;
    }[];
  };
}) {
  const handleCheckout = async () => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items:
          cart?.CartItem?.map((item: CartItem) => ({
            name: item.Product.name,
            price: item.Product.price,
            quantity: item.quantity,
          })) || [],
      }),
    });
    
    const { checkoutUrl } = await response.json();
    window.location.href = checkoutUrl;
  };

  return (
    <button
      className="mt-4 w-full rounded-md bg-blue-600 py-3 text-white hover:bg-blue-700"
      onClick={handleCheckout}
    >
      Proceed to Checkout
    </button>
  );
}
