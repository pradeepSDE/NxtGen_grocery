import React, { useState } from 'react'
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, Filter, MoreHorizontal, Search, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

// Sample order data
const orders = [
  { 
    id: 'ORD-001', 
    customer: 'John Doe', 
    email: 'john.doe@example.com',
    date: '2023-05-15', 
    total: 78.50, 
    status: 'Delivered',
    items: [
      { id: 'PROD-001', name: 'Organic Bananas', quantity: 2, price: 3.99 },
      { id: 'PROD-002', name: 'Fresh Avocados', quantity: 4, price: 5.99 },
      { id: 'PROD-003', name: 'Whole Milk', quantity: 1, price: 4.49 },
    ],
    address: '123 Main St, Anytown, CA 12345',
    phone: '(555) 123-4567',
    paymentMethod: 'Credit Card',
  },
  { 
    id: 'ORD-002', 
    customer: 'Jane Smith', 
    email: 'jane.smith@example.com',
    date: '2023-05-15', 
    total: 125.99, 
    status: 'Processing',
    items: [
      { id: 'PROD-004', name: 'Organic Spinach', quantity: 1, price: 3.49 },
      { id: 'PROD-005', name: 'Free Range Eggs', quantity: 2, price: 5.99 },
      { id: 'PROD-006', name: 'Sourdough Bread', quantity: 1, price: 6.99 },
    ],
    address: '456 Oak Ave, Springfield, IL 67890',
    phone: '(555) 987-6543',
    paymentMethod: 'PayPal',
  },
  { 
    id: 'ORD-003', 
    customer: 'Robert Johnson', 
    email: 'robert.johnson@example.com',
    date: '2023-05-14', 
    total: 43.25, 
    status: 'Delivered',
    items: [
      { id: 'PROD-007', name: 'Organic Apples', quantity: 3, price: 4.99 },
      { id: 'PROD-008', name: 'Greek Yogurt', quantity: 2, price: 3.99 },
    ],
    address: '789 Pine St, Lakeside, WA 54321',
    phone: '(555) 456-7890',
    paymentMethod: 'Credit Card',
  },
  { 
    id: 'ORD-004', 
    customer: 'Emily Davis', 
    email: 'emily.davis@example.com',
    date: '2023-05-14', 
    total: 92.75, 
    status: 'Shipped',
    items: [
      { id: 'PROD-009', name: 'Organic Carrots', quantity: 2, price: 2.99 },
      { id: 'PROD-010', name: 'Almond Milk', quantity: 1, price: 3.99 },
      { id: 'PROD-011', name: 'Quinoa', quantity: 1, price: 5.99 },
    ],
    address: '321 Maple Dr, Riverside, TX 13579',
    phone: '(555) 789-0123',
    paymentMethod: 'Cash on Delivery',
  },
  { 
    id: 'ORD-005', 
    customer: 'Michael Brown', 
    email: 'michael.brown@example.com',
    date: '2023-05-13', 
    total: 156.80, 
    status: 'Processing',
    items: [
      { id: 'PROD-012', name: 'Organic Blueberries', quantity: 2, price: 6.99 },
      { id: 'PROD-013', name: 'Grass-Fed Beef', quantity: 1, price: 15.99 },
      { id: 'PROD-014', name: 'Organic Honey', quantity: 1, price: 8.99 },
    ],
    address: '654 Cedar Ln, Mountain View, CA 24680',
    phone: '(555) 321-6547',
    paymentMethod: 'Credit Card',
  },
  { 
    id: 'ORD-006', 
    customer: 'Sarah Wilson', 
    email: 'sarah.wilson@example.com',
    date: '2023-05-13', 
    total: 67.50, 
    status: 'Cancelled',
    items: [
      { id: 'PROD-015', name: 'Organic Tomatoes', quantity: 3, price: 4.99 },
      { id: 'PROD-016', name: 'Whole Wheat Pasta', quantity: 2, price: 3.49 },
    ],
    address: '987 Birch St, Sunnydale, FL 97531',
    phone: '(555) 654-9870',
    paymentMethod: 'PayPal',
  },
  { 
    id: 'ORD-007', 
    customer: 'David Miller', 
    email: 'david.miller@example.com',
    date: '2023-05-12', 
    total: 112.30, 
    status: 'Delivered',
    items: [
      { id: 'PROD-017', name: 'Organic Kale', quantity: 1, price: 3.99 },
      { id: 'PROD-018', name: 'Wild Caught Salmon', quantity: 1, price: 12.99 },
      { id: 'PROD-019', name: 'Organic Brown Rice', quantity: 1, price: 4.99 },
    ],
    address: '159 Walnut Ave, Oakdale, NY 75319',
    phone: '(555) 159-7531',
    paymentMethod: 'Credit Card',
  },
]

// Status options for filtering and updating
const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
]

export default function AdminOrderManagement() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false)
  const [editStatusOpen, setEditStatusOpen] = useState(false)
  const [cancelOrderOpen, setCancelOrderOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 5

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Filter orders based on search, status, and date range
  const filteredOrders = orders.filter(order => {
    // Search filter
    const searchMatch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Status filter
    const statusMatch = 
      statusFilter === 'all' || 
      order.status.toLowerCase() === statusFilter.toLowerCase()
    
    // Date range filter
    let dateMatch = true
    if (dateRange.from && dateRange.to) {
      const orderDate = new Date(order.date)
      const fromDate = new Date(dateRange.from)
      const toDate = new Date(dateRange.to)
      dateMatch = orderDate >= fromDate && orderDate <= toDate
    }
    
    return searchMatch && statusMatch && dateMatch
  })

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setViewDetailsOpen(true)
  }

  const handleEditStatus = (order) => {
    setSelectedOrder(order)
    setEditStatusOpen(true)
  }

  const handleCancelOrder = (order) => {
    setSelectedOrder(order)
    setCancelOrderOpen(true)
  }

  const handleStatusChange = (newStatus) => {
    // In a real app, you would update the order status in your database
    console.log(`Changing order ${selectedOrder.id} status to ${newStatus}`)
    setEditStatusOpen(false)
  }

  const handleConfirmCancel = () => {
    // In a real app, you would update the order status to cancelled in your database
    console.log(`Cancelling order ${selectedOrder.id}`)
    setCancelOrderOpen(false)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setStatusFilter('all')
    setDateRange({ from: '', to: '' })
  }

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-amber-100 text-amber-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
          <p className="text-gray-600">View and manage customer orders</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700">
          Export Orders
        </Button>
      </div>

      {/* Filter Bar */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search orders..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Date Range */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRange.from && dateRange.to ? (
                    <span>
                      {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
                    </span>
                  ) : (
                    <span>Select date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4" align="start">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="from">From</Label>
                    <Input
                      id="from"
                      type="date"
                      value={dateRange.from}
                      onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="to">To</Label>
                    <Input
                      id="to"
                      type="date"
                      value={dateRange.to}
                      onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Clear Filters */}
            <Button variant="outline" onClick={clearFilters} className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            {filteredOrders.length} orders found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.length > 0 ? (
                  currentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium">{order.id}</td>
                      <td className="py-3 px-4 text-sm">{order.customer}</td>
                      <td className="py-3 px-4 text-sm">{formatDate(order.date)}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusBadgeClass(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">{formatCurrency(order.total)}</td>
                      <td className="py-3 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditStatus(order)}>
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleCancelOrder(order)}
                              className="text-red-600"
                              disabled={order.status.toLowerCase() === 'delivered' || order.status.toLowerCase() === 'cancelled'}
                            >
                              Cancel Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-6 text-center text-gray-500">
                      No orders found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Page {currentPage} of {totalPages || 1}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* View Order Details Modal */}
      {selectedOrder && (
        <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
              <DialogDescription>
                Placed on {formatDate(selectedOrder.date)}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Customer Information</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-medium">{selectedOrder.customer}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.email}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.phone}</p>
                </div>

                <h3 className="text-sm font-medium text-gray-500 mt-4 mb-2">Shipping Address</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm">{selectedOrder.address}</p>
                </div>

                <h3 className="text-sm font-medium text-gray-500 mt-4 mb-2">Payment Information</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm">Method: {selectedOrder.paymentMethod}</p>
                  <p className="text-sm">Status: Paid</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Order Summary</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between font-medium">
                    <p>Total</p>
                    <p>{formatCurrency(selectedOrder.total)}</p>
                  </div>
                </div>

                <h3 className="text-sm font-medium text-gray-500 mt-4 mb-2">Order Status</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <Badge className={getStatusBadgeClass(selectedOrder.status)}>
                    {selectedOrder.status}
                  </Badge>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewDetailsOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                setViewDetailsOpen(false);
                handleEditStatus(selectedOrder);
              }}>
                Update Status
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Status Modal */}
      {selectedOrder && (
        <Dialog open={editStatusOpen} onOpenChange={setEditStatusOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Order Status</DialogTitle>
              <DialogDescription>
                Change the status for order {selectedOrder.id}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <RadioGroup defaultValue={selectedOrder.status.toLowerCase()}>
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="processing" id="processing" />
                  <Label htmlFor="processing">Processing</Label>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="shipped" id="shipped" />
                  <Label htmlFor="shipped">Shipped</Label>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="delivered" id="delivered" />
                  <Label htmlFor="delivered">Delivered</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cancelled" id="cancelled" />
                  <Label htmlFor="cancelled">Cancelled</Label>
                </div>
              </RadioGroup>

              <div className="mt-4">
                <Label htmlFor="status-notes">Notes (Optional)</Label>
                <Textarea
                  id="status-notes"
                  placeholder="Add notes about this status change"
                  className="mt-1"
                />
              </div>

              <div className="flex items-center mt-4">
                <Checkbox id="notify-customer" />
                <Label htmlFor="notify-customer" className="ml-2">
                  Notify customer about this update
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditStatusOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleStatusChange('shipped')}>
                Update Status
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Cancel Order Modal */}
      {selectedOrder && (
        <Dialog open={cancelOrderOpen} onOpenChange={setCancelOrderOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Order</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel order {selectedOrder.id}?
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-500 mb-4">
                This action cannot be undone. The customer will be notified about the cancellation.
              </p>
              <div className="mb-4">
                <Label htmlFor="cancel-reason">Reason for Cancellation</Label>
                <Select defaultValue="customer-request">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer-request">Customer Request</SelectItem>
                    <SelectItem value="out-of-stock">Items Out of Stock</SelectItem>
                    <SelectItem value="payment-issue">Payment Issue</SelectItem>
                    <SelectItem value="fraudulent">Fraudulent Order</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cancel-notes">Additional Notes</Label>
                <Textarea
                  id="cancel-notes"
                  placeholder="Add any additional information about this cancellation"
                  className="mt-1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCancelOrderOpen(false)}>
                Go Back
              </Button>
              <Button variant="destructive" onClick={handleConfirmCancel}>
                Confirm Cancellation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}