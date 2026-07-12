import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

const items = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over ₹1,499" },
  { icon: ShieldCheck, title: "Authentic Guarantee", desc: "100% genuine die-cast" },
  { icon: RotateCcw, title: "Easy Returns", desc: "7-day hassle-free returns" },
  { icon: Headphones, title: "Collector Support", desc: "Mon–Sat, 9am–7pm IST" },
];

export const TrustBar = () => {
  return (
    <section className="border-y bg-muted/40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="h-11 w-11 shrink-0 rounded-full bg-gradient-primary flex items-center justify-center shadow-elegant">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-semibold text-sm text-foreground">{title}</div>
                <div className="text-xs text-muted-foreground">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
