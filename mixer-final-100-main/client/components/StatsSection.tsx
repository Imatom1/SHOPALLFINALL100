import { Card, CardContent } from "@/components/ui/card";
import { perfumes } from "../data/perfumes";
import { Crown, Heart, Sparkles, Star } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: Crown,
      label: "Designer Inspired",
      value: perfumes.length,
      description: "Premium fragrances",
    },
    {
      icon: Star,
      label: "Original Brands",
      value: new Set(perfumes.map((p) => p.originalBrand)).size,
      description: "Inspired by luxury houses",
    },
    {
      icon: Heart,
      label: "Starting From",
      value: "$34.99",
      description: "Unbeatable prices",
    },
    {
      icon: Sparkles,
      label: "Free Shipping",
      value: "$50+",
      description: "Fast delivery",
    },
  ];

  return (
    <div
      className="bg-gradient-to-r from-black-800 via-black-700 to-black-600 py-20 border-y-2 border-gold-400 relative overflow-hidden
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-200%] before:animate-shimmer before:transition-transform"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gold-300 mb-6">
            Designer Quality at Unbeatable Prices
          </h2>
          <p className="text-lg text-gold-400 max-w-3xl mx-auto font-medium">
            Experience luxury fragrances inspired by the world's most
            prestigious brands without the premium price tag
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={index}
                className="text-center bg-gradient-to-br from-black-800 to-black-800 border-black-700 hover:border-gold-400 transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-gold-600" />
                  </div>
                  <div className="text-3xl font-bold text-gold-300 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-gold-300 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gold-300">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
