import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ShoppingCart, Eye, Filter, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Car {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
  quantity: number;
}

// Mock data - will be replaced with Supabase data
const allCars: Car[] = [
  {
    id: "1",
    title: "1969 Dodge Charger R/T",
    description: "Classic muscle car with authentic details and premium die-cast construction.",
    price: 24.99,
    image: "/api/placeholder/400/300",
    category: "Classics",
    rating: 4.8,
    inStock: true,
    quantity: 15
  },
  {
    id: "2", 
    title: "Lamborghini Aventador",
    description: "Supercar perfection in 1:64 scale with opening doors and detailed interior.",
    price: 34.99,
    image: "/api/placeholder/400/300",
    category: "Supercars",
    rating: 4.9,
    inStock: true,
    quantity: 8
  },
  {
    id: "3",
    title: "Custom '67 Mustang",
    description: "Limited edition custom paint job with racing stripes and performance details.",
    price: 45.99,
    image: "/api/placeholder/400/300", 
    category: "Limited Edition",
    rating: 5.0,
    inStock: false,
    quantity: 0
  },
  {
    id: "4",
    title: "Ferrari 488 GTB",
    description: "Italian engineering masterpiece with detailed brake calipers and interior.",
    price: 39.99,
    image: "/api/placeholder/400/300",
    category: "Supercars", 
    rating: 4.7,
    inStock: true,
    quantity: 12
  },
  {
    id: "5",
    title: "Porsche 911 Turbo",
    description: "Iconic sports car with realistic proportions and fine details.",
    price: 32.99,
    image: "/api/placeholder/400/300",
    category: "Sports Cars",
    rating: 4.6,
    inStock: true,
    quantity: 20
  },
  {
    id: "6",
    title: "Batmobile 1989",
    description: "Official DC Comics licensed Batmobile from Tim Burton's Batman.",
    price: 55.99,
    image: "/api/placeholder/400/300",
    category: "Entertainment",
    rating: 4.9,
    inStock: true,
    quantity: 5
  }
];

export const CarsPage = () => {
  const navigate = useNavigate();
  const [filteredCars, setFilteredCars] = useState(allCars);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const categories = ["all", ...Array.from(new Set(allCars.map(car => car.category)))];

  useEffect(() => {
    let filtered = allCars.filter(car => 
      car.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" || car.category === selectedCategory)
    );

    // Sort cars
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return a.title.localeCompare(b.title);
      }
    });

    setFilteredCars(filtered);
  }, [searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (carId: string) => {
    console.log('Adding to cart:', carId);
    // Will integrate with cart functionality
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation cartCount={0} />
      
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
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
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
            Showing {filteredCars.length} of {allCars.length} cars
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <Card key={car.id} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={car.image} 
                    alt={car.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">{car.category}</Badge>
                  </div>
                  {!car.inStock && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <Badge variant="outline" className="bg-background">
                        Out of Stock
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg font-semibold line-clamp-1">
                    {car.title}
                  </CardTitle>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                    <span className="text-sm">{car.rating}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {car.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-primary">
                    ${car.price.toFixed(2)}
                  </div>
                  {car.inStock && (
                    <div className="text-xs text-muted-foreground">
                      {car.quantity} in stock
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
                  disabled={!car.inStock}
                  onClick={() => handleAddToCart(car.id)}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredCars.length === 0 && (
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