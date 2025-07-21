import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Upload,
  Package,
  DollarSign,
  AlertTriangle
} from "lucide-react";

// Mock data - will be replaced with Supabase data
const inventory = [
  {
    id: "1",
    title: "1969 Dodge Charger R/T",
    category: "Classics", 
    price: 24.99,
    quantity: 15,
    sku: "HW-DOD-69-001",
    status: "active",
    image: "/api/placeholder/100/100"
  },
  {
    id: "2",
    title: "Lamborghini Aventador",
    category: "Supercars",
    price: 34.99,
    quantity: 2,
    sku: "HW-LAM-AV-002", 
    status: "low_stock",
    image: "/api/placeholder/100/100"
  },
  {
    id: "3",
    title: "Custom '67 Mustang",
    category: "Limited Edition",
    price: 45.99,
    quantity: 0,
    sku: "HW-MUS-67-003",
    status: "out_of_stock",
    image: "/api/placeholder/100/100"
  },
  {
    id: "4",
    title: "Ferrari 488 GTB",
    category: "Supercars",
    price: 39.99,
    quantity: 12,
    sku: "HW-FER-488-004",
    status: "active",
    image: "/api/placeholder/100/100"
  }
];

export const AdminInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    sku: "",
    image: ""
  });

  const categories = ["all", "Classics", "Supercars", "Limited Edition", "Sports Cars", "Entertainment"];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string, quantity: number) => {
    if (quantity === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (quantity <= 5) {
      return <Badge variant="secondary" className="text-amber-600 bg-amber-50">Low Stock</Badge>;
    } else {
      return <Badge variant="default">In Stock</Badge>;
    }
  };

  const handleAddProduct = () => {
    console.log('Adding product:', newProduct);
    // Will integrate with Supabase
    setIsAddModalOpen(false);
    setNewProduct({
      title: "",
      description: "",
      category: "",
      price: "",
      quantity: "",
      sku: "",
      image: ""
    });
  };

  const handleDeleteProduct = (id: string) => {
    console.log('Deleting product:', id);
    // Will integrate with Supabase
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-racing font-bold text-foreground mb-2">
              Inventory Management
            </h1>
            <p className="text-muted-foreground">
              Manage your Hot Wheels stock and product catalog
            </p>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Product Title</Label>
                    <Input
                      id="title"
                      value={newProduct.title}
                      onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                      placeholder="e.g., 1969 Dodge Charger R/T"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                      placeholder="e.g., HW-DOD-69-001"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    placeholder="Detailed product description..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      placeholder="24.99"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
                      placeholder="15"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Product Image</Label>
                  <div className="flex gap-2">
                    <Input
                      id="image"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                      placeholder="Image URL or upload..."
                    />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleAddProduct} className="flex-1">
                    Add Product
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Search Products</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by name or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  Export CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold">{inventory.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">In Stock</p>
                  <p className="text-2xl font-bold">{inventory.filter(i => i.quantity > 5).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Low Stock</p>
                  <p className="text-2xl font-bold">{inventory.filter(i => i.quantity > 0 && i.quantity <= 5).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Out of Stock</p>
                  <p className="text-2xl font-bold">{inventory.filter(i => i.quantity === 0).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Product Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Product</th>
                    <th className="text-left p-4">Category</th>
                    <th className="text-left p-4">SKU</th>
                    <th className="text-left p-4">Price</th>
                    <th className="text-left p-4">Stock</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium">{item.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{item.category}</Badge>
                      </td>
                      <td className="p-4">
                        <code className="text-sm bg-muted px-2 py-1 rounded">{item.sku}</code>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">${item.price}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{item.quantity}</div>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(item.status, item.quantity)}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteProduct(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};