import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, ShoppingCart, ArrowLeft, Heart, Share2, Truck, Shield, RotateCcw, Loader } from "lucide-react";
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

export const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      loadCar(id);
    }
  }, [id]);

  const loadCar = async (carId: string) => {
    try {
      setLoading(true);
      
      // Try API first, fallback to mock data
      try {
        const data = await carsApi.getById(carId);
        setCar(data);
      } catch (apiError) {
        console.log('API failed, using mock data');
        // Import mock data
        const { mockCars } = await import('@/lib/mockData');
        const mockCar = mockCars.find(car => car.id === carId);
        setCar(mockCar || null);
      }
    } catch (error) {
      console.error('Error loading car:', error);
      setCar(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (car) {
      await addToCart(car.id, quantity);
    }
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

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Car Not Found</h1>
          <Button onClick={() => navigate('/cars')}>
            Back to Cars
          </Button>
        </div>
      </div>
    );
  }

  const carImage = getCarImageUrl(car.image_url);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <button 
            onClick={() => navigate('/cars')}
            className="flex items-center text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Cars
          </button>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">All Cars</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{car.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
              <img
                src={getCarImageUrl(car.image_url)}
                alt={car.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[getCarImageUrl(car.image_url), getCarImageUrl(car.image_url), getCarImageUrl(car.image_url), getCarImageUrl(car.image_url)].map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden border-2 border-border"
                >
                  <img
                    src={image}
                    alt={`${car.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">Premium</Badge>
              {car.featured && (
                <Badge className="mb-2 ml-2 bg-gradient-primary">Featured</Badge>
              )}
              <h1 className="text-3xl font-racing font-bold text-foreground mb-2">
                {car.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < 4 ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    4.5 (156 reviews)
                  </span>
                </div>
              </div>
              <div className="text-3xl font-bold text-primary mb-4">
                ₹{car.price.toFixed(2)}
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-muted-foreground leading-relaxed">
                {car.description || `This premium ${car.name} Hot Wheels die-cast car features authentic details, premium construction, and collector-quality finish. Perfect for enthusiasts and collectors alike.`}
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {car.stock_quantity > 0 ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">In Stock</span>
                  <span className="text-muted-foreground">({car.stock_quantity} available)</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-muted"
                >
                  -
                </button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(car.stock_quantity, quantity + 1))}
                  className="px-3 py-2 hover:bg-muted"
                  disabled={quantity >= car.stock_quantity}
                >
                  +
                </button>
              </div>
              <Button 
                className="flex-1" 
                size="lg"
                disabled={car.stock_quantity <= 0}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Add to Wishlist
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Shipping Info */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Free Shipping</p>
                    <p className="text-sm text-muted-foreground">On orders over $25</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Authenticity Guaranteed</p>
                    <p className="text-sm text-muted-foreground">100% genuine Hot Wheels</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">30-Day Returns</p>
                    <p className="text-sm text-muted-foreground">Easy returns and exchanges</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Features</h3>
            <ul className="space-y-2">
              {[
                "Die-cast metal construction",
                "Authentic paint and tampo details",
                "Real Riders wheels available",
                "Premium collector packaging",
                "Official Hot Wheels licensed product"
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Specifications</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Scale:</span>
                <span className="font-medium">1:64</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Material:</span>
                <span className="font-medium">Die-cast metal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Length:</span>
                <span className="font-medium">3 inches</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age Range:</span>
                <span className="font-medium">3+ years</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">SKU:</span>
                <span className="font-mono text-sm">HW-{car.id.slice(-8).toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};