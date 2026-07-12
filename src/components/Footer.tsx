import { Car, Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t mt-16">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-racing font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
                HotWheels Pro
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              India's trusted destination for premium Hot Wheels die-cast cars,
              rare collectibles and limited editions.
            </p>
            <div className="flex gap-2">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <Button key={i} variant="outline" size="icon" className="h-9 w-9">
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/cars" className="hover:text-primary transition-colors">All Cars</Link></li>
              <li><Link to="/collections" className="hover:text-primary transition-colors">Collections</Link></li>
              <li><Link to="/cars" className="hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link to="/cars" className="hover:text-primary transition-colors">Best Sellers</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/orders" className="hover:text-primary transition-colors">Track Order</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Get exclusive drops & collector deals.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <Input type="email" placeholder="Your email" className="h-9" />
              <Button size="sm" type="submit">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} HotWheels Pro. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
