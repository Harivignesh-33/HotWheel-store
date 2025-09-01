import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ShoppingCart, Eye, Filter, Search, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { carsApi } from "@/lib/api";
import { getCarImageUrl } from "@/lib/images";
// Temporary types until Supabase types are regenerated

type Car = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  featured: boolean;
  collection_id: string;
  created_at: string;
  updated_at: string;
};

export const CarsPage = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const { addToCart } = useCart();

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      setLoading(true);
      const data = await carsApi.getAll();
      setCars(data);
    } catch (error) {
      console.error('Error loading cars:', error);
      // Fallback to mock data for demo purposes
      const { mockCars } = await import('@/lib/mockData');
      setCars(mockCars as any);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["all", "sports", "luxury", "racing", "classic"];

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all"; // Simplified for now
    return matchesSearch && matchesCategory;
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return b.featured ? 1 : -1;
    }
  });

  const handleAddToCart = async (car: Car) => {
    await addToCart(car.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <Loader className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-racing font-bold text-foreground mb-4">
            Browse Collection
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover our complete collection of premium Hot Wheels die-cast cars
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
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

            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {sortedCars.length} of {cars.length} cars
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedCars.map((car) => (
            <Card key={car.id} className="group hover:shadow-elegant hover:shadow-accent transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] bg-gradient-card border-2 hover:border-primary/20">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={getCarImageUrl(car.image_url)} 
                    alt={car.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700 group-hover:brightness-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Premium</Badge>
                  </div>
                  {car.stock_quantity <= 0 && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <Badge variant="outline" className="bg-background">
                        Out of Stock
                      </Badge>
                    </div>
                  )}
                  {car.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-primary text-primary-foreground shadow-glow animate-pulse">✨ Featured</Badge>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg font-semibold line-clamp-1">
                    {car.name}
                  </CardTitle>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                    <span className="text-sm">4.5</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {car.description || 'High-quality Hot Wheels die-cast car'}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    ${car.price.toFixed(2)}
                  </div>
                  {car.stock_quantity > 0 && (
                    <div className="text-xs text-muted-foreground">
                      {car.stock_quantity} in stock
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => navigate(`/cars/${car.id}`)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  disabled={car.stock_quantity <= 0}
                  onClick={() => handleAddToCart(car)}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {sortedCars.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">No cars found matching your criteria</p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};