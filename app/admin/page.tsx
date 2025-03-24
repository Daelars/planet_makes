import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import { SearchUsers } from "./SearchUsers";
import { clerkClient } from "@clerk/nextjs/server";
import { removeRole, setRole } from "./_actions";

export default async function AdminDashboard(params: {
  searchParams: Promise<{ search?: string }>;
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const query = (await params.searchParams).search;

  const client = await clerkClient();

  const users = query ? (await client.users.getUserList({ query })).data : [];

  return (
    <div className="admin-dashboard p-8">
      <p className="text-xl font-semibold mb-4">
        This is the protected admin dashboard restricted to users with the
        `admin` role.
      </p>

      <SearchUsers />

      {users.map((user) => {
        return (
          <div
            key={user.id}
            className="user-card bg-gray-100 p-4 border border-gray-300 rounded mb-4"
          >
            <div className="font-bold text-lg">
              {user.firstName} {user.lastName}
            </div>

            <div className="text-sm text-gray-700">
              {
                user.emailAddresses.find(
                  (email) => email.id === user.primaryEmailAddressId
                )?.emailAddress
              }
            </div>

            <div className="text-sm text-blue-600 mb-2">
              {user.publicMetadata.role as string}
            </div>

            <div className="flex space-x-4">
              <form
                action={(formData: FormData) =>
                  setRole(formData).then(() => {})
                }
                method="post"
              >
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="admin" name="role" />
                <button type="submit" className="btn btn-blue">
                  Make Admin
                </button>
              </form>

              <form
                action={(formData: FormData) =>
                  setRole(formData).then(() => {})
                }
                method="post"
              >
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="moderator" name="role" />
                <button type="submit" className="btn btn-green">
                  Make Moderator
                </button>
              </form>

              <form
                action={(formData: FormData) =>
                  removeRole(formData).then(() => {})
                }
                method="post"
              >
                <input type="hidden" value={user.id} name="id" />
                <button type="submit" className="btn btn-red">
                  Remove Role
                </button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}
