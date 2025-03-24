import { NextRequest, NextResponse } from "next/server";
import { updateCartItem, removeCartItem } from "@/lib/cart-utils";

// Update cart item quantity
export async function PATCH(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    const { quantity } = await req.json();
    const { itemId } = params;

    if (typeof quantity !== "number" || quantity <= 0) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    const updatedItem = await updateCartItem(itemId, quantity);

    return NextResponse.json({ cartItem: updatedItem }, { status: 200 });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: "Failed to update cart item" },
      { status: 500 }
    );
  }
}

// Remove item from cart
export async function DELETE(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    const { itemId } = params;

    await removeCartItem(itemId);

    return NextResponse.json(
      { message: "Item removed from cart" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing cart item:", error);
    return NextResponse.json(
      { error: "Failed to remove cart item" },
      { status: 500 }
    );
  }
}
