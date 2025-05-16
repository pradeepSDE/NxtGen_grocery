import React, { useState } from "react";
import {
  BarChart,
  Bell,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Home,
  Menu,
  Package,
  Search,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function AdminPanel() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const SidebarItem = ({ icon, label, to }) => {
    const isActive = location.pathname.includes(to);
    return (
      <Link to={to}>
        <Button
          variant="ghost"
          className={`w-full justify-start mb-1 ${
            isActive
              ? "bg-green-100 text-green-800"
              : "text-green-800 hover:bg-green-50"
          }`}
        >
          {icon}
          <span className="ml-2">{label}</span>
        </Button>
      </Link>
    );
  };

  const Sidebar = () => (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex-shrink-0 hidden md:block">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-green-700 flex items-center">
          <ShoppingBag className="mr-2 h-6 w-6" />
          NxtGen Admin
        </h2>
      </div>
      <div className="px-4 py-2">
        <SidebarItem icon={<Home className="h-5 w-5" />} label="Dashboard" to="/admin/dashboard" />
        <SidebarItem icon={<ShoppingBag className="h-5 w-5" />} label="Orders" to="/admin/orders" />
        <SidebarItem icon={<Package className="h-5 w-5" />} label="Products" to="/admin/products" />
        <SidebarItem icon={<Users className="h-5 w-5" />} label="Users" to="/admin/users" />
      </div>
    </div>
  );

  const MobileSidebar = () => (
    <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
      <SheetContent side="left" className="w-[240px] p-0">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-green-700 flex items-center">
              <ShoppingBag className="mr-2 h-6 w-6" />
              NxtGen Admin
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="px-4 py-2">
          <SidebarItem icon={<Home className="h-5 w-5" />} label="Dashboard" to="/admin/dashboard" />
          <SidebarItem icon={<ShoppingBag className="h-5 w-5" />} label="Orders" to="/admin/orders" />
          <SidebarItem icon={<Package className="h-5 w-5" />} label="Products" to="/admin/products" />
          <SidebarItem icon={<Users className="h-5 w-5" />} label="Users" to="/admin/users" />
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <MobileSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden mr-2"
                onClick={() => setIsMobileSidebarOpen(true)}
              >
                <Menu className="h-6 w-6 text-green-700" />
              </Button>
              <div className="relative w-64 md:w-80">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search..."
                  className="pl-8 bg-gray-50 border-gray-200 focus:border-green-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              <Separator orientation="vertical" className="h-8" />
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Admin"
                  />
                  <AvatarFallback className="bg-green-200 text-green-700">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="ml-2 hidden md:block">
                  <p className="text-sm font-medium">Admin User</p>
                </div>
                <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="overflow-y-auto flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
