import { useState } from "react";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  Package,
  History,
  Settings,
  LogOut,
  LogIn,
  ShoppingBasket,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DropDownProfile } from "./DropdownProfile";
import { useDispatch, useSelector } from "react-redux";
import { Separator } from "./ui/separator";
import { handleAddToCart } from "@/utils/AddToCart";
import { handleSignOut } from "@/utils/handleSignOut";
import { toast } from "sonner";

export default function Navbar({ setSearchQuery }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const closeSheet = () => {
    setIsOpen(false);
  };
  const page = useLocation().pathname;
  return (
    <nav className="bg-gradient-to-r from-green-400 to-teal-500 p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={"/"}>
            <div className="text-2xl font-bold flex items-center gap-2 text-white"><ShoppingBasket/>NxtGen</div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">
            <div className="max-w-md w-full mx-4">
              {page === "/products" && (
                <div className="relative ">
                  <Input
                    type="search"
                    placeholder="Search for groceries..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full border-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              className="justify-start text-white rounded-full hover:text-black transition-colors"
              onClick={() => navigate("/products")}
            >
              <Package className="mr-2 h-5 w-5" />
              Products
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full text-white p-2 hover:text-black transition-colors"
              onClick={() => navigate("/cart")}
            >
              <Link to={"/cart"}>
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.cart.length}
                </span>
              </Link>
            </Button>

            <DropDownProfile />
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center space-x-2">
            {page === "/products" && (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-yellow-400 transition-colors"
                onClick={() => setIsSearchVisible(!isSearchVisible)}
              >
                <Search className="h-6 w-6" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:text-yellow-400 transition-colors"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.cart.length}
              </span>
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-green-50"
              >
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold text-green-700">
                    {user ? `Hello, ${user.name}!` : "Welcome!"}
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-8">
                  <Button
                    variant="ghost"
                    className="justify-start text-green-700 hover:bg-green-100"
                    onClick={() => {
                      closeSheet();
                      navigate("/");
                    }}
                  >
                    <User className="mr-2 h-5 w-5" />
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-green-700 hover:bg-green-100"
                    onClick={() => {
                      closeSheet();
                      navigate("/cart");
                    }}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Cart
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-green-700 hover:bg-green-100"
                    onClick={() => {
                      closeSheet();
                      navigate("/products");
                    }}
                  >
                    <Package className="mr-2 h-5 w-5" />
                    Products
                  </Button>
                  {isAuth && (
                    <Button
                      variant="ghost"
                      className="justify-start text-green-700 hover:bg-green-100"
                      onClick={() => {
                        navigate("/orderhistory");
                        closeSheet();
                      }}
                    >
                      <History className="mr-2 h-5 w-5" />
                      Order History
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    className="justify-start text-green-700 hover:bg-green-100"
                    onClick={() => {
                      navigate("/settings");
                      closeSheet();
                    }}
                  >
                    <Settings className="mr-2 h-5 w-5" />
                    Settings
                  </Button>
                  <Separator className="my-2" />
                  {isAuth ? (
                    <Button
                      variant="ghost"
                      className="justify-start text-red-600 hover:bg-red-100"
                      onClick={async () => {
                        const res = await handleSignOut(dispatch, navigate);
                        if (!res) {
                          toast.error("something went wrong");
                        }
                        closeSheet();
                        toast.success("Signed Out Successfully");
                        // navigate("/");
                      }}
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Sign Out
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      className="justify-start text-green-700 hover:bg-green-100"
                      onClick={() => {
                        navigate("/signin");
                        closeSheet();
                      }}
                    >
                      <LogIn className="mr-2 h-5 w-5" />
                      Sign In
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchVisible && (
          <div className="mt-4 md:hidden">
            {page === "/products" && (
              <div className="relative">
                <Input
                  type="search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for groceries..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border-none focus:ring-2 focus:ring-yellow-400"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
