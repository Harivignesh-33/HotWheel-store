import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { getCarImageUrl } from "@/lib/images";
import { Package, ShoppingBag } from "lucide-react";

interface OrderItem {
  id: string;
  car_name: string;
  car_image: string | null;
  price: number;
  quantity: number;
}
interface Order {
  id: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  shipping_name: string;
  shipping_city: string;
  shipping_state: string;
  order_items: OrderItem[];
}

const statusColor: Record<string, string> = {
  pending: "bg-yellow-500",
  paid: "bg-blue-500",
  processing: "bg-purple-500",
  shipped: "bg-indigo-500",
  delivered: "bg-green-600",
  cancelled: "bg-red-500",
};

export const OrdersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data, error } = await supabase
        .from("orders" as any)
        .select("*, order_items(*)")
        .order("created_at", { ascending: false });
      if (!error) setOrders((data as any) || []);
      setLoading(false);
    })();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Sign in to view orders</h1>
          <Button onClick={() => navigate("/login")}>Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-racing font-bold mb-6">My Orders</h1>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : orders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-16">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-4">Start shopping to see your orders here.</p>
              <Button onClick={() => navigate("/cars")}>Browse Cars</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <Card key={o.id}>
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Order #{o.id.slice(0, 8).toUpperCase()}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(o.created_at).toLocaleString()} · {o.shipping_city}, {o.shipping_state}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${statusColor[o.status] || "bg-gray-500"} text-white`}>
                        {o.status.toUpperCase()}
                      </Badge>
                      <span className="text-lg font-bold text-primary">₹{Number(o.total_amount).toFixed(0)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-4" />
                  <div className="space-y-3">
                    {o.order_items?.map((it) => (
                      <div key={it.id} className="flex gap-3 text-sm">
                        <img src={getCarImageUrl(it.car_image)} alt={it.car_name} className="w-14 h-14 rounded object-cover" />
                        <div className="flex-1">
                          <div className="font-medium">{it.car_name}</div>
                          <div className="text-muted-foreground">Qty: {it.quantity} × ₹{Number(it.price).toFixed(0)}</div>
                        </div>
                        <div className="font-semibold">₹{(Number(it.price) * it.quantity).toFixed(0)}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
