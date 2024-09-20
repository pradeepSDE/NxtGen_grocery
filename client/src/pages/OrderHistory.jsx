import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Calendar, Clock, Package } from "lucide-react"

// Mock data for past orders
const pastOrders = [
  {
    id: "ORD001",
    date: "2023-06-15",
    status: "Delivered",
    total: 45.97,
    items: [
      { name: "Organic Apples", quantity: 2, price: 3.99 },
      { name: "Fresh Spinach", quantity: 1, price: 2.49 },
      { name: "Whole Grain Bread", quantity: 1, price: 4.99 },
    ]
  },
  {
    id: "ORD002",
    date: "2023-06-10",
    status: "Processing",
    total: 32.45,
    items: [
      { name: "Organic Milk", quantity: 2, price: 3.79 },
      { name: "Free Range Eggs", quantity: 1, price: 5.99 },
      { name: "Organic Bananas", quantity: 1, price: 1.99 },
    ]
  },
]

const OrderCard = ({ order }) => (
  <Card className="mb-6">
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle className="text-xl font-semibold text-green-700">Order #{order.id}</CardTitle>
        <Badge variant={order.status === "Delivered" ? "default" : "secondary"} className="text-sm">
          {order.status}
        </Badge>
      </div>
      <CardDescription className="flex items-center text-green-600">
        <Calendar className="w-4 h-4 mr-2" />
        {order.date}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {order.items.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <span className="text-green-800">{item.name} (x{item.quantity})</span>
            <span className="font-medium text-green-700">${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <Separator className="my-4" />
      <div className="flex justify-between items-center font-bold">
        <span className="text-green-800">Total</span>
        <span className="text-green-700">${order.total.toFixed(2)}</span>
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full border-green-500 text-green-500 hover:bg-green-50">
        View Order Details
      </Button>
    </CardFooter>
  </Card>
)

const NoOrders = () => (
  <Card className="text-center py-12">
    <CardContent>
      <ShoppingBag className="w-16 h-16 mx-auto text-green-500 mb-4" />
      <h3 className="text-2xl font-semibold text-green-700 mb-2">No Orders Yet</h3>
      <p className="text-green-600 mb-6">Looks like you have not placed any orders. Start shopping to fill your basket!</p>
      <Button className="bg-green-500 hover:bg-green-600 text-white">
        Start Shopping
      </Button>
    </CardContent>
  </Card>
)

export const OrderHistory=()=> {
  const hasOrders = pastOrders.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">Your Order History</h1>
        
        {hasOrders ? (
          <div className="space-y-6">
            {pastOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <NoOrders />
        )}
      </div>
    </div>
  )
}