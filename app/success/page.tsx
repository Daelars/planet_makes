export default function SuccessPage() {
  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p>Thank you for your purchase. Your order is being processed.</p>
      <a
        href="/products"
        className="text-blue-600 hover:underline mt-4 inline-block"
      >
        Continue Shopping
      </a>
    </div>
  );
}
