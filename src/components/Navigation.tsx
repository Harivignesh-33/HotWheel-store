import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Menu, User, X, LogOut, Settings } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { CartSheet } from "./CartSheet";
import { AuthModal } from "./AuthModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut, isAdmin } = useAuth();

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navLinks = [
    { href: "/cars", label: "Browse Cars" },
    { href: "/collections", label: "Collections" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Car className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-racing font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
              HotWheels Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-foreground hover:text-primary transition-all duration-200 font-medium ${
                  location.pathname === link.href ? 'text-primary border-b-2 border-primary' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <CartSheet />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {profile?.full_name || 'User'}
                    {isAdmin && <Badge variant="secondary" className="ml-2">Admin</Badge>}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isAdmin && (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        <Settings className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" onClick={() => handleOpenAuth('login')}>
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-foreground hover:text-primary transition-colors py-2 ${
                    location.pathname === link.href ? 'text-primary font-semibold' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <div className="flex flex-col space-y-3 pt-4 border-t">
              <CartSheet />
              
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{profile?.full_name || 'User'}</span>
                    {isAdmin && <Badge variant="secondary" className="text-xs">Admin</Badge>}
                  </div>
                  {isAdmin && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => {
                        navigate('/admin');
                        setIsMenuOpen(false);
                      }}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Admin Dashboard
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    handleOpenAuth('login');
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </nav>
  );
};