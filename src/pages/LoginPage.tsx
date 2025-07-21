import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { AuthModal } from "@/components/AuthModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, User, ArrowRight, Star, Clock, CheckCircle } from "lucide-react";

export const LoginPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-racing font-bold text-foreground mb-6">
              Join HotWheels Pro
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sign in to access exclusive collections, track your orders, and connect with 
              fellow collectors worldwide.
            </p>
          </div>

          {/* Login Options */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Customer Login */}
            <Card className="relative overflow-hidden hover:shadow-elegant transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-3xl flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl flex items-center gap-3">
                  Customer Portal
                  <Badge variant="secondary">Most Popular</Badge>
                </CardTitle>
                <p className="text-muted-foreground">
                  Browse our collection, make purchases, and manage your orders
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Access to full catalog</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Order tracking & history</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Wishlist & favorites</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Collector community access</span>
                  </div>
                </div>
                <div className="pt-4 space-y-3">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => handleOpenAuth('login')}
                  >
                    Sign In as Customer
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleOpenAuth('register')}
                  >
                    Create Customer Account
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Admin Login */}
            <Card className="relative overflow-hidden hover:shadow-elegant transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10 rounded-bl-3xl flex items-center justify-center">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl flex items-center gap-3">
                  Admin Portal
                  <Badge variant="outline">Restricted</Badge>
                </CardTitle>
                <p className="text-muted-foreground">
                  Manage inventory, orders, and system administration
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Inventory management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Order administration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Analytics & reporting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">User management</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="lg"
                    onClick={() => handleOpenAuth('login')}
                  >
                    Admin Sign In
                    <Shield className="h-4 w-4 ml-2" />
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Admin accounts require approval
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-8">Why Create an Account?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Exclusive Access</h3>
                <p className="text-sm text-muted-foreground">
                  Get early access to limited editions and member-only releases
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Faster Checkout</h3>
                <p className="text-sm text-muted-foreground">
                  Save addresses and payment methods for quick purchases
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Order Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Track shipments and view complete order history
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </div>
  );
};