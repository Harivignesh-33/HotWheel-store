import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { getCarImageUrl } from "@/lib/images";
import { Package } from "lucide-react";

interface OrderItem {
  id: string;
  car_name: string;
  car_image: string | null;
  price: number;
  quantity: number;
}
interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  order_items: OrderItem[];
}

const STATUSES = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];
const statusColor: Record<string, string> = {
  pending: "bg-yellow-500", paid: "bg-blue-500", processing: "bg-purple-500",
  shipped: "bg-indigo-500", delivered: "bg-green-600", cancelled: "bg-red-500",
};

export const AdminOrdersPage = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders" as any)
      .select("*, order_items(*)")
      .order("created_at", { ascending: false });
    if (!error) setOrders((data as any) || []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchOrders();
  }, [isAdmin]);

  const updateStatus = async (orderId: string, status: string) => {
    const { error } = await supabase.from("orders" as any).update({ status }).eq("id", orderId);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Order updated", description: `Status changed to ${status}` });
      fetchOrders();
    }
  };

  if (!authLoading && !isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
        </div>
      </div>
    );
  }

  const totalRevenue = orders.filter(o => o.payment_status === "paid").reduce((s, o) => s + Number(o.total_amount), 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="text-3xl font-racing font-bold">Manage Orders</h1>
          <div className="flex gap-3">
            <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Total Orders</div><div className="text-xl font-bold">{orders.length}</div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Revenue</div><div className="text-xl font-bold text-primary">₹{totalRevenue.toFixed(0)}</div></CardContent></Card>
          </div>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading orders...</p>
        ) : orders.length === 0 ? (
          <Card><CardContent className="text-center py-12 text-muted-foreground">No orders yet.</CardContent></Card>
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
                        {new Date(o.created_at).toLocaleString()} · {o.shipping_name} · {o.shipping_phone}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${statusColor[o.status]} text-white`}>{o.status.toUpperCase()}</Badge>
                      <span className="text-lg font-bold text-primary">₹{Number(o.total_amount).toFixed(0)}</span>
                      <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v)}>
                        <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-4" />
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Items</h4>
                      <div className="space-y-2">
                        {o.order_items?.map((it) => (
                          <div key={it.id} className="flex gap-3 text-sm">
                            <img src={getCarImageUrl(it.car_image)} alt={it.car_name} className="w-12 h-12 rounded object-cover" />
                            <div className="flex-1">
                              <div className="font-medium">{it.car_name}</div>
                              <div className="text-muted-foreground">Qty: {it.quantity} × ₹{Number(it.price).toFixed(0)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Shipping</h4>
                      <p className="text-sm text-muted-foreground">
                        {o.shipping_address}<br />
                        {o.shipping_city}, {o.shipping_state} - {o.shipping_pincode}
                      </p>
                    </div>
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
