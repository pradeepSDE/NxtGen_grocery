import React, { useState } from 'react'
import { Edit, Search, Trash2, UserPlus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Switch } from "@/components/ui/switch"

// Sample user data
const initialUsers = [
  {
    id: 'user-001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2023-05-15T10:30:00',
    createdAt: '2022-01-10T08:15:00'
  },
  {
    id: 'user-002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'User',
    status: 'Active',
    lastLogin: '2023-05-14T14:45:00',
    createdAt: '2022-02-15T11:20:00'
  },
  {
    id: 'user-003',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'User',
    status: 'Inactive',
    lastLogin: '2023-04-20T09:15:00',
    createdAt: '2022-03-05T15:30:00'
  },
  {
    id: 'user-004',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2023-05-15T08:20:00',
    createdAt: '2022-01-25T10:45:00'
  },
  {
    id: 'user-005',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'User',
    status: 'Active',
    lastLogin: '2023-05-12T16:30:00',
    createdAt: '2022-04-18T09:10:00'
  },
  {
    id: 'user-006',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'User',
    status: 'Inactive',
    lastLogin: '2023-03-25T11:45:00',
    createdAt: '2022-02-28T14:20:00'
  },
  {
    id: 'user-007',
    name: 'David Miller',
    email: 'david.miller@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'User',
    status: 'Active',
    lastLogin: '2023-05-14T10:15:00',
    createdAt: '2022-05-10T08:30:00'
  }
]

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers)
  const [searchQuery, setSearchQuery] = useState('')
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'User',
    status: 'Active',
    avatar: '/placeholder.svg?height=40&width=40'
  })

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleEditUser = () => {
    if (!currentUser.name || !currentUser.email) {
      alert('Name and email are required')
      return
    }

    const updatedUsers = users.map(user => 
      user.id === currentUser.id ? currentUser : user
    )

    setUsers(updatedUsers)
    setIsEditDialogOpen(false)
  }

  const handleDeleteUser = () => {
    const updatedUsers = users.filter(user => user.id !== currentUser.id)
    setUsers(updatedUsers)
    setIsDeleteDialogOpen(false)
  }

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      alert('Name and email are required')
      return
    }

    const userToAdd = {
      ...newUser,
      id: `user-${Math.floor(Math.random() * 1000)}`,
      lastLogin: null,
      createdAt: new Date().toISOString()
    }

    setUsers([...users, userToAdd])
    setNewUser({
      name: '',
      email: '',
      role: 'User',
      status: 'Active',
      avatar: '/placeholder.svg?height=40&width=40'
    })
    setIsAddUserDialogOpen(false)
  }

  const openEditDialog = (user) => {
    setCurrentUser({...user})
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (user) => {
    setCurrentUser(user)
    setIsDeleteDialogOpen(true)
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  const getStatusBadge = (status) => {
    return status === 'Active' ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
    ) : (
      <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
    )
  }

  const getRoleBadge = (role) => {
    return role === 'Admin' ? (
      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Admin</Badge>
    ) : (
      <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">User</Badge>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        <Button 
          className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700"
          onClick={() => setIsAddUserDialogOpen(true)}
        >
          <UserPlus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search users by name or email..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{user.name}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{user.email}</td>
                      <td className="py-3 px-4">{getRoleBadge(user.role)}</td>
                      <td className="py-3 px-4">{getStatusBadge(user.status)}</td>
                      <td className="py-3 px-4 text-sm">{formatDate(user.createdAt)}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openEditDialog(user)}
                          >
                            <Edit className="h-4 w-4 text-blue-600" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openDeleteDialog(user)}
                            disabled={user.role === 'Admin' && users.filter(u => u.role === 'Admin').length === 1}
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
                      No users found matching your search
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account. All fields are required.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-name" className="text-right">
                Name
              </Label>
              <Input
                id="new-name"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                className="col-span-3"
                placeholder="Full name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-email" className="text-right">
                Email
              </Label>
              <Input
                id="new-email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                className="col-span-3"
                placeholder="Email address"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-role" className="text-right">
                Role
              </Label>
              <Select
                value={newUser.role}
                onValueChange={(value) => setNewUser({...newUser, role: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-status" className="text-right">
                Status
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="new-status"
                  checked={newUser.status === 'Active'}
                  onCheckedChange={(checked) => 
                    setNewUser({...newUser, status: checked ? 'Active' : 'Inactive'})
                  }
                />
                <Label htmlFor="new-status">
                  {newUser.status === 'Active' ? 'Active' : 'Inactive'}
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser} className="bg-green-600 hover:bg-green-700">
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      {currentUser && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update user account details.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Role
                </Label>
                <Select
                  value={currentUser.role}
                  onValueChange={(value) => setCurrentUser({...currentUser, role: value})}
                  disabled={
                    currentUser.role === 'Admin' && 
                    users.filter(user => user.role === 'Admin').length === 1
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="edit-status"
                    checked={currentUser.status === 'Active'}
                    onCheckedChange={(checked) => 
                      setCurrentUser({...currentUser, status: checked ? 'Active' : 'Inactive'})
                    }
                  />
                  <Label htmlFor="edit-status">
                    {currentUser.status === 'Active' ? 'Active' : 'Inactive'}
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditUser} className="bg-green-600 hover:bg-green-700">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete User Dialog */}
      {currentUser && (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the user account for "{currentUser.name}".
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}