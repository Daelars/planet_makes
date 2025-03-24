"use server";

import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";

export async function setRole(
  formData: FormData
): Promise<{ message: UserPublicMetadata }> {
  const client = await clerkClient();

  // Check that the user trying to set the role is an admin
  if (!checkRole("admin")) {
    console.log("Not Authorized");
    throw new Error("Not Authorized");
  }

  try {
    const res = await client.users.updateUserMetadata(
      formData.get("id") as string,
      {
        publicMetadata: { role: formData.get("role") },
      }
    );
    return { message: res.publicMetadata };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user metadata");
  }
}
export async function removeRole(
  formData: FormData
): Promise<{ message: UserPublicMetadata }> {
  const client = await clerkClient();

  try {
    const res = await client.users.updateUserMetadata(
      formData.get("id") as string,
      {
        publicMetadata: { role: null },
      }
    );
    return { message: res.publicMetadata };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user metadata");
  }
}
