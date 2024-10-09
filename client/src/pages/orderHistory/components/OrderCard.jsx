import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "lucide-react";

export const OrderCard = ({ order }) => (
  <Card className="mb-6">
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle className="text-xl font-semibold text-green-700">
          Order #{order._id}
        </CardTitle>
        <Badge
          variant={
            order.paymentStatus === "paid" ? "default" : "secondary"
          }
          className={`text-sm ${order.paymentStatus === "paid" ? "bg-green-500" : ""}`}
        >
          {order.paymentStatus}
        </Badge>
      </div>
      <CardDescription className="flex items-center text-green-600">
        <Calendar className="w-4 h-4 mr-2" />
       
        {new Date(order.date).toISOString().split("T")[0] +
          " " +
          new Date(order.date).toISOString().split("T")[1].split(".")[0]}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {order.cartItems.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <span className="text-green-800">
              {item.name} (x{item.quantity})
            </span>
            <span className="font-medium text-green-700">
            ₹{(item.price * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <Separator className="my-4" />
      <div className="flex justify-between items-center font-bold">
        <span className="text-green-800">Total</span>
        <span className="text-green-700"> ₹{order.total.toFixed(2)}</span>
      </div>
    </CardContent>
    <CardFooter>
      <Button
        variant="outline"
        className="w-full border-green-500 text-green-500 hover:bg-green-50"
      >
        View Order Details
      </Button>
    </CardFooter>
  </Card>
);
