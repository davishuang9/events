import { AccountDropdown } from "@/components/account-dropdown";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export async function Header() {
  const session = await getServerAuthSession();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }
  return (
    <div className="top-0 flex w-screen justify-between">
      <div className="p-4">
        <span className="text-xl">1️⃣</span>
        <span className="ml-2 text-xl font-bold text-indigo-600">onestop</span>
      </div>
      <AccountDropdown session={session} />
    </div>
  );
}
