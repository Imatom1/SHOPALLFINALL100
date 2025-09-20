import { useState, useEffect, useMemo } from "react";
import type React from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { perfumes, Perfume } from "../data/perfumes";
import { CompactPerfumeCard } from "../components/CompactPerfumeCard";
import { PerfumeDetail } from "../components/PerfumeDetail";
import { ComparisonCards } from "../components/ComparisonCards";
import { Header } from "../components/Header";
import { CompactFilters, FilterState } from "../components/CompactFilters";
import { SortSelect, SortOption } from "../components/SortSelect";

export default function Compare() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [comparisonList, setComparisonList] = useState<Perfume[]>([]);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailAnchorY, setDetailAnchorY] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const initialFilters: FilterState = { search: "", gender: "", season: "", bestTime: "", mainAccord: "" };
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortBy, setSortBy] = useState<SortOption>("name");

  // Initialize comparison list from URL params on mount
  useEffect(() => {
    const compareIds =
      searchParams.get("perfumes")?.split(",").filter(Boolean) || [];
    const perfumesToCompare = compareIds
      .map((id) => perfumes.find((p) => p.id === id))
      .filter((p): p is Perfume => p !== undefined)
      .slice(0, 3); // Max 3 items

    setComparisonList(perfumesToCompare);
    setIsInitialized(true);
  }, []); // Only run on mount

  // Update URL when comparison list changes (but only after initialization)
  useEffect(() => {
    if (!isInitialized) return; // Don't update URL during initial load

    const perfumeIds = comparisonList.map((p) => p.id);
    if (perfumeIds.length > 0) {
      setSearchParams({ perfumes: perfumeIds.join(",") }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [comparisonList, isInitialized, setSearchParams]);

  const removeFromComparison = (perfumeId: string) => {
    setComparisonList((prev) => prev.filter((p) => p.id !== perfumeId));
  };

  const addToComparison = (perfume: Perfume) => {
    if (
      comparisonList.length < 3 &&
      !comparisonList.find((p) => p.id === perfume.id)
    ) {
      setComparisonList((prev) => [...prev, perfume]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePerfumeClick = (perfume: Perfume, e?: React.MouseEvent<HTMLElement>) => {
    const target = e?.currentTarget as HTMLElement | undefined;
    if (target) {
      const rect = target.getBoundingClientRect();
      setDetailAnchorY(rect.top);
    } else {
      setDetailAnchorY(null);
    }
    setSelectedPerfume(perfume);
    setIsDetailOpen(true);
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  // Full list with new filters and sorting (excluding already compared ones)
  const filteredAndSortedPerfumes = useMemo(() => {
    const filtered = perfumes
      .filter((p) => !comparisonList.find((cp) => cp.id === p.id))
      .filter((perfume) => {
        if (filters.search) {
          const normalize = (s: string) => s.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
          const tokens = normalize(filters.search).split(" ").filter(Boolean);
          const searchableText = normalize([
            perfume.id,
            perfume.name,
            perfume.brand,
            perfume.originalBrand,
            perfume.fragranceProfile,
            ...perfume.mainAccords,
            ...perfume.topNotes,
            ...perfume.middleNotes,
            ...perfume.baseNotes,
          ].join(" "));
          const words = searchableText.split(' ');
          const allPresent = tokens.every((t) => searchableText.includes(t) || words.some((w) => w.startsWith(t)));
          if (!allPresent) return false;
        }
        if (filters.gender) {
          if (filters.gender === "Men" && perfume.gender !== "Men" && perfume.gender !== "Unisex") return false;
          if (filters.gender === "Women" && perfume.gender !== "Women" && perfume.gender !== "Unisex") return false;
          if (filters.gender === "Unisex" && perfume.gender !== "Unisex") return false;
        }
        if (filters.mainAccord) {
          const has = perfume.mainAccords.some((a) => a.toLowerCase().includes(filters.mainAccord.toLowerCase()) || filters.mainAccord.toLowerCase().includes(a.toLowerCase()));
          if (!has) return false;
        }
        if (filters.season && !perfume.mainSeasons.includes(filters.season)) return false;
        if (filters.bestTime && perfume.bestTime !== filters.bestTime) return false;
        return true;
      });

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "brand":
          return a.brand.localeCompare(b.brand);
        case "gender":
          const genderOrder = { Women: 1, Men: 2, Unisex: 3 } as const;
          return (genderOrder[a.gender as keyof typeof genderOrder] || 0) - (genderOrder[b.gender as keyof typeof genderOrder] || 0);
        case "popularity":
          const aPop = a.mainAccords.length + a.topNotes.length + a.middleNotes.length + a.baseNotes.length;
          const bPop = b.mainAccords.length + b.topNotes.length + b.middleNotes.length + b.baseNotes.length;
          return bPop - aPop;
        case "sillage":
          const sOrder = { Light: 1, "Light to Moderate": 2, Moderate: 3, "Moderate to Strong": 4, Strong: 5, "Very Strong": 6 } as const;
          return (sOrder[b.sillage as keyof typeof sOrder] || 0) - (sOrder[a.sillage as keyof typeof sOrder] || 0);
        default:
          return 0;
      }
    });
    return sorted;
  }, [comparisonList, filters, sortBy]);

  const resetFilters = () => setFilters(initialFilters);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-950 via-black-900 to-black-800">
      <Header />

      {/* Compact Header */}
      <div
        className="bg-gradient-to-r from-black-900 via-black-800 to-black-700 py-2 relative overflow-hidden border-b border-gold-500
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-gold-500/10 before:to-transparent before:translate-x-[-200%] before:animate-shimmer before:transition-transform"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-3 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/")}
                className="border-gold-500 text-gold-300 hover:bg-gold-600 hover:text-black-950 font-medium text-sm h-8 px-4"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Main Page
              </Button>
              <Scale className="w-4 h-4 text-gold-700" />
              <h1 className="text-sm sm:text-base font-bold bg-gradient-to-r from-gold-800 via-gold-700 to-gold-600 bg-clip-text text-transparent">
                Compare ({comparisonList.length}/3)
              </h1>
            </div>
            {comparisonList.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearComparison}
                className="border-gold-400 text-gold-300 hover:bg-black-800 hover:text-white font-medium text-xs h-6 px-2"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-3 py-2">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Comparison table section - prioritize on mobile */}
          <div className="order-1 flex-1">
            {/* Comparison table or empty state */}
            {comparisonList.length === 0 ? (
              <div className="flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
                <div className="text-center px-4">
                  <Scale className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                  <h2 className="text-base sm:text-lg font-semibold text-gold-300 mb-2">
                    Start Comparing
                  </h2>
                  <p className="text-sm text-gold-300 mb-4 max-w-xs mx-auto">
                    Select up to 3 fragrances to compare their profiles and
                    characteristics.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <ComparisonCards
                  perfumes={comparisonList}
                  onRemove={removeFromComparison}
                  onViewDetails={handlePerfumeClick}
                />
              </div>
            )}
          </div>

          {/* Perfume selection sidebar */}
          <div className="order-2 lg:w-[640px] flex-shrink-0">
            <Card
              className="bg-gradient-to-br from-black-800 via-black-700 to-black-600 border border-gold-400 shadow-lg relative overflow-hidden
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-200%] before:animate-shimmer before:transition-transform"
            >
              <CardHeader className="relative z-10 p-2 sm:p-3">
                <CardTitle className="text-sm font-bold text-gold-300 flex items-center gap-2">
                  Add Fragrances
                  {comparisonList.length === 3 && (
                    <span className="text-xs text-gold-600 font-medium">
                      (3/3 Selected)
                    </span>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10 p-2 space-y-3">
                {comparisonList.length === 3 ? (
                  <div className="text-center py-6">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-black-800 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Scale className="w-6 h-6 text-gold-600" />
                      </div>
                      <p className="text-sm font-semibold text-gold-300 mb-2">
                        Comparison Complete!
                      </p>
                      <p className="text-xs text-gold-300 mb-1">
                        You're comparing 3 fragrances - the maximum allowed.
                      </p>
                      <p className="text-xs text-gray-500">
                        Remove a fragrance above to add a different one.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearComparison}
                      className="border-gold-400 text-gold-300 hover:bg-black-800 hover:text-white text-xs"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Start Over
                    </Button>
                  </div>
                ) : (
                  <>
                    <CompactFilters
                      filters={filters}
                      onFiltersChange={setFilters}
                      onReset={resetFilters}
                      resultCount={filteredAndSortedPerfumes.length}
                    />

                    <div className="flex items-center justify-end">
                      <SortSelect value={sortBy} onChange={setSortBy} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {filteredAndSortedPerfumes.length === 0 ? (
                        <div className="col-span-full text-center py-4">
                          <p className="text-xs text-gold-300">No matches</p>
                        </div>
                      ) : (
                        filteredAndSortedPerfumes.map((perfume) => (
                          <div key={perfume.id} className="relative">
                            <CompactPerfumeCard
                              perfume={perfume}
                              onClick={(e) => {
                                if (comparisonList.length < 3) {
                                  addToComparison(perfume);
                                } else {
                                  handlePerfumeClick(perfume, e);
                                }
                              }}
                            />
                          </div>
                        ))
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Perfume Detail Modal */}
      <PerfumeDetail
        perfume={selectedPerfume}
        open={isDetailOpen}
        onOpenChange={(open) => {
          if (!open) setDetailAnchorY(null);
          setIsDetailOpen(open);
        }}
        onCompare={addToComparison}
        isInComparison={
          selectedPerfume
            ? comparisonList.some((p) => p.id === selectedPerfume.id)
            : false
        }
        anchorY={detailAnchorY}
      />
    </div>
  );
}
