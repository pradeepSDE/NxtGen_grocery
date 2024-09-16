import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, User, User2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const DropDownProfile = () => {
  const signedIn = false;
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white rounded-full  hover:text-yellow-400 transition-colors"
        >
          <User className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {signedIn ? (
          <DropdownMenuItem className="flex gap-2 font-medium focus:text-red-500">
            <Link
              to={"/"}
              className="flex gap-2 justify-center items-center font-medium"
            >
              <LogOut className="h-4 w-4" />
              <span>log Out</span>
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => {
              navigate("/signin");
            }}
            className="flex gap-2 items-center font-medium focus:text-green-500"
          >
            <LogIn className="h-4 w-4" />
            <span>SignIn</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
