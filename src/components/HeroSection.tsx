import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Zap, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-racing.jpg";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Hot Wheels Racing Collection"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 animate-fade-in">
            <Star className="h-3 w-3 mr-1" />
            Premium Die-Cast Collectibles
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-racing font-black text-primary-foreground mb-6 animate-slide-up">
            Rev Up Your
            <span className="block text-accent">Collection</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-200">
            Discover the world's most coveted Hot Wheels. From rare classics to limited editions, 
            find your perfect die-cast masterpiece.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in delay-300">
            <div className="flex items-center bg-background/20 backdrop-blur-sm rounded-full px-4 py-2 text-primary-foreground">
              <Zap className="h-4 w-4 mr-2 text-accent" />
              Instant Delivery
            </div>
            <div className="flex items-center bg-background/20 backdrop-blur-sm rounded-full px-4 py-2 text-primary-foreground">
              <Shield className="h-4 w-4 mr-2 text-accent" />
              Authenticity Guaranteed
            </div>
            <div className="flex items-center bg-background/20 backdrop-blur-sm rounded-full px-4 py-2 text-primary-foreground">
              <Star className="h-4 w-4 mr-2 text-accent" />
              Collector Grade
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in delay-500">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/cars')}
            >
              Browse Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground text-black hover:bg-primary-foreground hover:text-primary backdrop-blur-sm"
              onClick={() => navigate('/about')}
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto animate-fade-in delay-700">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">500+</div>
              <div className="text-primary-foreground/80 text-sm">Unique Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">10K+</div>
              <div className="text-primary-foreground/80 text-sm">Happy Collectors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">25+</div>
              <div className="text-primary-foreground/80 text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full animate-float" />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-primary-glow/20 rounded-full animate-float delay-1000" />
      <div className="absolute top-1/2 right-20 w-12 h-12 bg-accent/30 rounded-full animate-float delay-500" />
    </section>
  );
};