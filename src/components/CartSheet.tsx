import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, Trash2, CreditCard } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";
import { getCarImageUrl } from "@/lib/images";

export const CartSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, loading, updateQuantity, removeFromCart, getTotalAmount, getTotalItems } = useCart();
  const { user } = useAuth();

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    
    // TODO: Implement Stripe checkout
    console.log('Proceeding to checkout with items:', cartItems);
  };

  if (!user) {
    return (
      <Button variant="outline" size="sm" disabled>
        <ShoppingCart className="h-4 w-4 mr-2" />
        Cart
      </Button>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart
          {getTotalItems() > 0 && (
            <Badge 
              variant="secondary" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-6">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 bg-card rounded-lg p-4">
                    <img
                      src={getCarImageUrl(item.car.image_url)}
                      alt={item.car.name}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{item.car.name}</h4>
                      <p className="text-primary font-semibold">₹{item.car.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.car_id, item.quantity - 1)}
                        disabled={loading}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.car_id, item.quantity + 1)}
                        disabled={loading || item.quantity >= item.car.stock_quantity}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(item.car_id)}
                        disabled={loading}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <div className="border-t pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-bold text-primary">
                  ₹{getTotalAmount().toFixed(2)}
                </span>
              </div>
              <Separator />
              <Button
                className="w-full"
                size="lg"
                onClick={handleCheckout}
                disabled={loading || cartItems.length === 0}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};