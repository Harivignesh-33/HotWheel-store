import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminAddForm } from "@/components/AdminAddForm";
import { useAuth } from "@/contexts/AuthContext";
import { carsApi, collectionsApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Search,
  Filter,
  Users,
  Star
} from "lucide-react";

export const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch cars and collections data
  const { data: cars = [], isLoading: carsLoading } = useQuery({
    queryKey: ['cars'],
    queryFn: carsApi.getAll
  });

  const { data: collections = [], isLoading: collectionsLoading } = useQuery({
    queryKey: ['collections'],
    queryFn: collectionsApi.getAll
  });

  // Redirect if not admin
  if (!isAdmin && !carsLoading && !collectionsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
            <p className="text-muted-foreground">You need admin privileges to access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats from real data
  const totalProducts = cars.length + collections.length;
  const lowStockItems = cars.filter(car => car.stock_quantity <= 5).length;
  const totalRevenue = cars.reduce((sum, car) => sum + (car.price * (car.stock_quantity || 0)), 0);
  const featuredItems = cars.filter(car => car.featured).length + collections.filter(col => col.featured).length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-racing font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your Hot Wheels inventory and orders
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
            <Button variant="outline" onClick={() => window.open('/cars', '_blank')}>
              <Eye className="h-4 w-4 mr-2" />
              View Store
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Total inventory value
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Featured Items</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{featuredItems}</div>
              <p className="text-xs text-muted-foreground">
                Featured products & collections
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                Cars and collections
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Alert</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{lowStockItems}</div>
              <p className="text-xs text-muted-foreground">
                Items need restocking
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Cars */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Cars
                <Button variant="outline" size="sm" onClick={() => window.open('/admin/inventory', '_blank')}>
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cars.slice(0, 4).map((car) => (
                  <div key={car.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <img 
                        src={car.image_url || "/api/placeholder/50/50"} 
                        alt={car.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <div className="font-medium">{car.name}</div>
                        <div className="text-sm text-muted-foreground">Premium Collection</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹{car.price}</div>
                      <Badge 
                        variant={car.stock_quantity > 5 ? 'default' : car.stock_quantity > 0 ? 'secondary' : 'destructive'}
                        className="text-xs"
                      >
                        {car.stock_quantity > 5 ? 'In Stock' : car.stock_quantity > 0 ? 'Low Stock' : 'Out of Stock'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Low Stock Items
                <Button variant="outline" size="sm" onClick={() => window.open('/admin/inventory', '_blank')}>
                  Manage Inventory
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cars.filter(car => car.stock_quantity <= 5 && car.stock_quantity > 0).slice(0, 4).map((car) => (
                  <div key={car.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{car.name}</div>
                      <div className="text-sm text-amber-600 font-medium">
                        Only {car.stock_quantity} left
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹{car.price}</div>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm">
                          Restock
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {cars.filter(car => car.stock_quantity <= 5).length === 0 && (
                  <p className="text-muted-foreground text-center py-4">All items are well stocked!</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col" onClick={() => setShowAddForm(true)}>
                <Plus className="h-6 w-6 mb-2" />
                Add Product
              </Button>
              <Button variant="outline" className="h-20 flex-col" onClick={() => window.open('/admin/inventory', '_blank')}>
                <Package className="h-6 w-6 mb-2" />
                Manage Inventory
              </Button>
              <Button variant="outline" className="h-20 flex-col" onClick={() => window.open('/cars', '_blank')}>
                <ShoppingCart className="h-6 w-6 mb-2" />
                View Store
              </Button>
              <Button variant="outline" className="h-20 flex-col" onClick={() => window.open('/collections', '_blank')}>
                <TrendingUp className="h-6 w-6 mb-2" />
                Collections
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Add Product Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <AdminAddForm 
              isOpen={showAddForm}
              type="car"
              onClose={() => setShowAddForm(false)}
              onSuccess={() => {
                setShowAddForm(false);
                toast({
                  title: "Success",
                  description: "Product added successfully",
                });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};