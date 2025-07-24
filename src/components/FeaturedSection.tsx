import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { carsApi, collectionsApi } from "@/lib/api";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const FeaturedSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Fetch featured cars and collections
  const { data: featuredCars = [] } = useQuery({
    queryKey: ['featured-cars'],
    queryFn: carsApi.getFeatured
  });

  const { data: featuredCollections = [] } = useQuery({
    queryKey: ['featured-collections'], 
    queryFn: collectionsApi.getFeatured
  });

  const handleViewDetails = (carId: string) => {
    navigate(`/cars/${carId}`);
  };

  const handleAddToCart = async (carId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add items to cart",
        variant: "destructive",
      });
      return;
    }

    try {
      await addToCart(carId);
      toast({
        title: "Added to Cart",
        description: "Item has been added to your cart",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
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
          {featuredCars.slice(0, 6).map((car, index) => (
            <Card 
              key={car.id} 
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-card border-border animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={car.image_url || "/api/placeholder/400/300"} 
                    alt={car.name}
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
                  {car.stock_quantity === 0 && (
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
                    {car.name}
                  </CardTitle>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                    <span className="text-sm text-muted-foreground">4.8</span>
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
                  disabled={car.stock_quantity === 0}
                  onClick={() => handleAddToCart(car.id)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Featured Collections Section */}
        {featuredCollections.length > 0 && (
          <>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                Featured Collections
              </Badge>
              <h3 className="text-3xl md:text-4xl font-racing font-bold text-foreground mb-6">
                Curated Collections
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {featuredCollections.slice(0, 4).map((collection) => (
                <Card key={collection.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <img 
                      src={collection.image_url || "/api/placeholder/400/250"} 
                      alt={collection.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-racing font-bold text-2xl mb-2">{collection.name}</h3>
                      <p className="text-gray-200 mb-3">{collection.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {collection.featured && (
                            <Badge variant="secondary">Featured</Badge>
                          )}
                        </div>
                        <Button variant="secondary" size="sm" className="gap-2" onClick={() => navigate('/collections')}>
                          Explore <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

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