import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Eye, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { carsApi, collectionsApi } from "@/lib/api";
import { getCarImageUrl, getCollectionImageUrl } from "@/lib/images";

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

type Collection = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export const FeaturedSection = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [featuredCollections, setFeaturedCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedData();
  }, []);

  const fetchFeaturedData = async () => {
    try {
      const [carsData, collectionsData] = await Promise.all([
        carsApi.getFeatured(),
        collectionsApi.getFeatured()
      ]);
      setFeaturedCars(carsData as Car[]);
      setFeaturedCollections(collectionsData as Collection[]);
    } catch (error) {
      console.error('Error fetching featured data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (carId: string) => {
    await addToCart(carId, 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Featured Collections */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-racing font-bold text-foreground mb-4 animate-fade-in">
            Featured Collections
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Discover our most popular Hot Wheels collections, each with unique designs and thrilling stories
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {featuredCollections.map((collection, index) => (
            <Card 
              key={collection.id} 
              className="group overflow-hidden hover:shadow-elegant transition-all duration-300 hover-scale cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => navigate('/collections')}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getCollectionImageUrl(collection.image_url)}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                    Collection
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors story-link">
                  {collection.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {collection.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Cars */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-racing font-bold text-foreground mb-4 animate-fade-in">
            Featured Hot Wheels
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            The hottest die-cast cars in our collection, featuring premium details and authentic designs
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car, index) => (
            <Card 
              key={car.id} 
              className="group overflow-hidden hover:shadow-elegant transition-all duration-300 hover-scale animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/cars/${car.id}`)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getCarImageUrl(car.image_url)}
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant="secondary"
                    className="shadow-sm bg-background/90 backdrop-blur-sm animate-pulse"
                  >
                    🔥 Featured
                  </Badge>
                </div>
                {car.stock_quantity === 0 && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <Badge variant="outline" className="bg-background">
                      Out of Stock
                    </Badge>
                  </div>
                )}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 bg-background/90 backdrop-blur-sm hover-scale"
                    onClick={() => navigate(`/cars/${car.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors story-link">
                  {car.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {car.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    ${car.price}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">4.8</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full transition-all duration-300 hover:shadow-glow hover-scale"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(car.id);
                  }}
                  disabled={car.stock_quantity === 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {car.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/cars')}
            className="hover-scale transition-all duration-300 hover:shadow-elegant animate-fade-in"
          >
            View All Hot Wheels Cars
          </Button>
        </div>
      </section>
    </div>
  );
};