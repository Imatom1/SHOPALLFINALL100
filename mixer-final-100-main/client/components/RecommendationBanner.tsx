import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Star } from "lucide-react";
import { perfumes } from "../data/perfumes";

interface RecommendationBannerProps {
  onPerfumeSelect: (perfumeId: string) => void;
}

export function RecommendationBanner({
  onPerfumeSelect,
}: RecommendationBannerProps) {
  // Get some featured/popular perfumes
  const featuredPerfumes = perfumes.filter((p) =>
    ["baccarat-rouge-540", "aventus", "coco-mademoiselle", "sauvage"].includes(
      p.id,
    ),
  );

  return (
    <Card className="bg-gradient-to-r from-black-800 via-black-800 to-black-800 border-gold-300 mb-8">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-gold-600" />
          <h3 className="text-xl font-bold text-gold-300">
            Staff Picks & Bestsellers
          </h3>
          <Star className="w-5 h-5 text-gold-500" />
        </div>

        <p className="text-gold-400 mb-6">
          Discover our most sought-after fragrances, carefully selected by our
          perfume experts
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredPerfumes.map((perfume) => (
            <div
              key={perfume.id}
              className="bg-gradient-to-br from-black-800 to-black-800 rounded-lg p-4 border border-black-700 hover:border-gold-400 transition-all duration-200 hover:shadow-md cursor-pointer group"
              onClick={() => onPerfumeSelect(perfume.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gold-300 group-hover:text-gold-300 transition-colors text-sm">
                    {perfume.name}
                  </h4>
                  <p className="text-xs text-gold-600 font-medium">
                    {perfume.brand}
                  </p>
                </div>
                <Heart className="w-4 h-4 text-gold-400 group-hover:text-gold-600 transition-colors" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gold-300">
                  {perfume.fragranceProfile}
                </span>
                <div className="text-right">
                  <span className="text-sm font-bold text-gold-300">
                    ${perfume.sizes[0].price}
                  </span>
                  <div className="text-xs text-gray-500">
                    from {perfume.sizes[0].size}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button
            variant="outline"
            className="border-gold-400 text-gold-300 hover:bg-black-800 hover:text-white"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            View All Premium Collection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
