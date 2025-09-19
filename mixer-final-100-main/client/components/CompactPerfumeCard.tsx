import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Droplets, Star } from "lucide-react";
import { Perfume } from "../data/perfumes";
import type React from "react";

interface CompactPerfumeCardProps {
  perfume: Perfume;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function CompactPerfumeCard({
  perfume,
  onClick,
}: CompactPerfumeCardProps) {
  // Gender badge specific colors - elegant gold variations
  const getGenderBadgeColor = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "women":
        return "bg-gold-600 text-black-950 border-gold-500";
      case "men":
        return "bg-gold-700 text-black-950 border-gold-600";
      case "unisex":
        return "bg-gold-500 text-black-950 border-gold-400";
      default:
        return "bg-gold-600 text-black-950 border-gold-500";
    }
  };

  // Elegant gold color scheme for all cards
  const getGenderColors = (gender: string) => {
    // All cards use elegant gold colors for premium feel
    return {
      cardBg: "bg-gradient-to-br from-black-950 to-black-900",
      cardBorder: "border-gold-600 hover:border-gold-500",
      cardShadow: "shadow-gold-500/20",
      titleColor: "text-gold-200",
      brandText: "text-gold-300",
      accordBorder: "border-gold-500 text-gold-200 bg-black-800",
      iconColor: "text-gold-400",
    };
  };

  const colors = getGenderColors(perfume.gender);

  return (
    <Card
      className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${colors.cardBg} border ${colors.cardBorder} shadow-md ${colors.cardShadow} relative overflow-hidden
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-gold-500/10 before:to-transparent before:translate-x-[-200%] group-hover:before:animate-shimmer before:transition-transform`}
      onClick={onClick}
    >
      <CardContent className="p-1 sm:p-2 relative z-10 h-full">
        <div className="space-y-1 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start gap-1 mb-1">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 mb-1 break-words">
                Inspired by
              </p>
              <h4
                className="text-sm sm:text-base md:text-lg font-extrabold text-gold-500 leading-tight tracking-wide break-words"
              >
                {perfume.originalBrand} {perfume.name}
              </h4>
              <p
                className={`text-xs sm:text-sm font-semibold ${colors.brandText} tracking-wider uppercase opacity-90 break-words`}
              >
                {perfume.brand}
              </p>
            </div>
            <Badge
              variant="secondary"
              className={`${getGenderBadgeColor(perfume.gender)} text-xs font-extrabold shadow-lg flex-shrink-0 tracking-widest`}
            >
              {perfume.gender.charAt(0)}
            </Badge>
          </div>

          {/* Main Accords */}
          <div className="flex flex-wrap gap-1 mb-1">
            {perfume.mainAccords.map((accord) => (
              <Badge
                key={accord}
                variant="outline"
                className={`text-xs sm:text-sm ${colors.accordBorder} font-semibold tracking-wide shadow-sm`}
              >
                {accord}
              </Badge>
            ))}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 gap-1 text-xs sm:text-sm flex-1">
            <div className="flex items-center gap-1">
              <Clock
                className={`w-3 h-3 sm:w-4 sm:h-4 ${colors.iconColor} flex-shrink-0`}
              />
              <span className="font-semibold text-gold-200 break-words">{perfume.bestTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Droplets
                className={`w-3 h-3 sm:w-4 sm:h-4 ${colors.iconColor} flex-shrink-0`}
              />
              <span className="font-semibold text-gold-200 break-words">{perfume.sillage}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star
                className={`w-3 h-3 sm:w-4 sm:h-4 ${colors.iconColor} flex-shrink-0`}
              />
              <span className="font-semibold text-gold-200 break-words">
                {perfume.mainSeasons.join(", ")}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
