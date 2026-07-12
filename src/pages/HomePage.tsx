import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { TrustBar } from "@/components/TrustBar";
import { FeaturedSection } from "@/components/FeaturedSection";
import { Footer } from "@/components/Footer";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <HeroSection />
      <TrustBar />
      <main className="container mx-auto px-4 py-16 flex-1">
        <FeaturedSection />
      </main>
      <Footer />
    </div>
  );
};
