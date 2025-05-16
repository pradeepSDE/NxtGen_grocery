
import React, { useState } from 'react'
import { BarChart, Bell, ChevronDown, ChevronRight, DollarSign, Home, Menu, Package, Search, ShoppingBag, Users, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
export default function Dashboard() {
     const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
      };
    // Sample data for the chart
    const chartData = [
      { day: "Mon", sales: 1200 },
      { day: "Tue", sales: 1800 },
      { day: "Wed", sales: 1400 },
      { day: "Thu", sales: 2200 },
      { day: "Fri", sales: 2600 },
      { day: "Sat", sales: 3100 },
      { day: "Sun", sales: 2400 },
    ];
    
    // Sample data for recent orders
    const recentOrders = [
      {
        id: "ORD-001",
        customer: "John Doe",
        date: "2023-05-15",
        total: 78.5,
        status: "Delivered",
      },
      {
        id: "ORD-002",
        customer: "Jane Smith",
        date: "2023-05-15",
        total: 125.99,
        status: "Processing",
      },
      {
        id: "ORD-003",
        customer: "Robert Johnson",
        date: "2023-05-14",
        total: 43.25,
        status: "Delivered",
      },
      {
        id: "ORD-004",
        customer: "Emily Davis",
        date: "2023-05-14",
        total: 92.75,
        status: "Shipped",
      },
      {
        id: "ORD-005",
        customer: "Michael Brown",
        date: "2023-05-13",
        total: 156.8,
        status: "Processing",
      },
    ];
    
  return (
    <div>
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Welcome back to your admin dashboard</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-2 rounded-full bg-green-100 p-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">$24,780</div>
                    <p className="text-xs text-green-600">+12% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-2 rounded-full bg-blue-100 p-2">
                    <ShoppingBag className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">1,245</div>
                    <p className="text-xs text-blue-600">+5% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-2 rounded-full bg-amber-100 p-2">
                    <Package className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">450</div>
                    <p className="text-xs text-amber-600">+8 new products</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-2 rounded-full bg-purple-100 p-2">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">2,840</div>
                    <p className="text-xs text-purple-600">+18% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weekly Sales Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Sales</CardTitle>
                <CardDescription>Sales performance for the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <div className="h-full flex items-end">
                    {chartData.map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full max-w-[40px] bg-gradient-to-t from-green-500 to-green-400 rounded-t-md"
                          style={{ height: `${(item.sales / 3500) * 100}%` }}
                        ></div>
                        <div className="mt-2 text-xs text-gray-600">{item.day}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Top Selling Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Selling</CardTitle>
                <CardDescription>Best performing products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center mr-3">
                      <Package className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Organic Bananas</h4>
                      <p className="text-xs text-gray-500">Fruits</p>
                    </div>
                    <div className="text-sm font-medium">$1,200</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center mr-3">
                      <Package className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Fresh Avocados</h4>
                      <p className="text-xs text-gray-500">Fruits</p>
                    </div>
                    <div className="text-sm font-medium">$980</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center mr-3">
                      <Package className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Whole Milk</h4>
                      <p className="text-xs text-gray-500">Dairy</p>
                    </div>
                    <div className="text-sm font-medium">$840</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center mr-3">
                      <Package className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Organic Spinach</h4>
                      <p className="text-xs text-gray-500">Vegetables</p>
                    </div>
                    <div className="text-sm font-medium">$720</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Orders Table */}
          <div className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest customer orders</CardDescription>
                </div>
                <Button variant="outline" className="text-green-700 border-green-200 hover:bg-green-50">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm">{order.id}</td>
                          <td className="py-3 px-4 text-sm">{order.customer}</td>
                          <td className="py-3 px-4 text-sm">{order.date}</td>
                          <td className="py-3 px-4 text-sm font-medium">{formatCurrency(order.total)}</td>
                          <td className="py-3 px-4">
                            <Badge className={
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                              'bg-amber-100 text-amber-800'
                            }>
                              {order.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
    </div>
  )
}
