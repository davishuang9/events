import { AccountDropdown } from "@/components/account-dropdown";
import { Session } from "node_modules/next-auth/core/types";

type HeaderProps = {
  session: Session | null;
};

export function Header({ session }: HeaderProps) {
  return (
    <div className="absolute top-0 flex w-screen justify-between">
      <div className="p-4">
        <span className="text-xl">1️⃣</span>
        <span className="ml-2 text-xl font-bold text-indigo-600">onestop</span>
      </div>
      <AccountDropdown session={session} />
    </div>
  );
}
