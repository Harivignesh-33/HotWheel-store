import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Users, 
  Shield, 
  Truck, 
  Star, 
  Clock, 
  Target, 
  Award,
  Heart,
  Globe
} from "lucide-react";
import aboutHero from "@/assets/about-hero.jpg";

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Since 1999
          </Badge>
          <h1 className="text-4xl md:text-5xl font-racing font-bold text-foreground mb-6">
            About HotWheels Pro
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            For over two decades, we've been the trusted destination for Hot Wheels collectors worldwide. 
            From rare treasures to the latest releases, we're passionate about bringing you the finest 
            die-cast automotive collectibles.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 1999 by automotive enthusiasts and collectors, HotWheels Pro began as a small 
                hobby shop dedicated to serving the growing community of die-cast car collectors. What 
                started as a passion project has evolved into one of the world's premier destinations 
                for Hot Wheels and die-cast collectibles.
              </p>
              <p>
                Our founders, lifelong car enthusiasts, recognized the need for a specialized retailer 
                that truly understood the collector's mindset. We don't just sell cars - we curate 
                experiences, preserve automotive history, and connect collectors with their dream finds.
              </p>
              <p>
                Today, we're proud to serve over 50,000 collectors across 40 countries, offering 
                everything from the latest mainline releases to ultra-rare prototypes and convention 
                exclusives. Every car in our collection is authenticated and carefully packaged to 
                ensure it reaches you in perfect condition.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src={aboutHero}
              alt="Hot Wheels Collection"
              className="rounded-lg shadow-elegant w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">25+</div>
            <div className="text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">50K+</div>
            <div className="text-muted-foreground">Happy Collectors</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Unique Models</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">40</div>
            <div className="text-muted-foreground">Countries Served</div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="mb-3">Authenticity</CardTitle>
              <p className="text-muted-foreground text-sm">
                Every car is verified authentic. We work directly with manufacturers and authorized 
                distributors to ensure you receive genuine products.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="mb-3">Passion</CardTitle>
              <p className="text-muted-foreground text-sm">
                We're collectors too. Our team understands the thrill of the hunt and the joy 
                of finding that perfect addition to your collection.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="mb-3">Quality</CardTitle>
              <p className="text-muted-foreground text-sm">
                From packaging to shipping, we maintain the highest standards to ensure your 
                collectibles arrive in pristine condition.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="mb-3">Community</CardTitle>
              <p className="text-muted-foreground text-sm">
                We're more than a store - we're a community hub where collectors share their 
                passion, knowledge, and latest finds.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="mb-3">Global Reach</CardTitle>
              <p className="text-muted-foreground text-sm">
                Worldwide shipping with careful packaging ensures collectors everywhere can 
                access the cars they want.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="mb-3">Trust</CardTitle>
              <p className="text-muted-foreground text-sm">
                Built over 25 years of honest business practices, fair pricing, and 
                exceptional customer service.
              </p>
            </Card>
          </div>
        </div>

        {/* Services */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Truck className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Worldwide Shipping</h3>
                <p className="text-muted-foreground text-sm">
                  Fast, secure shipping to over 40 countries with tracking and insurance included. 
                  Free shipping on orders over $25.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Award className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Expert Curation</h3>
                <p className="text-muted-foreground text-sm">
                  Our team of collectors handpicks each item, ensuring you get the best quality 
                  and most sought-after pieces.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Trophy className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Exclusive Access</h3>
                <p className="text-muted-foreground text-sm">
                  Be first to access limited editions, convention exclusives, and rare finds 
                  through our exclusive partnerships.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Target className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Collector Support</h3>
                <p className="text-muted-foreground text-sm">
                  Get expert advice on building collections, market values, and investment 
                  potential from our knowledgeable team.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-primary rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-primary-foreground mb-4">
            Join Our Community
          </h3>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Whether you're a seasoned collector or just starting your journey, we're here to help 
            you build the collection of your dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Start Shopping
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