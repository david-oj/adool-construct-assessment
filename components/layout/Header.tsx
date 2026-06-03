"use client";

import { LogOutIcon, UserCircleIcon } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { ArrowDown } from "../icons";

const Header = () => {
  const { status } = useSession();
  console.log("Status:", status);
  const handleLogout = () => {
    signOut({ redirectTo: "/signin" });
  };

  return (
    <header className="py-2 md:py-4 padding-x bg-white">
      <div className="container flex items-center justify-between">
        <h2 className="text-lg text-secondary">
          Task
          <span className="text-primary">Flow</span>
        </h2>

        <div className="flex items-center gap-6">
          {status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-0 bg-transparent hover:underline hover:bg-transparent decoration-primary underline-offset-[1.5px] "
                >
                  <UserCircleIcon className="size-6" />
                  <p className="leading-5">My Profile</p>
                  <ArrowDown className="size-5 text-black" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                onCloseAutoFocus={(e) => e.preventDefault()}
                align="end"
              >
                <DropdownMenuItem asChild>
                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    className="text-sm w-full leading-5 flex items-center justify-between cursor-pointer"
                  >
                    Logout
                    <LogOutIcon className="size-4 text-red-600" />
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/signin" className="flex gap-2 ">
              <UserCircleIcon className="size-6" />
              <p className="leading-5 hover:text-primary duration-200">
                Login/Register
              </p>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
