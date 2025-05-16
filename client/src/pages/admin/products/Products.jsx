import React, { useState } from 'react'
import { Edit, Plus, Search, Trash2, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Sample product data
const initialProducts = [
  {
    id: 'prod-001',
    name: 'Organic Bananas',
    image: '/placeholder.svg?height=80&width=80',
    category: 'Fruits',
    price: 3.99,
    stock: 150,
    description: 'Fresh organic bananas sourced from local farms. Rich in potassium and perfect for smoothies or as a healthy snack.'
  },
  {
    id: 'prod-002',
    name: 'Fresh Avocados',
    image: '/placeholder.svg?height=80&width=80',
    category: 'Fruits',
    price: 5.99,
    stock: 75,
    description: 'Creamy, ripe avocados. Perfect for guacamole, salads, or as a nutritious spread on toast.'
  },
  {
    id: 'prod-003',
    name: 'Whole Milk',
    image: '/placeholder.svg?height=80&width=80',
    category: 'Dairy',
    price: 4.49,
    stock: 100,
    description: 'Farm-fresh whole milk. Rich, creamy, and packed with calcium and essential nutrients.'
  },
  {
    id: 'prod-004',
    name: 'Organic Spinach',
    image: '/placeholder.svg?height=80&width=80',
    category: 'Vegetables',
    price: 3.49,
    stock: 80,
    description: 'Organic spinach leaves, washed and ready to eat. Perfect for salads, smoothies, or cooking.'
  },
  {
    id: 'prod-005',
    name: 'Free Range Eggs',
    image: '/placeholder.svg?height=80&width=80',
    category: 'Dairy',
    price: 5.99,
    stock: 120,
    description: 'Farm-fresh free-range eggs from humanely raised chickens. No antibiotics or hormones.'
  },
  {
    id: 'prod-006',
    name: 'Sourdough Bread',
    image: '/placeholder.svg?height=80&width=80',
    category: 'Bakery',
    price: 6.99,
    stock: 30,
    description: 'Artisanal sourdough bread baked fresh daily. Made with organic flour and traditional fermentation methods.'
  },
  {
    id: 'prod-007',
    name: 'Organic Apples',
    image: '/placeholder.svg?height=80&width=80',
    category: 'Fruits',
    price: 4.99,
    stock: 200,
    description: 'Crisp, sweet organic apples. Perfect for snacking, baking, or adding to salads.'
  },
  {
    id: 'prod-008',
    name: 'Greek Yogurt',
    image: '/placeholder.svg?height=80&width=80',
    category: 'Dairy',
    price: 3.99,
    stock: 90,
    description: 'Creamy Greek yogurt. High in protein and probiotics. Perfect for breakfast or as a healthy snack.'
  }
]

// Available categories for dropdown
const categories = [
  'Fruits',
  'Vegetables',
  'Dairy',
  'Bakery',
  'Meat',
  'Seafood',
  'Beverages',
  'Snacks',
  'Canned Goods',
  'Frozen Foods',
  'Pantry Staples'
]

export default function ProductManagement() {
  const [products, setProducts] = useState(initialProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    image: '/placeholder.svg?height=80&width=80'
  })

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const handleAddProduct = () => {
    // Validate form
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.category) {
      alert('Please fill in all required fields')
      return
    }

    const productToAdd = {
      ...newProduct,
      id: `prod-${Math.floor(Math.random() * 1000)}`,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock)
    }

    setProducts([...products, productToAdd])
    setNewProduct({
      name: '',
      price: '',
      stock: '',
      category: '',
      description: '',
      image: '/placeholder.svg?height=80&width=80'
    })
    setIsAddDialogOpen(false)
  }

  const handleEditProduct = () => {
    // Validate form
    if (!currentProduct.name || !currentProduct.price || !currentProduct.stock || !currentProduct.category) {
      alert('Please fill in all required fields')
      return
    }

    const updatedProducts = products.map(product => 
      product.id === currentProduct.id ? {
        ...currentProduct,
        price: parseFloat(currentProduct.price),
        stock: parseInt(currentProduct.stock)
      } : product
    )

    setProducts(updatedProducts)
    setIsEditDialogOpen(false)
  }

  const handleDeleteProduct = () => {
    const updatedProducts = products.filter(product => product.id !== currentProduct.id)
    setProducts(updatedProducts)
    setIsDeleteDialogOpen(false)
  }

  const openEditDialog = (product) => {
    setCurrentProduct({...product})
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (product) => {
    setCurrentProduct(product)
    setIsDeleteDialogOpen(true)
  }

  const getStockStatusBadge = (stock) => {
    if (stock <= 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    } else if (stock < 20) {
      return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Low Stock</Badge>
    } else if (stock < 50) {
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium Stock</Badge>
    } else {
      return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <Button 
          className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search products..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <img 
                          src={product.image || "/placeholder.svg"} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{product.name}</div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                          {product.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <span className="mr-2">{product.stock}</span>
                          {getStockStatusBadge(product.stock)}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openEditDialog(product)}
                          >
                            <Edit className="h-4 w-4 text-blue-600" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openDeleteDialog(product)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-6 text-center text-gray-500">
                      No products found matching your search
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new product to your inventory.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product-name" className="text-right">
                Name *
              </Label>
              <Input
                id="product-name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="col-span-3"
                placeholder="Product name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product-price" className="text-right">
                Price *
              </Label>
              <Input
                id="product-price"
                type="number"
                step="0.01"
                min="0"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                className="col-span-3"
                placeholder="0.00"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product-stock" className="text-right">
                Stock *
              </Label>
              <Input
                id="product-stock"
                type="number"
                min="0"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                className="col-span-3"
                placeholder="0"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product-category" className="text-right">
                Category *
              </Label>
              <Select
                value={newProduct.category}
                onValueChange={(value) => setNewProduct({...newProduct, category: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="product-description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="product-description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                className="col-span-3"
                placeholder="Product description"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProduct} className="bg-green-600 hover:bg-green-700">
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      {currentProduct && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>
                Update the details of your product.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-product-name" className="text-right">
                  Name *
                </Label>
                <Input
                  id="edit-product-name"
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-product-price" className="text-right">
                  Price *
                </Label>
                <Input
                  id="edit-product-price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={currentProduct.price}
                  onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-product-stock" className="text-right">
                  Stock *
                </Label>
                <Input
                  id="edit-product-stock"
                  type="number"
                  min="0"
                  value={currentProduct.stock}
                  onChange={(e) => setCurrentProduct({...currentProduct, stock: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-product-category" className="text-right">
                  Category *
                </Label>
                <Select
                  value={currentProduct.category}
                  onValueChange={(value) => setCurrentProduct({...currentProduct, category: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-product-description" className="text-right pt-2">
                  Description
                </Label>
                <Textarea
                  id="edit-product-description"
                  value={currentProduct.description}
                  onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                  className="col-span-3"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditProduct} className="bg-green-600 hover:bg-green-700">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Product Dialog */}
      {currentProduct && (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the product "{currentProduct.name}" from your inventory.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteProduct} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}