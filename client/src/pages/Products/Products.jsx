import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Filter, X, XCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCart } from "@/store/slices/cartSlice";
import { ProductCard } from "./components/ProductCard";
import axios from "axios";
import { SkeletonProductCard } from "./components/productSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
export const Products = ({ searchQuery }) => {
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
  const [productLoading, setProductLoading] = useState(false);
  const productsRef = useRef(null);
  const [productsHeight, setProductsHeight] = useState(0);
  useEffect(() => {
    const updateProductsHeight = () => {
      if (productsRef.current) {
        setProductsHeight(productsRef.current.offsetHeight);
      }
    };

    // Run it initially after render
    updateProductsHeight();

    // Also update on window resize
    window.addEventListener("resize", updateProductsHeight);

    return () => {
      window.removeEventListener("resize", updateProductsHeight);
    };
  }, []);

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

  useEffect(() => {
    setProducts([]); // Clear products on new search
    setPage(1); // Reset the page to 1 for a new search
  }, [searchQuery]);
  useEffect(() => {
    fetchProducts();
  }, [page, selectedBrands, selectedCategories, priceRange, searchQuery]);

  const fetchProducts = async () => {
    const response = await axios.get(`/product/fetchProducts`, {
      params: {
        page: page,
        limit: 8,
        brands: selectedBrands,
        categories: selectedCategories,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        searchQuery: searchQuery,
      },
    });
    // setProducts(response.data.products);
    console.log(response.data.products, response.data.total);
    if (searchQuery.length > 0) {
      setProducts(response.data.products);
      setProductLoading(false);
    } else {
      const newProducts = response.data.products;
      setProducts((prevProducts) => {
        const allProducts = [...prevProducts, ...newProducts];
        const uniqueProducts = Array.from(
          new Set(allProducts.map((p) => p._id))
        ).map((id) => allProducts.find((p) => p._id === id));
        return uniqueProducts;
      });
      setProductLoading(false);
    }
    console.log(products, products.length);

    setTotalProducts(response.data.total);
    console.log(totalProducts);
    setLoading(false);
  };

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

  const handleScroll = () => {
    if (productsRef.current) {
      const productsHeight = productsRef.current.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight;
      if (
        scrollPosition >= productsHeight - 900 &&
        totalProducts > products.length
      ) {
        setProductLoading(true);
      }
    }
  };

  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  window.addEventListener("scroll", debounce(handleScroll, 500));

  useEffect(() => {
    if (productLoading == true && products.length + 1 < totalProducts) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [productLoading]);

  const handleAddToCart = (product) => {
    const productWithQuantity = { ...product, quantity: product.quantity || 1 };
    dispatch(setCart(productWithQuantity));
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = currentCart.find((item) => item._id === product._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(currentCart));
  };

  return (
    <div
      ref={productsRef}
      className="min-h-screen bg-gradient-to-b from-green-100 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
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
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      handleAddToCart={handleAddToCart}
                    />
                  ))}
                  {productLoading && totalProducts != products.length && (
                    <div className="flex-1 justify-center items-center col-span-4">
                      <SkeletonProductCard />
                    </div>
                  )}
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
          )}
        </div>
      </div>
    </div>
  );
};
