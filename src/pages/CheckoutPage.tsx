import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { getCarImageUrl } from "@/lib/images";
import { CreditCard, Loader2, ShieldCheck } from "lucide-react";

export const CheckoutPage = () => {
  const { user } = useAuth();
  const { cartItems, getTotalAmount, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  });

  const subtotal = getTotalAmount();
  const shipping = subtotal >= 2000 ? 0 : 99;
  const total = subtotal + shipping;

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to checkout</h1>
          <Button onClick={() => navigate("/login")}>Sign In</Button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && !processing) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => navigate("/cars")}>Browse Cars</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!form.name || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
      toast({ title: "Missing details", description: "Please fill all shipping fields.", variant: "destructive" });
      return;
    }

    setProcessing(true);
    try {
      // Create order
      const { data: order, error: orderErr } = await supabase
        .from("orders" as any)
        .insert({
          user_id: user.id,
          total_amount: total,
          status: "paid",
          payment_status: "paid",
          payment_method: "mock",
          payment_ref: `MOCK_${Date.now()}`,
          shipping_name: form.name,
          shipping_phone: form.phone,
          shipping_address: form.address,
          shipping_city: form.city,
          shipping_state: form.state,
          shipping_pincode: form.pincode,
          notes: form.notes || null,
        })
        .select()
        .single();

      if (orderErr) throw orderErr;
      const orderId = (order as any).id;

      // Insert order items
      const items = cartItems.map((it) => ({
        order_id: orderId,
        car_id: it.car_id,
        car_name: it.car.name,
        car_image: it.car.image_url,
        price: it.car.price,
        quantity: it.quantity,
      }));

      const { error: itemsErr } = await supabase.from("order_items" as any).insert(items);
      if (itemsErr) throw itemsErr;

      // Simulate payment gateway delay
      await new Promise((r) => setTimeout(r, 1200));

      await clearCart();
      toast({ title: "Payment successful! 🎉", description: "Your order has been placed." });
      navigate(`/orders`);
    } catch (err: any) {
      console.error(err);
      toast({ title: "Checkout failed", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-racing font-bold mb-6">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
          {/* Shipping details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Textarea id="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} required />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input id="pincode" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Order notes (optional)</Label>
                  <Textarea id="notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 border-2 border-primary rounded-lg bg-primary/5">
                  <div className="flex items-center gap-2 font-semibold">
                    <CreditCard className="h-4 w-4" />
                    Demo Checkout (Test Mode)
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    No real payment will be charged. Your order will be marked as paid instantly for demo purposes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cartItems.map((it) => (
                    <div key={it.id} className="flex gap-3 text-sm">
                      <img src={getCarImageUrl(it.car.image_url)} alt={it.car.name} className="w-14 h-14 rounded object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{it.car.name}</div>
                        <div className="text-muted-foreground">Qty: {it.quantity}</div>
                      </div>
                      <div className="font-medium">₹{(it.car.price * it.quantity).toFixed(0)}</div>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(0)}</span></div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="text-green-600">FREE</span> : `₹${shipping}`}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span><span className="text-primary">₹{total.toFixed(0)}</span>
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={processing}>
                  {processing ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...</>
                  ) : (
                    <>Pay ₹{total.toFixed(0)}</>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
};
