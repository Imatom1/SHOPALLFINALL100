import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  Droplets,
  Star,
  Scale,
  Tag,
  X,
  ShoppingCart,
} from "lucide-react";
import { Perfume } from "../data/perfumes";
import { getPerfumeBuyUrl } from "../data/perfume-links";
import { useState } from "react";

interface PerfumeDetailProps {
  perfume: Perfume | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompare?: (perfume: Perfume) => void;
  isInComparison?: boolean;
  anchorY?: number | null;
}

export function PerfumeDetail({
  perfume,
  open,
  onOpenChange,
  onCompare,
  isInComparison,
  anchorY,
}: PerfumeDetailProps) {
  if (!open || !perfume) return null;

  const safeTop = anchorY != null && typeof window !== "undefined"
    ? Math.max(8, Math.min(window.innerHeight - 8, anchorY))
    : undefined;

  return (
    <div className="fixed inset-0 z-50 p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onOpenChange(false);
        }}
      />

      {/* Modal Content */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 ${safeTop == null ? "top-1/2 -translate-y-1/2" : ""} bg-gradient-to-br from-black-800 via-black-800 to-black-700 border border-gold-400 rounded-lg shadow-2xl w-[calc(100%-1rem)] sm:w-full max-w-lg max-h-[75vh] overflow-hidden flex flex-col
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-200%] before:animate-shimmer before:transition-transform`}
        style={{ top: safeTop ?? undefined }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 z-50 p-1 sm:p-2 rounded-full bg-black-700 hover:bg-gold-300 text-gold-300 hover:text-black-900 transition-colors shadow-md border border-gold-300"
          type="button"
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>

        <div className="p-2 sm:p-3 relative z-10 overflow-y-auto flex-1">
          {/* Header */}
          <div className="mb-2">
            <p className="text-xs text-gray-400 mb-1 pr-6">
              Inspired by
            </p>
            <h2 className="text-base sm:text-lg font-bold text-gold-500 mb-1 pr-6">
              {perfume.originalBrand} {perfume.name}
            </h2>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-gold-600">
                  {perfume.brand}
                </p>
              </div>
              <Badge
                variant="secondary"
                className="bg-black-800 text-gold-300 border-gold-300 text-xs"
              >
                {perfume.gender}
              </Badge>
            </div>
          </div>

          {/* Description */}
          {perfume.description && (
            <div className="p-2 bg-black-800 rounded border border-black-700 mb-2">
              <p className="text-xs text-gold-400 italic">
                {perfume.description}
              </p>
            </div>
          )}

          {/* Main Accords */}
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-gold-300 mb-1">
              Main Accords
            </h3>
            <div className="flex flex-wrap gap-1">
              {perfume.mainAccords.map((accord) => (
                <Badge
                  key={accord}
                  variant="outline"
                  className="border-black-700 text-gold-300 bg-black-800 text-xs"
                >
                  {accord}
                </Badge>
              ))}
            </div>
          </div>

          {/* Fragrance Details */}
          <div className="grid grid-cols-1 gap-1 mb-2">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gold-500 flex-shrink-0" />
              <span className="text-xs font-medium text-gold-400">Time:</span>
              <span className="text-xs text-gold-300 truncate">
                {perfume.bestTime}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-gold-500 flex-shrink-0" />
              <span className="text-xs font-medium text-gold-400">
                Seasons:
              </span>
              <span className="text-xs text-gold-300 truncate">
                {perfume.mainSeasons.join(", ")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Droplets className="w-3 h-3 text-gold-500 flex-shrink-0" />
              <span className="text-xs font-medium text-gold-400">
                Sillage:
              </span>
              <span className="text-xs text-gold-300 truncate">
                {perfume.sillage}
              </span>
            </div>
          </div>

          {/* Notes Pyramid - Compact */}
          <div className="grid grid-cols-3 gap-1 mb-2">
            <div className="text-center">
              <h4 className="text-xs font-semibold text-gold-300 mb-1">Top</h4>
              <div className="text-xs text-gold-300">
                {perfume.topNotes.map((note) => (
                  <p key={note} className="truncate">
                    {note}
                  </p>
                ))}
              </div>
            </div>

            <div className="text-center">
              <h4 className="text-xs font-semibold text-gold-300 mb-1">
                Middle
              </h4>
              <div className="text-xs text-gold-300">
                {perfume.middleNotes.map((note) => (
                  <p key={note} className="truncate">
                    {note}
                  </p>
                ))}
              </div>
            </div>

            <div className="text-center">
              <h4 className="text-xs font-semibold text-gold-300 mb-1">Base</h4>
              <div className="text-xs text-gold-300">
                {perfume.baseNotes.map((note) => (
                  <p key={note} className="truncate">
                    {note}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Sizes and Pricing Display - Compact */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gold-300">
              Sizes & Prices
            </h3>
            <div className="grid grid-cols-3 gap-1">
              {perfume.sizes.map((size) => (
                <Card
                  key={size.size}
                  className="border-black-700 bg-black-800"
                >
                  <CardContent className="p-1 text-center">
                    <div className="text-xs font-semibold text-gold-300">
                      {size.size}
                    </div>
                    <div className="text-sm font-bold text-gold-300">
                      ${size.price}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Actions */}
            <div className="space-y-2">
              {/* Buy Button */}
              <Button
                className="w-full bg-gold-600 hover:bg-gold-700 text-white font-bold py-2 px-4 rounded transition-colors"
                onClick={() => {
                  const buyUrl = getPerfumeBuyUrl(perfume.id);
                  window.open(buyUrl, "_blank", "noopener,noreferrer");
                }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy Now
              </Button>

              {/* Compare Section */}
              <div className="p-2 bg-gradient-to-br from-black-800 to-black-800 rounded border border-black-700">
                <Button
                  variant="outline"
                  className="w-full border-gold-300 text-gold-300 hover:bg-black-800 hover:text-white text-sm h-8"
                  onClick={() => onCompare?.(perfume)}
                  disabled={isInComparison}
                >
                  <Scale className="w-4 h-4 mr-2" />
                  {isInComparison ? "Added" : "Compare Perfumes"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
