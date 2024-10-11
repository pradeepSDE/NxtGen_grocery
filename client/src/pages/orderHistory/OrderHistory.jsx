import { useSelector } from "react-redux";
import { OrderCard } from "./components/OrderCard";
import { NoOrders } from "./components/NoOrders";
import axios from "axios";
import { useEffect, useState } from "react";
import { SkeletonOrderHistory } from "./components/Skeleton";

export const OrderHistory = () => {
  const token = localStorage.getItem("token");
  const [pastOrders, setPastOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders_history", {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in Authorization header
          },
        });
        const array = Array.from(Object.values(response.data));
        
        setPastOrders(array);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  const hasOrders = pastOrders.length > 0;
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      {loading ? (
        <SkeletonOrderHistory />
      ) : (
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
            Your Order History
          </h1>
          <h3 className="text-xl font-semibold text-green-800  text-center">
            Showing Last 10 Orders
          </h3>
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
      )}
    </div>
  );
};
