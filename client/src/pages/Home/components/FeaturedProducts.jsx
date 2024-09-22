import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, ShoppingCart } from "lucide-react"

export const FeaturedProducts = ({setVisibleProducts, allProducts, visibleProducts}) => {
    const loadMore = () => {
        setVisibleProducts(prevCount => Math.min(prevCount + 4, allProducts.length))
      }
    return(
        <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {allProducts.slice(0, visibleProducts).map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardHeader className="p-2">
                <img src={product.image} alt={product.name} className="w-full h-36 object-cover rounded-md" />
              </CardHeader>
              <CardContent className="p-3">
                <CardTitle className="text-base font-semibold mb-1">{product.name}</CardTitle>
                <p className="text-green-600 font-bold text-sm">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-3 pt-0">
                <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white text-sm py-1">
                  <ShoppingCart className="mr-1 h-4 w-4" /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {visibleProducts < allProducts.length && (
          <div className="mt-8 text-center">
            <Button 
              onClick={loadMore} 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full text-lg inline-flex items-center"
            >
              <Plus className="mr-2 h-5 w-5" /> Load More
            </Button>
          </div>
        )}
      </section>
    )
}