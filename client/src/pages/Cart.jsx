import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, ShoppingBag, Truck, CreditCard } from "lucide-react"



export const Cart=()=> {
  const [address, setAddress] = useState("123 Green St, Freshville, FC 12345")
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [products, setProducts] = useState([
    { id: 1, name: "Organic Apples", price: 3.99, quantity: 2, image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Fresh Spinach", price: 2.49, quantity: 1, image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Whole Grain Bread", price: 4.99, quantity: 1, image: "/placeholder.svg?height=100&width=100" },
  ])

  const updateQuantity = (id, change) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, quantity: Math.max(0, product.quantity + change) } : product
    ).filter(product => product.quantity > 0))
  }

  const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">Your Cart</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <Truck className="mr-2" /> Delivery Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditingAddress ? (
              <div className="flex items-center">
                <Input 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                  className="flex-grow mr-2 border-green-300 focus:border-green-500 focus:ring-green-500"
                />
                <Button onClick={() => setIsEditingAddress(false)} className="bg-green-500 hover:bg-green-600 text-white">
                  Save
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-green-600">{address}</p>
                <Button onClick={() => setIsEditingAddress(true)} variant="outline" className="border-green-500 text-green-500 hover:bg-green-50">
                  Update
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <ShoppingBag className="mr-2" /> Your Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            {products.map((product) => (
              <div key={product.id} className="flex items-center py-4 border-b border-green-200 last:border-b-0">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded mr-4" />
                <div className="flex-grow">
                  <h3 className="font-semibold text-green-800">{product.name}</h3>
                  <p className="text-green-600">${product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <Button onClick={() => updateQuantity(product.id, -1)} variant="outline" size="icon" className="h-8 w-8 rounded-full p-0 border-green-500 text-green-500 hover:bg-green-50">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-2 font-semibold text-green-800">{product.quantity}</span>
                  <Button onClick={() => updateQuantity(product.id, 1)} variant="outline" size="icon" className="h-8 w-8 rounded-full p-0 border-green-500 text-green-500 hover:bg-green-50">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="text-lg font-semibold text-green-800">Total:</div>
            <div className="text-2xl font-bold text-green-600">${total.toFixed(2)}</div>
          </CardFooter>
        </Card>

        <Button className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
          <CreditCard className="mr-2" /> Proceed to Payment
        </Button>
      </div>
    </div>
  )
}