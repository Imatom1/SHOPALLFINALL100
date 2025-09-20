import { useNavigate } from "react-router-dom";
import { Perfume } from "../data/perfumes";
import { CompactPerfumeCard } from "./CompactPerfumeCard";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import type React from "react";

interface MiniFragranceGridProps {
  items: Perfume[];
  title?: string;
  max?: number;
  onItemClick?: (perfume: Perfume, e?: React.MouseEvent<HTMLElement>) => void;
  ctaHref?: string;
  ctaLabel?: string;
}

export function MiniFragranceGrid({
  items,
  title = "Fragrances",
  max = 8,
  onItemClick,
  ctaHref = "/",
  ctaLabel = "View All",
}: MiniFragranceGridProps) {
  const navigate = useNavigate();
  const list = items.slice(0, Math.max(0, max));

  return (
    <section className="bg-gradient-to-b from-black-900 to-black-800 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-600" />
            <h3 className="text-base sm:text-lg font-semibold text-gold-300">
              {title} ({items.length})
            </h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(ctaHref)}
            className="border-gold-400 text-gold-300 hover:bg-black-800 hover:text-white h-7 px-3"
          >
            {ctaLabel}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {list.map((perfume) => (
            <div key={perfume.id}>
              <CompactPerfumeCard
                perfume={perfume}
                onClick={(e) => onItemClick?.(perfume, e)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
