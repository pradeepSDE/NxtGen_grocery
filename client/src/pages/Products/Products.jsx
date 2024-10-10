import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Filter, X, XCircle, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCart } from "@/store/slices/cartSlice";
import { ProductCard } from "./components/ProductCard";
import axios from "axios";
import { SkeletonProductCard } from "./components/productSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
export const Products = ({ searchQuery }) => {
  const [visibleProducts, setVisibleProducts] = useState(10);
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCategoriesAndBrands = async () => {
      try {
        const response = await axios.get("/product/fetchCategoriesandBrands");
        setCategories(response.data.categories || []);
        setBrands(response.data.brands || []);
      } catch (error) {
        console.error("Error fetching categories and brands:", error);
      }
    };
    fetchCategoriesAndBrands();
  }, []);

  const loadMore = () => {
    if (
      products.length <= totalProducts ||
      products.length === 0 ||
      totalProducts === 0
    ) {
      setPage((prev) => prev + 1);
    }
    if (visibleProducts < totalProducts) {
      setVisibleProducts((prevCount) => prevCount + 8); // Load 8 more products
    }
    // setVisibleProducts((prevCount) => Math.min(prevCount + 8, products.length));
  };
  const fetchProducts = async () => {
    setLoading(true);
    const response = await axios.get(`/product/fetchProducts`, {
      params: {
        page: page,
        limit: 10,
        brands: selectedBrands,
        categories: selectedCategories,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        searchQuery: searchQuery,
      },
    });
    // setProducts(response.data.products);
    console.log(response.data.products, response.data.total);

    setProducts((prevProducts) => [...prevProducts, ...response.data.products]);
    console.log(products);

    setTotalProducts(response.data.total);
    console.log(totalProducts);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [page, selectedBrands, selectedCategories, priceRange, searchQuery]);

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
    return typeof price === "number" ? `₹${price.toFixed(2)}` : "N/A";
  };

  const handleAddToCart = (product) => {
    const productWithQuantity = { ...product, quantity: product.quantity || 1 };
    dispatch(setCart(productWithQuantity));
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = currentCart.find((item) => item.id === product.id);
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
          <ScrollArea className=" md:h-screen w-auto rounded-md border">
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
                    setPriceRange([0, 10000]);
                  }}
                  variant="outline"
                >
                  <XCircle />
                  Clear all filters
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-green-700 mb-2 block">
                    Price Range
                  </Label>
                  <Slider
                    min={0}
                    max={10000}
                    step={100}
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
                  {categories &&
                    categories.map((category) => (
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
                    <div
                      key={brand}
                      className="flex items-center space-x-2 mb-2"
                    >
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
          </ScrollArea>

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
                <Button
                  className="flex mx-auto my-3 rounded-full items-center gap-2 text-green-700 font-medium"
                  onClick={() => {
                    setSelectedBrands([]);
                    setSelectedCategories([]);
                    setPriceRange([0, 10000]);
                    setIsFilterOpen(false);
                  }}
                  variant="outline"
                >
                  <XCircle />
                  Clear all filters
                </Button>
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
          {loading ? (
            <div className="flex-1">
              <SkeletonProductCard />
            </div>
          ) : (
            <div className="flex-1">
              {products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-4">
                  {products.slice(0, visibleProducts).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      handleAddToCart={handleAddToCart}
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
              {visibleProducts < products.length && (
                <div className="mt-8 text-center">
                  <Button
                    onClick={loadMore}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full text-lg inline-flex items-center"
                  >
                    <Plus className="mr-2 h-5 w-5" /> Load More
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
