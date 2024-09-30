import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Calendar } from "lucide-react";
import Link from "next/dist/client/link";
import { Session } from "node_modules/next-auth/core/types";

type AccountDropdownProps = {
  session: Session | null;
};

export function AccountDropdown({ session }: AccountDropdownProps) {
  return (
    <div className="flex justify-end p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="text-2xl" variant="outline" size="icon">
            ☰
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
          {/* <DropdownMenuSeparator /> */}
          {session && (
            <>
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Events</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          {/* <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help</span>
          </DropdownMenuItem> */}
          <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              {session ? "Sign out" : "Sign in"}
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
