import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Eye } from "lucide-react";
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
  featured: boolean;
}

// Placeholder data - will be replaced with real data from Supabase
const featuredCars: Car[] = [
  {
    id: "1",
    title: "1969 Dodge Charger R/T",
    description: "Classic muscle car with authentic details and premium die-cast construction.",
    price: 24.99,
    image: "/api/placeholder/400/300",
    category: "Classics",
    rating: 4.8,
    inStock: true,
    featured: true
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
    featured: true
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
    featured: true
  }
];

export const FeaturedSection = () => {
  const navigate = useNavigate();

  const handleViewDetails = (carId: string) => {
    navigate(`/cars/${carId}`);
  };

  const handleAddToCart = (carId: string) => {
    // Will integrate with cart functionality
    console.log('Adding to cart:', carId);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Featured Collection
          </Badge>
          <h2 className="text-4xl md:text-5xl font-racing font-bold text-foreground mb-6">
            Premium Picks
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hand-selected die-cast masterpieces from our exclusive collection. 
            Each model represents the pinnacle of craftsmanship and attention to detail.
          </p>
        </div>

        {/* Featured Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCars.map((car, index) => (
            <Card 
              key={car.id} 
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-card border-border animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={car.image} 
                    alt={car.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant={car.category === "Limited Edition" ? "destructive" : "secondary"}
                      className="shadow-sm"
                    >
                      {car.category}
                    </Badge>
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

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {car.title}
                  </CardTitle>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                    <span className="text-sm text-muted-foreground">{car.rating}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {car.description}
                </p>
                <div className="text-2xl font-bold text-primary">
                  ${car.price.toFixed(2)}
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleViewDetails(car.id)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  disabled={!car.inStock}
                  onClick={() => handleAddToCart(car.id)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={() => navigate('/cars')}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            View All Cars
            <Eye className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};