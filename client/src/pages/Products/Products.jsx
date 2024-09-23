import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ShoppingCart, Filter, X, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "@/store/slices/cartSlice";
import { ProductCard } from "./components/ProductCard";
import axios from "axios";
import { setLoading } from "@/store/slices/productSlice";

export const Products = ({ searchQuery }) => {
  console.log(searchQuery);

  

  const initialProducts = [
    {
      id: 1,
      name: "Organic Apples",
      price: 3.99,
      category: "Fruits",
      brand: "Nature's Best",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "Fresh Spinach",
      price: 2.49,
      category: "Vegetables",
      brand: "Green Farms",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "Whole Grain Bread",
      price: 4.99,
      category: "Bakery",
      brand: "Healthy Loaf",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      name: "Organic Milk",
      price: 3.79,
      category: "Dairy",
      brand: "Pure Dairy",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 5,
      name: "Free Range Eggs",
      price: 5.99,
      category: "Dairy",
      brand: "Happy Hens",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 6,
      name: "Organic Bananas",
      price: 1.99,
      category: "Fruits",
      brand: "Nature's Best",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 7,
      name: "Whole Wheat Pasta",
      price: 2.99,
      category: "Grains",
      brand: "Pasta Paradise",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 8,
      name: "Organic Tomatoes",
      price: 3.49,
      category: "Vegetables",
      brand: "Green Farms",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "66f04bc2a7096f624655cb32",
      name: "Aashirwaad Atta 5kg",
      price: 2,
      category: "Atta & Flours",
      brand: "ITC",
      image:
      "https://imgs.search.brave.com/fanPfyf4F4PJdgMPCHbskAhZ7AueDbBoX8iWsRdR_Dw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/amlvbWFydC5jb20v/aW1hZ2VzL3Byb2R1/Y3Qvb3JpZ2luYWwv/NDkwMDAwMDQxL2Fh/c2hpcnZhYWQtc2h1/ZGgtY2hha2tpLWF0/dGEtMTAta2ctcHJv/ZHVjdC1pbWFnZXMt/bzQ5MDAwMDA0MS1w/NDkwMDAwMDQxLTAt/MjAyNDAxMjYwODUx/LmpwZz9pbT1SZXNp/emU9KDE1MCwxNTAp",
    },
    {
      id: 10,
      name: "Maggi noodles 72g",
      price: 2,
      category: "Noodles & Pasta",
      brand: "Nestle",
      image:
        "https://imgs.search.brave.com/fanPfyf4F4PJdgMPCHbskAhZ7AueDbBoX8iWsRdR_Dw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/amlvbWFydC5jb20v/aW1hZ2VzL3Byb2R1/Y3Qvb3JpZ2luYWwv/NDkwMDAwMDQxL2Fh/c2hpcnZhYWQtc2h1/ZGgtY2hha2tpLWF0/dGEtMTAta2ctcHJv/ZHVjdC1pbWFnZXMt/bzQ5MDAwMDA0MS1w/NDkwMDAwMDQxLTAt/MjAyNDAxMjYwODUx/LmpwZz9pbT1SZXNp/emU9KDE1MCwxNTAp",
    },
    {
      id: 11,
      name: "Egg Crates",
      price: 2,
      category: "Dairy",
      brand: "fresh",
      image:
      "https://imgs.search.brave.com/sRyePyudYg1ptCx-SqFLybjwaqvJ1_SfrEJOH3Vv0sc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODFBN014cjk1ZEwu/anBn",
    },
    {
      id: 12,
      name: "Fortune soya oil 1L",
      price: 2,
      category: "edible oils",
      brand: "fortune",
      image:
      "https://5.imimg.com/data5/WH/LC/MY-48490939/1-kg-refined-oil-1000x1000.jpg",
    },
    {
      id: 13,
      name: "Fortune chana besan 500gm",
      price: 2,
      category: "Atta & Flours",
      brand: "fortune",
      image:
      "https://imgs.search.brave.com/EePz1QvfWhxx5ZVVHF6OZd0LXmkIAgVu0JhvEFVfXpA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFmVG5iaTgrOUwu/anBn",
    },
    {
      id: "66f16d352f75e5338caf115f",
      name: "pradeep",
      description: "full stack dev",
      price: 2,
      category: "mern devs",
      stock: 1,
      image:
        "https://avatars.githubusercontent.com/u/103747065?s=400&u=37c4caf64aa456aea97845a6634019452c53b444&v=4",
      brand: "Bisen",
      createdAt: {
        $date: "2024-09-23T13:29:25.140Z",
      },
      updatedAt: {
        $date: "2024-09-23T13:29:25.140Z",
      },
      __v: 0,
    },
  ];
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const brands = Array.from(new Set(products.map((p) => p.brand)));
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    setLoading(true);
    const response = await axios.get('/product/fetchProducts')
    console.log(response.data)
    setProducts(response.data)
  };

  useEffect(()=>{
    fetchProducts()
  },[products])
  
  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)) &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
    );
    setFilteredProducts(filtered);
  }, [products, priceRange, selectedCategories, selectedBrands, searchQuery]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const formatPrice = (price) => {
    return typeof price === "number" ? `$${price.toFixed(2)}` : "N/A";
  };

  const handleAddToCart = (product) => {
    const productWithQuantity = { ...product, quantity: product.quantity || 1 };
    dispatch(setCart(productWithQuantity));
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = currentCart.find((item) => item.id === product.id);
    // console.log(exist)
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(currentCart));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Our Products
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter sidebar for desktop */}
          <Card className="hidden   md:block w-64 h-fit sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Filter className="mr-2" /> Filters
              </CardTitle>
              <Button
                className="flex items-center gap-2 text-green-700 font-medium"
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedCategories([]);
                  setPriceRange([0, 10]);
                }}
                variant="outline"
              >
                <XCircle />
                Clear all filters
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-green-700 mb-2 block">Price Range</Label>
                <Slider
                  min={0}
                  max={10}
                  step={0.5}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-sm text-green-600">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
              <div>
                <Label className="text-green-700 mb-2 block">Categories</Label>
                {categories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="text-sm text-green-600 cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
              <div>
                <Label className="text-green-700 mb-2 block">Brands</Label>
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => toggleBrand(brand)}
                    />
                    <label
                      htmlFor={`brand-${brand}`}
                      className="text-sm text-green-600 cursor-pointer"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Filter button for mobile */}
          <Button
            className="md:hidden fixed bottom-4 right-4 z-10 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg"
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter className="mr-2" /> Filters
          </Button>

          {/* Filter sidebar for mobile */}
          {isFilterOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
              <div className="absolute right-0 top-0 bottom-0 w-64 bg-white p-4 overflow-y-auto">
                <Button
                  className="absolute top-2 right-2 text-green-700"
                  variant="ghost"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <X />
                </Button>
                <h2 className="text-xl font-semibold text-green-700 mb-4">
                  Filters
                </h2>
                <div className="space-y-6">
                  <div>
                    <Label className="text-green-700 mb-2 block">
                      Price Range
                    </Label>
                    <Slider
                      min={0}
                      max={10}
                      step={0.5}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-sm text-green-600">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-green-700 mb-2 block">
                      Categories
                    </Label>
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Checkbox
                          id={`mobile-category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <label
                          htmlFor={`mobile-category-${category}`}
                          className="text-sm text-green-600 cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div>
                    <Label className="text-green-700 mb-2 block">Brands</Label>
                    {brands.map((brand) => (
                      <div
                        key={brand}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Checkbox
                          id={`mobile-brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <label
                          htmlFor={`mobile-brand-${brand}`}
                          className="text-sm text-green-600 cursor-pointer"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                    formatPrice={formatPrice}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <CardTitle className="text-2xl font-semibold text-green-800 mb-4">
                  No Products Found
                </CardTitle>
                <p className="text-green-600">
                  Sorry, no products match your current filters. Try adjusting
                  your search criteria.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
