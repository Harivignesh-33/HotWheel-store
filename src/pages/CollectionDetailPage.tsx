import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Star, Loader } from "lucide-react";
import { mockCollections, mockCars } from "@/lib/mockData";
import { getCarImageUrl, getCollectionImageUrl } from "@/lib/images";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

type Collection = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

type Car = {
  id: string;
  name: string;
  description: string;
  price: number;
  collection_id: string | null;
  image_url: string;
  stock_quantity: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export const CollectionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCollectionDetails(id);
    }
  }, [id]);

  const loadCollectionDetails = async (collectionId: string) => {
    try {
      setLoading(true);
      
      // Find collection in mock data
      const foundCollection = mockCollections.find(c => c.id === collectionId);
      setCollection(foundCollection || null);
      
      // For demo purposes, show a curated selection of cars based on collection theme
      const collectionCars = getCollectionCars(collectionId);
      setCars(collectionCars);
      
    } catch (error) {
      console.error('Error loading collection:', error);
      setCollection(null);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  const getCollectionCars = (collectionId: string): Car[] => {
    // Map collection themes to specific cars
    const collectionCarMapping: { [key: string]: string[] } = {
      '1': ['1', '2', '7'], // Speed Demons - fast cars
      '2': ['3', '8'], // Classic Muscle  
      '3': ['5', '7'], // Luxury Line
      '4': ['4'], // Off-Road Warriors
      '5': ['6'], // Drift Masters
      '6': ['7', '8'], // Future Tech
      '7': ['1', '2', '8'], // Racing Legends
      '8': ['2', '6'], // Street Racers
      '9': ['3', '5'] // Vintage Classics
    };

    const carIds = collectionCarMapping[collectionId] || [];
    return mockCars.filter(car => carIds.includes(car.id));
  };

  const handleAddToCart = (car: Car) => {
    addToCart(car.id);
    toast.success(`${car.name} added to cart!`);
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

  if (!collection) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Collection Not Found</h1>
          <Button onClick={() => navigate('/collections')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Collections
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/collections')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Collections
        </Button>

        {/* Collection Header */}
        <div className="relative mb-12 rounded-2xl overflow-hidden">
          <div className="h-64 md:h-80 relative">
            <img 
              src={getCollectionImageUrl(collection.image_url)} 
              alt={collection.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              {collection.featured && (
                <Badge variant="secondary" className="mb-4">
                  <Star className="h-3 w-3 mr-1" />
                  Featured Collection
                </Badge>
              )}
              <h1 className="text-4xl md:text-5xl font-racing font-bold text-white mb-4">
                {collection.name}
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                {collection.description}
              </p>
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Cars in this Collection</h2>
          <p className="text-muted-foreground mb-8">{cars.length} unique models</p>
          
          {cars.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car, index) => (
                <Card 
                  key={car.id} 
                  className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg h-48 cursor-pointer"
                         onClick={() => navigate(`/cars/${car.id}`)}>
                      <img 
                        src={getCarImageUrl(car.image_url)} 
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {car.featured && (
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <CardTitle 
                      className="text-xl font-bold text-foreground mb-2 cursor-pointer hover:text-primary transition-colors"
                      onClick={() => navigate(`/cars/${car.id}`)}
                    >
                      {car.name}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {car.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        ₹{car.price.toFixed(2)}
                      </span>
                      <Button 
                        onClick={() => handleAddToCart(car)}
                        className="hover:scale-105 transition-transform"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                    {car.stock_quantity <= 5 && (
                      <Badge variant="destructive" className="mt-2">
                        Only {car.stock_quantity} left
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                No cars available in this collection yet
              </p>
              <Button onClick={() => navigate('/cars')}>
                Browse All Cars
              </Button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-primary rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-primary-foreground mb-4">
            Explore More Collections
          </h3>
          <p className="text-primary-foreground/90 mb-6 max-w-md mx-auto">
            Discover other amazing collections curated by our experts.
          </p>
          <Button variant="secondary" size="lg" onClick={() => navigate('/collections')}>
            View All Collections
          </Button>
        </div>
      </div>
    </div>
  );
};