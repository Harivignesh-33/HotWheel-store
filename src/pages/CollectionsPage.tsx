import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  carCount: number;
  featured: boolean;
  category: string;
}

const collections: Collection[] = [
  {
    id: "1",
    name: "American Muscle",
    description: "Classic American muscle cars from the golden era of automotive performance.",
    image: "/api/placeholder/400/300",
    carCount: 24,
    featured: true,
    category: "Classics"
  },
  {
    id: "2",
    name: "Modern Supercars",
    description: "Today's fastest and most exotic supercars from around the world.",
    image: "/api/placeholder/400/300",
    carCount: 18,
    featured: true,
    category: "Supercars"
  },
  {
    id: "3",
    name: "Japanese Tuners",
    description: "Import performance cars with custom modifications and street racing style.",
    image: "/api/placeholder/400/300",
    carCount: 15,
    featured: false,
    category: "Tuners"
  },
  {
    id: "4",
    name: "European Exotics",
    description: "Luxury and performance vehicles from European manufacturers.",
    image: "/api/placeholder/400/300",
    carCount: 21,
    featured: true,
    category: "Luxury"
  },
  {
    id: "5",
    name: "Movie & TV Cars",
    description: "Iconic vehicles from blockbuster movies and television shows.",
    image: "/api/placeholder/400/300",
    carCount: 12,
    featured: false,
    category: "Entertainment"
  },
  {
    id: "6",
    name: "Racing Legends",
    description: "Championship-winning race cars and legendary racing liveries.",
    image: "/api/placeholder/400/300",
    carCount: 16,
    featured: false,
    category: "Racing"
  }
];

export const CollectionsPage = () => {
  const navigate = useNavigate();

  const handleViewCollection = (collectionId: string) => {
    navigate(`/collections/${collectionId}`);
  };

  const featuredCollections = collections.filter(c => c.featured);
  const otherCollections = collections.filter(c => !c.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Curated Collections
          </Badge>
          <h1 className="text-4xl md:text-5xl font-racing font-bold text-foreground mb-6">
            Explore Collections
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover carefully curated collections of Hot Wheels organized by theme, 
            era, and automotive culture. Find your passion and build your perfect collection.
          </p>
        </div>

        {/* Featured Collections */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Featured Collections</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCollections.map((collection, index) => (
              <Card 
                key={collection.id} 
                className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() => handleViewCollection(collection.id)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={collection.image} 
                      alt={collection.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge variant="secondary" className="mb-2">
                        {collection.category}
                      </Badge>
                      <div className="flex items-center text-white">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-2" />
                        <span className="text-sm">Featured Collection</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <CardTitle className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {collection.name}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {collection.carCount} cars
                    </div>
                    <Button variant="ghost" size="sm" className="group-hover:text-primary">
                      Explore
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Collections */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-8">All Collections</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCollections.map((collection, index) => (
              <Card 
                key={collection.id} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => handleViewCollection(collection.id)}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg h-32">
                    <img 
                      src={collection.image} 
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="outline" className="bg-background/90">
                        {collection.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <CardTitle className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {collection.name}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {collection.carCount} cars
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-primary rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-primary-foreground mb-4">
            Can't Find What You're Looking For?
          </h3>
          <p className="text-primary-foreground/90 mb-6 max-w-md mx-auto">
            Browse our complete catalog or reach out to our collectors' community for rare finds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" onClick={() => navigate('/cars')}>
              Browse All Cars
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
