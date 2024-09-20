import { useState } from "react";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { DropDownProfile } from "./DropdownProfile";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const cart = useSelector((state) => state.cart);

  return (
    <nav className="bg-gradient-to-r from-green-400 to-teal-500 p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={"/"}>
            <div className="text-2xl font-bold text-white">NxtGen</div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">
            <div className="max-w-md w-full mx-4">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search for groceries..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border-none focus:ring-2 focus:ring-yellow-400"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:text-yellow-400 transition-colors"
            >
              <Link to={"/cart"}>
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.cart.length}
              </span>
              </Link>
            </Button>
           
              <DropDownProfile/>
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-yellow-400 transition-colors"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            >
              <Search className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:text-yellow-400 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                  <Button variant="ghost" className="justify-start">
                    <User className="mr-2 h-4 w-4" />
                    profile
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Cart
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchVisible && (
          <div className="mt-4 md:hidden">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search for groceries..."
                className="w-full pl-10 pr-4 py-2 rounded-full border-none focus:ring-2 focus:ring-yellow-400"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
