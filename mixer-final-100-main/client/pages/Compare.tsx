import { useState, useEffect } from "react";
import type React from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Scale, X, Plus, Crown, Search, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { perfumes, Perfume } from "../data/perfumes";
import { CompactPerfumeCard } from "../components/CompactPerfumeCard";
import { PerfumeDetail } from "../components/PerfumeDetail";
import { ComparisonCards } from "../components/ComparisonCards";
import { Header } from "../components/Header";

export default function Compare() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [comparisonList, setComparisonList] = useState<Perfume[]>([]);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailAnchorY, setDetailAnchorY] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("");
  const [accordFilter, setAccordFilter] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

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

  // Filter perfumes based on search query and mini filters (excluding already compared ones)
  const availablePerfumes = perfumes
    .filter((p) => !comparisonList.find((cp) => cp.id === p.id))
    .filter((p) => {
      // Search filter
      if (searchQuery) {
        const searchTerm = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(searchTerm) ||
          p.brand.toLowerCase().includes(searchTerm) ||
          p.originalBrand.toLowerCase().includes(searchTerm) ||
          p.fragranceProfile.toLowerCase().includes(searchTerm) ||
          p.mainAccords.some((accord) =>
            accord.toLowerCase().includes(searchTerm),
          );
        if (!matches) return false;
      }

      // Gender filter - include unisex in both men and women searches
      if (genderFilter) {
        if (
          genderFilter === "Men" &&
          p.gender !== "Men" &&
          p.gender !== "Unisex"
        )
          return false;
        if (
          genderFilter === "Women" &&
          p.gender !== "Women" &&
          p.gender !== "Unisex"
        )
          return false;
        if (genderFilter === "Unisex" && p.gender !== "Unisex") return false;
      }

      // Season filter
      if (seasonFilter && !p.mainSeasons.includes(seasonFilter)) return false;

      // Accord filter
      if (accordFilter) {
        const hasMatchingAccord = p.mainAccords.some(
          (accord) =>
            accord.toLowerCase().includes(accordFilter.toLowerCase()) ||
            accordFilter.toLowerCase().includes(accord.toLowerCase()),
        );
        if (!hasMatchingAccord) return false;
      }

      return true;
    });

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
                  <Plus className="w-4 h-4 text-gold-700" />
                  Add Fragrances
                  {comparisonList.length === 3 && (
                    <span className="text-xs text-gold-600 font-medium">
                      (3/3 Selected)
                    </span>
                  )}
                </CardTitle>

                {/* Search */}
                <div className="relative mb-2">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-7 border-gold-300 focus:border-gold-500 bg-black-800 text-xs h-7"
                  />
                </div>

                {/* Mini Filters */}
                <div className="space-y-2">
                  <div className="grid grid-cols-3 lg:grid-cols-1 gap-1">
                    {/* Gender Filter */}
                    <Select
                      value={genderFilter || "all"}
                      onValueChange={(value) =>
                        setGenderFilter(value === "all" ? "" : value)
                      }
                    >
                      <SelectTrigger className="border-gold-300 focus:border-gold-500 bg-black-800 text-xs h-7">
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All genders</SelectItem>
                        <SelectItem value="Women">Women</SelectItem>
                        <SelectItem value="Men">Men</SelectItem>
                        <SelectItem value="Unisex">Unisex</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Season Filter */}
                    <Select
                      value={seasonFilter || "all"}
                      onValueChange={(value) =>
                        setSeasonFilter(value === "all" ? "" : value)
                      }
                    >
                      <SelectTrigger className="border-gold-300 focus:border-gold-500 bg-black-800 text-xs h-7">
                        <SelectValue placeholder="Season" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All seasons</SelectItem>
                        <SelectItem value="Spring">Spring</SelectItem>
                        <SelectItem value="Summer">Summer</SelectItem>
                        <SelectItem value="Fall">Fall</SelectItem>
                        <SelectItem value="Winter">Winter</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Accord Filter */}
                    <Select
                      value={accordFilter || "all"}
                      onValueChange={(value) =>
                        setAccordFilter(value === "all" ? "" : value)
                      }
                    >
                      <SelectTrigger className="border-gold-300 focus:border-gold-500 bg-black-800 text-xs h-7">
                        <SelectValue placeholder="Scent Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All scents</SelectItem>
                        <SelectItem value="Fresh">Fresh</SelectItem>
                        <SelectItem value="Floral">Floral</SelectItem>
                        <SelectItem value="Fruity">Fruity</SelectItem>
                        <SelectItem value="Sweet">Sweet</SelectItem>
                        <SelectItem value="Woody">Woody</SelectItem>
                        <SelectItem value="Spicy">Spicy</SelectItem>
                        <SelectItem value="Oriental">Oriental</SelectItem>
                        <SelectItem value="Citrus">Citrus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters Button */}
                  {(genderFilter ||
                    seasonFilter ||
                    accordFilter ||
                    searchQuery) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("");
                        setGenderFilter("");
                        setSeasonFilter("");
                        setAccordFilter("");
                      }}
                      className="w-full border-gold-400 text-gold-300 hover:bg-black-800 hover:text-white text-xs h-6"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="relative z-10 p-2">
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
                  <div className="space-y-1">
                    {availablePerfumes.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-xs text-gold-300">
                          {searchQuery ? "No matches" : "All selected"}
                        </p>
                      </div>
                    ) : (
                      availablePerfumes.map((perfume) => (
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
