import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, ShoppingCart, ArrowLeft, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";

// Mock data - will be replaced with Supabase data
const carDetails = {
  id: "1",
  title: "1969 Dodge Charger R/T",
  description: "This meticulously crafted 1:64 scale die-cast replica captures every detail of the legendary 1969 Dodge Charger R/T. From the iconic split grille to the distinctive tail lights, this model represents American muscle car perfection. Features opening hood, detailed engine bay, and authentic interior styling.",
  price: 24.99,
  images: [
    "/api/placeholder/600/400",
    "/api/placeholder/600/400", 
    "/api/placeholder/600/400",
    "/api/placeholder/600/400"
  ],
  category: "Classics",
  rating: 4.8,
  reviewCount: 127,
  inStock: true,
  quantity: 15,
  sku: "HW-DOD-69-001",
  manufacturer: "Hot Wheels",
  scale: "1:64",
  material: "Die-cast metal with plastic parts",
  year: "2024",
  series: "Car Culture",
  features: [
    "Opening hood with detailed engine",
    "Real Riders wheels", 
    "Premium card packaging",
    "Collector number #001",
    "Authentic livery and markings"
  ],
  specifications: {
    "Length": "3 inches",
    "Width": "1.2 inches", 
    "Height": "1 inch",
    "Weight": "1.5 oz",
    "Age Range": "3+ years"
  }
};

export const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log('Adding to cart:', { id, quantity });
    // Will integrate with cart functionality
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation cartCount={0} />
      
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
          <span className="text-muted-foreground">{carDetails.category}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{carDetails.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
              <img
                src={carDetails.images[selectedImage]}
                alt={carDetails.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {carDetails.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-border'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${carDetails.title} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">{carDetails.category}</Badge>
              <h1 className="text-3xl font-racing font-bold text-foreground mb-2">
                {carDetails.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(carDetails.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {carDetails.rating} ({carDetails.reviewCount} reviews)
                  </span>
                </div>
              </div>
              <div className="text-3xl font-bold text-primary mb-4">
                ${carDetails.price.toFixed(2)}
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-muted-foreground leading-relaxed">
                {carDetails.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {carDetails.inStock ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">In Stock</span>
                  <span className="text-muted-foreground">({carDetails.quantity} available)</span>
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
                  onClick={() => setQuantity(Math.min(carDetails.quantity, quantity + 1))}
                  className="px-3 py-2 hover:bg-muted"
                >
                  +
                </button>
              </div>
              <Button 
                className="flex-1" 
                size="lg"
                disabled={!carDetails.inStock}
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
              {carDetails.features.map((feature, index) => (
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
              {Object.entries(carDetails.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-muted-foreground">{key}:</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">SKU:</span>
                <span className="font-mono text-sm">{carDetails.sku}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};