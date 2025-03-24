import { NextRequest, NextResponse } from "next/server";
import { removeFromCart } from "@/app/actions/cart";
import { auth } from "@clerk/nextjs/server";

/**
 * API endpoint for removing an item from the cart
 *
 * Expected JSON body: { cartItemId: string }
 *
 * @param request The incoming request
 * @returns JSON response with success status or error message
 */
export async function DELETE(request: NextRequest) {
  try {
    // Authenticate the user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { cartItemId } = body;

    // Validate required parameters
    if (!cartItemId) {
      return NextResponse.json(
        { error: "Missing required parameter: cartItemId" },
        { status: 400 }
      );
    }

    // Call the server action to remove item from cart
    const result = await removeFromCart(cartItemId);

    // Return success response
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in /api/cart/remove:", error);

    // Return appropriate error response
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
