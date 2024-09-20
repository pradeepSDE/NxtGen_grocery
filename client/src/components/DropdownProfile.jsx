// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { removeUser } from "@/store/slices/authSlice";
// import axios from "axios";
// import { LogIn, LogOut, User, User2 } from "lucide-react";

// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

// export const DropDownProfile = () => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const handleLogout = async () => {
//     try {
//       const response = await axios.get("/logout", { withCredentials: true });
//       console.log(response);
//       if (response) {
//         console.log(response);
//         dispatch(removeUser());
//         navigate("/");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="ghost"
//           size="icon"
//           className="text-white rounded-full  hover:text-yellow-400 transition-colors"
//         >
//           <User className="h-6 w-6" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56">
//         <DropdownMenuLabel>Profile</DropdownMenuLabel>
//         <DropdownMenuSeparator />

//         {isAuthenticated ? (
//           <DropdownMenuItem
//             onClick={handleLogout}
//             className="flex gap-2 font-medium items-center focus:text-red-500"
//           >
//             <LogOut className="h-4 w-4" />
//             <span className="flex gap-2 justify-center items-center font-medium">
//               Log Out
//             </span>
//           </DropdownMenuItem>
//         ) : (
//           <DropdownMenuItem
//             onClick={() => {
//               navigate("/signin");
//             }}
//             className="flex gap-2 items-center font-medium focus:text-green-500"
//           >
//             <LogIn className="h-4 w-4" />
//             <span>SignIn</span>
//           </DropdownMenuItem>
//         )}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserCircle, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeUser } from "@/store/slices/authSlice";

export const DropDownProfile = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      const response = await axios.get("/logout", { withCredentials: true });
      console.log(response);
      if (response) {
        console.log(response);
        dispatch(removeUser());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <UserCircle className="h-5 w-5" />
            <span>My Account</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-xs leading-none text-green-600">
                john@example.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserCircle className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>Orders</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      onClick={() => {
        navigate("/signin");
      }}
      className="flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      <UserCircle className="h-5 w-5" />
      <span>Sign In</span>
    </Button>
  );
};
