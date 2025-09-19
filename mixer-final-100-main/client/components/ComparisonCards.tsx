import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Eye, Clock, Droplets, Star, ArrowLeftRight } from "lucide-react";
import { Perfume } from "../data/perfumes";

import type React from "react";
interface ComparisonCardsProps {
  perfumes: Perfume[];
  onRemove: (perfumeId: string) => void;
  onViewDetails: (perfume: Perfume, e?: React.MouseEvent<HTMLElement>) => void;
}

export function ComparisonCards({
  perfumes,
  onRemove,
  onViewDetails,
}: ComparisonCardsProps) {
  if (perfumes.length === 0) {
    return null;
  }

  // Only show comparison when we have at least 2 perfumes
  if (perfumes.length < 2) {
    const perfume = perfumes[0];
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-lg sm:text-xl font-bold text-gold-300 mb-2">
            Fragrance Comparison
          </h2>
          <p className="text-sm text-gold-300">
            Add more fragrances to start comparing
          </p>
        </div>

        <Card className="bg-gradient-to-br from-black-900 via-black-800 to-black-700 border-2 border-gold-400 shadow-xl">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gold-300 mb-2">
                {perfume.name}
              </h3>
              <p className="text-sm text-gold-300 mb-4">
                Add another fragrance to begin your comparison
              </p>
              <Button
                variant="outline"
                onClick={() => onRemove(perfume.id)}
                className="border-red-300 text-red-600 hover:bg-red-800"
              >
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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

  // Gender-based color schemes
  const getGenderColors = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "women":
        return {
          titleText: "text-gold-300",
          brandText: "text-gold-300",
          accordBorder: "border-gold-400 text-gold-300 bg-black-800",
          iconColor: "text-gold-300",
        };
      case "men":
        return {
          titleText: "text-slate-300",
          brandText: "text-slate-300",
          accordBorder: "border-slate-500 text-slate-300 bg-black-800",
          iconColor: "text-slate-300",
        };
      case "unisex":
        return {
          titleText: "text-gold-300",
          brandText: "text-gold-300",
          accordBorder: "border-gold-400 text-gold-300 bg-black-800",
          iconColor: "text-gold-300",
        };
      default:
        return {
          titleText: "text-gold-300",
          brandText: "text-gold-300",
          accordBorder: "border-gold-400 text-gold-300 bg-black-800",
          iconColor: "text-gold-300",
        };
    }
  };

  // Get colors for each perfume
  const perfumeColors = perfumes.map((perfume) =>
    getGenderColors(perfume.gender),
  );

  // Section data for aligned layout
  const comparisonSections = [
    {
      title: "",
      getValue: (perfume: Perfume, colors: any) => (
        <div className="space-y-1">
          <h3
            className={`text-xs sm:text-sm font-bold ${colors.titleText} leading-tight text-center break-words`}
          >
            {perfume.name}
          </h3>
          <p
            className={`text-xs font-bold ${colors.brandText} text-center break-words`}
          >
            {perfume.brand}
          </p>
          <p className="text-xs font-semibold text-gold-400 hidden sm:block">
            Inspired by {perfume.originalBrand}
          </p>
          <Badge
            variant="secondary"
            className={`${getGenderBadgeColor(perfume.gender)} text-xs sm:text-sm font-semibold shadow-sm w-fit`}
          >
            {perfume.gender}
          </Badge>
        </div>
      ),
    },
    {
      title: "Profile",
      getValue: (perfume: Perfume, colors: any) => (
        <p className="text-xs font-semibold text-gold-300 text-center">
          {perfume.fragranceProfile}
        </p>
      ),
    },
    {
      title: "Details",
      getValue: (perfume: Perfume, colors: any) => (
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-center gap-1 text-gold-300">
            <Clock className={`w-3 h-3 ${colors.iconColor} flex-shrink-0`} />
            <span className="font-semibold text-center">
              {perfume.bestTime}
            </span>
          </div>
          <div className="flex items-center justify-center gap-1 text-gold-300">
            <Droplets className={`w-3 h-3 ${colors.iconColor} flex-shrink-0`} />
            <span className="font-semibold text-center">{perfume.sillage}</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-gold-300">
            <Star className={`w-3 h-3 ${colors.iconColor} flex-shrink-0`} />
            <span className="font-semibold text-center">
              {perfume.mainSeasons.join(", ")}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Accords",
      getValue: (perfume: Perfume, colors: any) => (
        <div className="flex flex-wrap gap-1 justify-center">
          {perfume.mainAccords.map((accord) => (
            <Badge
              key={accord}
              variant="outline"
              className={`text-xs ${colors.accordBorder} font-medium`}
            >
              {accord}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      title: "Top Notes",
      getValue: (perfume: Perfume, colors: any) => (
        <div className="space-y-1">
          {perfume.topNotes.map((note, idx) => (
            <div
              key={idx}
              className="text-xs bg-black-700 px-1 sm:px-2 py-1 rounded border border-gold-500 font-medium truncate"
            >
              {note}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Middle Notes",
      getValue: (perfume: Perfume, colors: any) => (
        <div className="space-y-1">
          {perfume.middleNotes.map((note, idx) => (
            <div
              key={idx}
              className="text-xs bg-black-700 px-1 sm:px-2 py-1 rounded border border-gold-500 font-medium truncate"
            >
              {note}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Base Notes",
      getValue: (perfume: Perfume, colors: any) => (
        <div className="space-y-1">
          {perfume.baseNotes.map((note, idx) => (
            <div
              key={idx}
              className="text-xs bg-black-700 px-1 sm:px-2 py-1 rounded border border-gold-500 font-medium truncate"
            >
              {note}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* X buttons connected to table */}
      <div
        className={`grid gap-1 sm:gap-2 mb-0 ${
          perfumes.length === 2
            ? "grid-cols-[1fr_1px_1fr]"
            : perfumes.length === 3
              ? "grid-cols-[1fr_1px_1fr_1px_1fr]"
              : "grid-cols-1"
        }`}
      >
        {perfumes.map((perfume, perfumeIndex) => (
          <div key={perfume.id} className="contents">
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRemove(perfume.id)}
                className="w-12 h-8 p-0 border-red-400 bg-red-50 text-red-700 hover:bg-red-100 border-2 shadow-sm"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Divider space (not after last item) */}
            {perfumeIndex < perfumes.length - 1 && <div></div>}
          </div>
        ))}
      </div>

      {/* Single Comparison Card */}
      <Card className="bg-gradient-to-br from-black-950 via-black-900 to-black-800 border-2 border-gold-400 shadow-xl relative overflow-hidden -mt-2">
        <CardHeader className="text-center pb-1 sm:pb-2 relative">
          <CardTitle className="text-sm sm:text-xl font-bold text-gold-300 flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
            Fragrance Comparison Chart
          </CardTitle>
        </CardHeader>

        <CardContent className="p-1 sm:p-2">
          <div className="space-y-1 sm:space-y-2">
            {comparisonSections.map((section, index) => (
              <div key={section.title}>
                <div
                  className={`grid gap-1 sm:gap-2 items-start ${
                    perfumes.length === 2
                      ? "grid-cols-[1fr_1px_1fr]"
                      : perfumes.length === 3
                        ? "grid-cols-[1fr_1px_1fr_1px_1fr]"
                        : "grid-cols-1"
                  }`}
                >
                  {perfumes.map((perfume, perfumeIndex) => (
                    <div key={perfume.id} className="contents">
                      {/* Perfume Column */}
                      <div className="space-y-1 text-center min-h-0 flex flex-col justify-start">
                        {section.title && (
                          <h4 className="font-bold text-xs text-gold-300 mb-1">
                            {section.title}
                          </h4>
                        )}
                        {section.getValue(perfume, perfumeColors[perfumeIndex])}
                      </div>

                      {/* Divider (not after last item) */}
                      {perfumeIndex < perfumes.length - 1 && (
                        <div className="bg-gold-300"></div>
                      )}
                    </div>
                  ))}
                </div>
                {/* Horizontal line separator between sections (except after last section) */}
                {index < comparisonSections.length - 1 && (
                  <div className="w-full h-px bg-gold-300 my-2 sm:my-3"></div>
                )}
              </div>
            ))}

            {/* View Details Buttons */}
            <div
              className={`grid gap-1 sm:gap-2 pt-1 sm:pt-2 items-center ${
                perfumes.length === 2
                  ? "grid-cols-[1fr_1px_1fr]"
                  : perfumes.length === 3
                    ? "grid-cols-[1fr_1px_1fr_1px_1fr]"
                    : "grid-cols-1"
              }`}
            >
              {perfumes.map((perfume, perfumeIndex) => (
                <div key={perfume.id} className="contents">
                  <Button
                    variant="outline"
                    onClick={(e) => onViewDetails(perfume, e)}
                    className="w-full border-gold-500 bg-black-800 text-gold-300 hover:bg-gold-600 font-semibold text-xs h-8"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    <span className="hidden sm:inline">Details</span>
                    <span className="sm:hidden">•••</span>
                  </Button>

                  {/* Divider (not after last item) */}
                  {perfumeIndex < perfumes.length - 1 && (
                    <div className="bg-gold-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
