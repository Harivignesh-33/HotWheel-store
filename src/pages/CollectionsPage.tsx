import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Star, ArrowRight, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { collectionsApi } from "@/lib/api";
import { getCollectionImageUrl } from "@/lib/images";
import { mockCollections } from "@/lib/mockData";
// Temporary types until Supabase types are regenerated

type Collection = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export const CollectionsPage = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      console.log('Loading collections...');
      setLoading(true);
      
      // Use mock data for reliable loading
      console.log('Collections loaded:', mockCollections.length);
      setCollections(mockCollections);
      
    } catch (error) {
      console.error('Error loading collections:', error);
      // Ensure we always have fallback data
      setCollections(mockCollections);
    } finally {
      setLoading(false);
      console.log('Collections loading completed');
    }
  };

  const handleViewCollection = (collectionId: string) => {
    navigate(`/collections/${collectionId}`);
  };

  const featuredCollections = collections.filter(c => c.featured);
  const otherCollections = collections.filter(c => !c.featured);

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
        {featuredCollections.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Featured Collections</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCollections.map((collection, index) => (
                <Card 
                  key={collection.id} 
                  className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fade-in"
                  onClick={() => handleViewCollection(collection.id)}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={getCollectionImageUrl(collection.image_url)} 
                        alt={collection.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
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
                      {collection.description || 'Explore this amazing collection of Hot Wheels cars'}
                    </p>
                    <div className="flex items-center justify-between">
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
        )}

        {/* Other Collections */}
        {otherCollections.length > 0 && (
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
                        src={getCollectionImageUrl(collection.image_url)} 
                        alt={collection.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </CardHeader>

                  <CardContent className="p-4">
                    <CardTitle className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {collection.name}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {collection.description || 'Explore this amazing collection of Hot Wheels cars'}
                    </p>
                    <div className="flex items-center justify-between">
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
        )}

        {collections.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">No collections available at the moment</p>
            <Button onClick={() => navigate('/cars')}>
              Browse All Cars
            </Button>
          </div>
        )}

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
            <Button variant="outline" size="lg" className="border-primary-foreground text-black hover:bg-primary-foreground hover:text-primary">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
