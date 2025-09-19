import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Droplets, Star, Heart } from "lucide-react";
import { Perfume } from "../data/perfumes";

interface PerfumeCardProps {
  perfume: Perfume;
  onClick?: () => void;
  onCompare?: (perfume: Perfume) => void;
  showCompareButton?: boolean;
}

export function PerfumeCard({
  perfume,
  onClick,
  onCompare,
  showCompareButton = false,
}: PerfumeCardProps) {
  // Gender badge specific colors
  const getGenderBadgeColor = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "women":
        return "bg-pink-200 text-pink-900 border-pink-400";
      case "men":
        return "bg-blue-200 text-blue-900 border-blue-400";
      case "unisex":
        return "bg-green-200 text-green-900 border-green-400";
      default:
        return "bg-black-800 text-gold-300 border-gold-500";
    }
  };

  // Gender-based metallic color schemes: Better Gold, Darker Silver, Copper
  const getGenderColors = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "women":
        // Better Gold theme - using dark backgrounds with gold accents
        return {
          cardBg: "bg-gradient-to-br from-black-700 via-black-600 to-black-500",
          cardBorder: "border-gold-500 hover:border-gold-600",
          cardShadow: "shadow-gold-300/60",
          titleHover: "group-hover:text-gold-300",
          brandText: "text-gold-300",
          profileText: "text-gold-400",
          badge: "bg-gold-600 text-white border-gold-500",
          accordBorder: "border-gold-400 text-gold-300 bg-black-800",
          iconColor: "text-gold-300",
          compareButton: "border-gold-500 text-gold-300 hover:bg-black-700 hover:text-white",
          shimmer: "before:via-white/15",
        };
      case "men":
        // Dark Silver theme - using dark backgrounds with silver accents
        return {
          cardBg: "bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600",
          cardBorder: "border-slate-400 hover:border-slate-300",
          cardShadow: "shadow-slate-400/60",
          titleHover: "group-hover:text-slate-300",
          brandText: "text-slate-300",
          profileText: "text-slate-400",
          badge: "bg-slate-500 text-white border-slate-400",
          accordBorder: "border-slate-400 text-slate-300 bg-black-800",
          iconColor: "text-slate-300",
          compareButton: "border-slate-400 text-slate-300 hover:bg-black-700 hover:text-white",
          shimmer: "before:via-white/15",
        };
      case "unisex":
        // Dark theme with gold accents
        return {
          cardBg:
            "bg-gradient-to-br from-black-700 via-black-600 to-black-500",
          cardBorder: "border-gold-500 hover:border-gold-600",
          cardShadow: "shadow-gold-300/60",
          titleHover: "group-hover:text-gold-300",
          brandText: "text-gold-300",
          profileText: "text-gold-400",
          badge: "bg-gold-600 text-white border-gold-500",
          accordBorder: "border-gold-400 text-gold-300 bg-black-800",
          iconColor: "text-gold-300",
          compareButton:
            "border-gold-500 text-gold-300 hover:bg-black-700 hover:text-white",
          shimmer: "before:via-white/15",
        };
      default:
        // Fallback to dark theme with gold accents
        return {
          cardBg:
            "bg-gradient-to-br from-black-700 via-black-600 to-black-500",
          cardBorder: "border-gold-500 hover:border-gold-600",
          cardShadow: "shadow-gold-300/60",
          titleHover: "group-hover:text-gold-300",
          brandText: "text-gold-300",
          profileText: "text-gold-400",
          badge: "bg-gold-600 text-white border-gold-500",
          accordBorder: "border-gold-400 text-gold-300 bg-black-800",
          iconColor: "text-gold-300",
          compareButton:
            "border-gold-500 text-gold-300 hover:bg-black-700 hover:text-white",
          shimmer: "before:via-white/15",
        };
    }
  };

  const colors = getGenderColors(perfume.gender);

  return (
    <Card
      className={`group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 ${colors.cardBg} border-2 ${colors.cardBorder} shadow-xl ${colors.cardShadow} relative overflow-hidden
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent ${colors.shimmer} before:to-transparent before:translate-x-[-200%] group-hover:before:animate-shimmer before:transition-transform`}
      onClick={onClick}
    >
      <CardHeader className="pb-2 sm:pb-3 relative z-10 p-3 sm:p-6">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400 mb-1 break-words">
              Inspired by
            </p>
            <CardTitle
              className="text-sm sm:text-base md:text-lg font-bold text-gold-500 transition-colors leading-tight break-words"
            >
              {perfume.originalBrand} {perfume.name}
            </CardTitle>
            <p
              className={`text-xs sm:text-sm font-bold ${colors.brandText} mt-1 break-words`}
            >
              {perfume.brand}
            </p>
          </div>
          <Badge
            variant="secondary"
            className={`${getGenderBadgeColor(perfume.gender)} text-xs font-semibold shadow-sm flex-shrink-0 ml-2`}
          >
            {perfume.gender}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
          {perfume.mainAccords.map((accord) => (
            <Badge
              key={accord}
              variant="outline"
              className={`text-xs ${colors.accordBorder} font-medium shadow-sm`}
            >
              {accord}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-0 relative z-10 p-3 sm:p-6">
        <div className="space-y-2 sm:space-y-3">
          <div className="text-xs sm:text-sm text-gold-300">
            <span className={`font-bold ${colors.profileText}`}>Profile:</span>{" "}
            <span className="font-semibold text-gold-300">
              {perfume.fragranceProfile}
            </span>
          </div>

          <div className="text-xs sm:text-sm text-gold-300">
            <span className={`font-bold ${colors.profileText}`}>
              Top Notes:
            </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {perfume.topNotes.map((note) => (
                <Badge
                  key={note}
                  variant="outline"
                  className={`text-xs ${colors.accordBorder} font-medium`}
                >
                  {note}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs">
            <div className="flex items-center gap-1 text-gold-300">
              <Clock className={`w-3 h-3 ${colors.iconColor} flex-shrink-0`} />
              <span className="font-semibold break-words">{perfume.bestTime}</span>
            </div>
            <div className="flex items-center gap-1 text-gold-300">
              <Droplets
                className={`w-3 h-3 ${colors.iconColor} flex-shrink-0`}
              />
              <span className="font-semibold break-words">{perfume.sillage}</span>
            </div>
            <div className="flex items-center gap-1 text-gold-300 sm:col-span-2">
              <Star className={`w-3 h-3 ${colors.iconColor} flex-shrink-0`} />
              <span className="font-semibold break-words">
                {perfume.mainSeasons.join(", ")}
              </span>
            </div>
          </div>

          {showCompareButton && onCompare && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                onCompare(perfume);
              }}
              className={`w-full ${colors.compareButton} font-semibold mt-2 sm:mt-3 text-xs sm:text-sm h-8 sm:h-10 bg-transparent hover:bg-opacity-20`}
            >
              <Heart className="w-3 h-3 mr-1" />
              Compare Perfumes
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
