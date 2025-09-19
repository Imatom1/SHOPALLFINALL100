import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Beaker,
  Trash2,
  Droplets,
  Sparkles,
  Crown,
  ArrowLeft,
  Plus,
  Minus,
  Search,
  Filter,
  X,
  Calendar,
  Copy,
  Store,
} from "lucide-react";
import { Header } from "../components/Header";
import { CompactPerfumeCard } from "../components/CompactPerfumeCard";
import { SortSelect, SortOption } from "../components/SortSelect";
import { perfumes, Perfume, seasons, genders, times } from "../data/perfumes";

interface MixerIngredient {
  perfume: Perfume;
  percentage: number;
  id: string;
}

interface FragranceFilters {
  search: string;
  gender: string;
  season: string;
  bestTime: string;
  mainAccord: string;
}

export default function PerfumeMixer() {
  const navigate = useNavigate();
  const [mixerName, setMixerName] = useState("");
  const [ingredients, setIngredients] = useState<MixerIngredient[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [filters, setFilters] = useState<FragranceFilters>({
    search: "",
    gender: "",
    season: "",
    bestTime: "",
    mainAccord: "",
  });

  const roundPercentage = (num: number) => Math.round(num * 100) / 100;

  const totalPercentage = roundPercentage(
    ingredients.reduce((sum, ing) => sum + ing.percentage, 0),
  );
  const isValidMix =
    Math.abs(totalPercentage - 100) < 0.01 && ingredients.length >= 2;
  const canAddMore = ingredients.length < 3;

  // More general accord categories
  const generalAccords = [
    "Fresh",
    "Floral",
    "Fruity",
    "Sweet",
    "Woody",
    "Spicy",
    "Oriental",
    "Citrus",
    "Green",
    "Powdery",
  ].sort();

  const updatePercentage = (id: string, newPercentage: number) => {
    // Round the new percentage
    newPercentage = roundPercentage(newPercentage);

    if (ingredients.length === 1) {
      // If only one ingredient, set it to 100%
      setIngredients([{ ...ingredients[0], percentage: 100 }]);
      return;
    }

    const otherIngredients = ingredients.filter((ing) => ing.id !== id);
    const remainingPercentage = 100 - newPercentage;

    if (remainingPercentage <= 0) {
      // If new percentage is 100% or more, set this to 100% and others to 0
      const finalIngredients = ingredients.map((ing) =>
        ing.id === id ? { ...ing, percentage: 100 } : { ...ing, percentage: 0 },
      );
      setIngredients(finalIngredients);
      return;
    }

    // Calculate current total of other ingredients
    const otherTotal = otherIngredients.reduce(
      (sum, ing) => sum + ing.percentage,
      0,
    );

    let finalIngredients;

    if (otherTotal > 0) {
      // Scale other ingredients proportionally to fit remaining percentage
      const scaleFactor = remainingPercentage / otherTotal;

      finalIngredients = ingredients.map((ing) => {
        if (ing.id === id) {
          return { ...ing, percentage: newPercentage };
        } else {
          return {
            ...ing,
            percentage: roundPercentage(ing.percentage * scaleFactor),
          };
        }
      });
    } else {
      // If other ingredients are all 0, distribute remaining percentage equally
      const equalShare = roundPercentage(
        remainingPercentage / otherIngredients.length,
      );

      finalIngredients = ingredients.map((ing) => {
        if (ing.id === id) {
          return { ...ing, percentage: newPercentage };
        } else {
          return { ...ing, percentage: equalShare };
        }
      });
    }

    // Ensure total is exactly 100% by adjusting the last other ingredient
    let currentTotal = finalIngredients.reduce(
      (sum, ing) => sum + ing.percentage,
      0,
    );
    currentTotal = roundPercentage(currentTotal);

    if (currentTotal !== 100) {
      const adjustment = roundPercentage(100 - currentTotal);
      const lastOtherIngredient = finalIngredients.find((ing) => ing.id !== id);
      if (lastOtherIngredient) {
        lastOtherIngredient.percentage = Math.max(
          0,
          roundPercentage(lastOtherIngredient.percentage + adjustment),
        );
      }
    }

    setIngredients(finalIngredients);
  };

  const removeIngredient = (id: string) => {
    const remainingIngredients = ingredients.filter((ing) => ing.id !== id);

    if (remainingIngredients.length === 0) {
      setIngredients([]);
      return;
    }

    // Redistribute percentages equally among remaining ingredients to total 100%
    const equalShare = roundPercentage(100 / remainingIngredients.length);
    const balancedIngredients = remainingIngredients.map((ing, index) => {
      if (index === remainingIngredients.length - 1) {
        // Last ingredient gets remainder to ensure exactly 100%
        const remainder = 100 - equalShare * (remainingIngredients.length - 1);
        return { ...ing, percentage: roundPercentage(remainder) };
      } else {
        return { ...ing, percentage: equalShare };
      }
    });

    setIngredients(balancedIngredients);
  };

  const updateFilter = (key: keyof FragranceFilters, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      gender: "",
      season: "",
      bestTime: "",
      mainAccord: "",
    });
  };

  const clearMixer = () => {
    setIngredients([]);
    setMixerName("");
  };

  const filteredAndSortedPerfumes = useMemo(() => {
    const filtered = perfumes.filter((perfume) => {
      // Don't show perfumes already in the mixer
      if (ingredients.find((ing) => ing.perfume.id === perfume.id))
        return false;

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchableText = [
          perfume.name,
          perfume.brand,
          perfume.fragranceProfile,
          ...perfume.mainAccords,
          ...perfume.topNotes,
          ...perfume.middleNotes,
          ...perfume.baseNotes,
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(searchTerm)) return false;
      }

      // Gender filter - include unisex in both men and women searches
      if (filters.gender) {
        if (
          filters.gender === "Men" &&
          perfume.gender !== "Men" &&
          perfume.gender !== "Unisex"
        )
          return false;
        if (
          filters.gender === "Women" &&
          perfume.gender !== "Women" &&
          perfume.gender !== "Unisex"
        )
          return false;
        if (filters.gender === "Unisex" && perfume.gender !== "Unisex")
          return false;
      }

      // Main accord filter
      if (filters.mainAccord) {
        const hasMatchingAccord = perfume.mainAccords.some(
          (accord) =>
            accord.toLowerCase().includes(filters.mainAccord.toLowerCase()) ||
            filters.mainAccord.toLowerCase().includes(accord.toLowerCase()),
        );
        if (!hasMatchingAccord) return false;
      }

      // Season filter
      if (filters.season && !perfume.mainSeasons.includes(filters.season))
        return false;

      // Best time filter
      if (filters.bestTime && perfume.bestTime !== filters.bestTime)
        return false;

      return true;
    });

    // Sort the filtered results
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "brand":
          return a.brand.localeCompare(b.brand);
        case "gender":
          const genderOrder = { Women: 1, Men: 2, Unisex: 3 };
          return (
            (genderOrder[a.gender as keyof typeof genderOrder] || 0) -
            (genderOrder[b.gender as keyof typeof genderOrder] || 0)
          );
        case "popularity":
          const aPopularity =
            a.mainAccords.length +
            a.topNotes.length +
            a.middleNotes.length +
            a.baseNotes.length;
          const bPopularity =
            b.mainAccords.length +
            b.topNotes.length +
            b.middleNotes.length +
            b.baseNotes.length;
          return bPopularity - aPopularity;
        case "sillage":
          const sillageOrder = {
            Light: 1,
            "Light to Moderate": 2,
            Moderate: 3,
            "Moderate to Strong": 4,
            Strong: 5,
            "Very Strong": 6,
          };
          return (
            (sillageOrder[b.sillage as keyof typeof sillageOrder] || 0) -
            (sillageOrder[a.sillage as keyof typeof sillageOrder] || 0)
          );
        default:
          return 0;
      }
    });

    return sorted;
  }, [filters, sortBy, ingredients]);

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  const getResultingProfile = () => {
    if (ingredients.length === 0) return null;

    const accordWeights: { [key: string]: number } = {};
    const seasonWeights: { [key: string]: number } = {};
    let avgSillage = 0;

    ingredients.forEach((ing) => {
      const weight = ing.percentage / 100;

      // Calculate accord weights
      ing.perfume.mainAccords.forEach((accord) => {
        accordWeights[accord] = (accordWeights[accord] || 0) + weight;
      });

      // Calculate season weights
      ing.perfume.mainSeasons.forEach((season) => {
        seasonWeights[season] = (seasonWeights[season] || 0) + weight;
      });

      // Calculate sillage (simplified)
      const sillageValues = {
        Light: 1,
        "Light to Moderate": 2,
        Moderate: 3,
        "Moderate to Strong": 4,
        Strong: 5,
        "Very Strong": 6,
      };
      avgSillage +=
        (sillageValues[ing.perfume.sillage as keyof typeof sillageValues] ||
          3) * weight;
    });

    const topAccords = Object.entries(accordWeights)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([accord]) => accord);

    const topSeasons = Object.entries(seasonWeights)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([season]) => season);

    const sillageLevel = Math.round(avgSillage);
    const resultingSillage =
      Object.keys({
        Light: 1,
        "Light to Moderate": 2,
        Moderate: 3,
        "Moderate to Strong": 4,
        Strong: 5,
        "Very Strong": 6,
      }).find((key, index) => index + 1 === sillageLevel) || "Moderate";

    return {
      accords: topAccords,
      seasons: topSeasons,
      sillage: resultingSillage,
    };
  };

  const resultProfile = getResultingProfile();

  return (
    <div className="h-screen bg-gradient-to-br from-copper-50 via-cream-50 to-copper-100 flex flex-col overflow-hidden">
      <Header />

      {/* Page Header */}
      <div
        className="bg-gradient-to-r from-copper-100 via-copper-200 to-copper-300 py-2 relative overflow-hidden flex-shrink-0
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-200%] before:animate-shimmer before:transition-transform"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-3 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Beaker className="w-4 h-4 text-copper-700" />
              <h1 className="text-sm sm:text-base font-bold bg-gradient-to-r from-copper-800 via-copper-700 to-copper-600 bg-clip-text text-transparent">
                Perfume Mixer
              </h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="border-copper-400 text-copper-800 hover:bg-copper-100 text-xs h-6 px-2"
            >
              <ArrowLeft className="w-3 h-3 mr-1" />
              Back
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-2 sm:px-3 py-2 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 h-full">
          {/* Left Panel - Mixer */}
          <div className="lg:col-span-2 flex flex-col overflow-hidden">
            <Card className="bg-gradient-to-br from-copper-50 via-copper-100 to-copper-200 border border-copper-400 shadow-lg flex-1 flex flex-col overflow-hidden">
              <CardHeader className="p-1.5 sm:p-2 flex-shrink-0">
                <CardTitle className="text-sm sm:text-base font-bold text-gray-900 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Beaker className="w-4 h-4 text-copper-700" />
                    Create Your Blend
                  </span>
                  {ingredients.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearMixer}
                      className="border-red-300 text-red-600 hover:bg-red-50 text-xs h-6 px-2"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Clear
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-1.5 sm:p-2 flex-1 overflow-hidden min-h-0">
                {/* Ingredients List */}
                <div className="space-y-1">
                  {ingredients.length === 0 ? (
                    <div className="text-center py-4">
                      <Beaker className="w-8 h-8 text-copper-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">
                        Start by adding perfumes to your mix
                      </p>
                    </div>
                  ) : (
                    ingredients.map((ingredient) => (
                      <Card
                        key={ingredient.id}
                        className="border-copper-200 bg-white/80"
                      >
                        <CardContent className="p-1.5">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold text-gray-900 truncate">
                                  {ingredient.perfume.name}
                                </h4>
                                <p className="text-xs text-copper-600">
                                  {ingredient.perfume.brand}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-xs font-bold text-copper-800 min-w-[2.5rem] text-right">
                                  {roundPercentage(ingredient.percentage)}%
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    removeIngredient(ingredient.id)
                                  }
                                  className="border-red-300 text-red-600 hover:bg-red-50 h-5 w-5 p-0"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>

                            <Slider
                              value={[ingredient.percentage]}
                              onValueChange={([value]) =>
                                updatePercentage(ingredient.id, value)
                              }
                              max={100}
                              step={1}
                              className="w-full"
                            />

                            {/* Key attributes */}
                            <div className="flex items-center justify-between text-xs text-gray-600">
                              <span className="flex items-center gap-1">
                                <Droplets className="w-3 h-3" />
                                {ingredient.perfume.sillage}
                              </span>
                              <span>{ingredient.perfume.gender}</span>
                              <span>{ingredient.perfume.bestTime}</span>
                            </div>

                            <div className="flex flex-wrap gap-0.5">
                              {ingredient.perfume.mainAccords
                                .slice(0, 3)
                                .map((accord) => (
                                  <Badge
                                    key={accord}
                                    variant="outline"
                                    className="text-xs border-copper-200 text-copper-700 px-1 py-0"
                                  >
                                    {accord}
                                  </Badge>
                                ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>

                {/* Result Preview */}
                {resultProfile && (
                  <Card className="mt-1.5 border-2 border-copper-400 bg-gradient-to-br from-copper-50 to-copper-100">
                    <CardHeader className="p-1.5">
                      <CardTitle className="text-xs font-bold text-gray-900 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-copper-700" />
                        Predicted Result
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-1.5 space-y-1">
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-0.5">
                          Main Accords:
                        </p>
                        <div className="flex flex-wrap gap-0.5">
                          {resultProfile.accords.map((accord) => (
                            <Badge
                              key={accord}
                              className="bg-copper-600 text-white text-xs px-1 py-0"
                            >
                              {accord}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-0.5">
                          Best Seasons:
                        </p>
                        <div className="flex flex-wrap gap-0.5">
                          {resultProfile.seasons.map((season) => (
                            <Badge
                              key={season}
                              variant="outline"
                              className="border-copper-300 text-copper-800 text-xs px-1 py-0"
                            >
                              {season}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Droplets className="w-3 h-3 text-copper-500" />
                        <span className="text-xs font-medium text-gray-700">
                          Sillage:
                        </span>
                        <span className="text-xs text-gray-600">
                          {resultProfile.sillage}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Conflict Guide Warning */}
                {(() => {
                  if (ingredients.length < 2) return null;

                  let maxConflictPoints = 0;
                  const conflicts = [];
                  let conflictingPair = null;

                  // Calculate conflict points between all pairs
                  for (let i = 0; i < ingredients.length; i++) {
                    for (let j = i + 1; j < ingredients.length; j++) {
                      const perfume1 = ingredients[i].perfume;
                      const perfume2 = ingredients[j].perfume;

                      // Time conflicts (0-3 points)
                      const timeConflict =
                        perfume1.bestTime !== perfume2.bestTime ? 2 : 0;

                      // Season conflicts (0-3 points)
                      const seasons1 = perfume1.mainSeasons.map((s) =>
                        s.toLowerCase(),
                      );
                      const seasons2 = perfume2.mainSeasons.map((s) =>
                        s.toLowerCase(),
                      );
                      const sharedSeasons = seasons1.filter((s) =>
                        seasons2.includes(s),
                      );
                      let seasonConflict = 0;
                      if (sharedSeasons.length === 0) {
                        // Complete season mismatch
                        seasonConflict = 3;
                      } else if (sharedSeasons.length === 1) {
                        // Partial mismatch
                        seasonConflict = 1;
                      }

                      // Sillage conflicts (0-3 points)
                      const sillageOrder = {
                        Light: 1,
                        "Light to Moderate": 2,
                        Moderate: 3,
                        "Moderate to Strong": 4,
                        Strong: 5,
                        "Very Strong": 6,
                      };
                      const sillage1 = sillageOrder[perfume1.sillage] || 3;
                      const sillage2 = sillageOrder[perfume2.sillage] || 3;
                      const sillageDiff = Math.abs(sillage1 - sillage2);
                      let sillageConflict = 0;
                      if (sillageDiff >= 4) sillageConflict = 3;
                      else if (sillageDiff >= 2) sillageConflict = 2;
                      else if (sillageDiff >= 1) sillageConflict = 1;

                      // Gender conflicts (0-2 points)
                      let genderConflict = 0;
                      if (
                        (perfume1.gender === "Men" &&
                          perfume2.gender === "Women") ||
                        (perfume1.gender === "Women" &&
                          perfume2.gender === "Men")
                      ) {
                        genderConflict = 2;
                      }

                      // Accord conflicts (0-1 points each)
                      const accords1 = perfume1.mainAccords.map((a) =>
                        a.toLowerCase(),
                      );
                      const accords2 = perfume2.mainAccords.map((a) =>
                        a.toLowerCase(),
                      );
                      const sharedAccords = accords1.filter((a) =>
                        accords2.includes(a),
                      );
                      let accordConflict = 0;

                      // Check for specific conflicting accord combinations
                      const conflictingPairs = [
                        ["fresh", "oriental"],
                        ["citrus", "woody"],
                        ["floral", "spicy"],
                        ["fruity", "leather"],
                        ["green", "gourmand"],
                      ];

                      for (const [accord1, accord2] of conflictingPairs) {
                        if (
                          (accords1.includes(accord1) &&
                            accords2.includes(accord2)) ||
                          (accords1.includes(accord2) &&
                            accords2.includes(accord1))
                        ) {
                          accordConflict += 1;
                        }
                      }

                      const pairConflictPoints =
                        timeConflict +
                        seasonConflict +
                        sillageConflict +
                        genderConflict +
                        accordConflict;

                      // Track the highest conflict pair
                      if (pairConflictPoints > maxConflictPoints) {
                        maxConflictPoints = pairConflictPoints;
                        conflictingPair = `${perfume1.name} & ${perfume2.name}`;
                      }

                      if (pairConflictPoints > 0) {
                        conflicts.push(
                          `${perfume1.name} & ${perfume2.name}: ${pairConflictPoints} pts`,
                        );
                      }
                    }
                  }

                  // Only show warning if any single pair has 7+ conflict points
                  if (maxConflictPoints >= 7) {
                    return (
                      <div className="mt-1.5 p-1.5 bg-red-50 border border-red-200 rounded">
                        <div className="flex items-center gap-1.5 text-red-800">
                          <span className="text-sm">⚠️</span>
                          <span className="text-xs font-bold">
                            Conflicting Scents Warning
                          </span>
                        </div>
                        <p className="text-xs text-red-700 mt-0.5">
                          {conflictingPair} has significant conflicts and may
                          not blend well together.
                        </p>
                        {conflicts.length > 0 && (
                          <div className="text-xs text-red-600 mt-1">
                            {conflicts.join(", ")}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                })()}

                {/* Blend Actions */}
                {ingredients.length > 0 && (
                  <div className="mt-1.5 space-y-1">
                    {/* Copy Formula Button */}
                    <Button
                      onClick={() => {
                        const formulaText = `Custom Perfume Blend Request:\n\nIngredients:\n${ingredients.map((ing) => `• ${ing.perfume.name} by ${ing.perfume.brand}: ${roundPercentage(ing.percentage)}%`).join("\n")}\n\nPlease create this custom blend for me. Thank you!`;
                        navigator.clipboard
                          .writeText(formulaText)
                          .then(() => {
                            alert("Formula copied to clipboard!");
                          })
                          .catch(() => {
                            // Fallback for browsers that don't support clipboard API
                            const textArea = document.createElement("textarea");
                            textArea.value = formulaText;
                            document.body.appendChild(textArea);
                            textArea.select();
                            document.execCommand("copy");
                            document.body.removeChild(textArea);
                            alert("Formula copied to clipboard!");
                          });
                      }}
                      variant="outline"
                      className="w-full border-copper-400 text-copper-800 hover:bg-copper-100 font-semibold text-xs h-7"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy Blend Request
                    </Button>

                    {/* Instructions */}
                    <div className="bg-copper-50 border border-copper-200 rounded-lg p-2 mt-2">
                      <p className="text-sm font-medium text-copper-800 text-center mb-1">
                        📋 How to Use Your Blend Request
                      </p>
                      <p className="text-xs text-copper-700 text-center">
                        Copy the text above, then paste it into our perfume
                        request form or contact section. Our team will review
                        your custom blend and get back to you with availability
                        and pricing.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Perfume Browser */}
          <div className="flex flex-col overflow-hidden">
            <Card className="bg-gradient-to-br from-copper-100 via-copper-200 to-copper-300 border border-copper-400 shadow-lg flex-1 flex flex-col overflow-hidden">
              <CardHeader className="p-2 sm:p-3 flex-shrink-0">
                <CardTitle className="text-sm font-bold text-gray-900 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-copper-700" />
                    Add Fragrances ({ingredients.length}/3)
                  </span>
                  <div className="flex items-center gap-1">
                    <SortSelect value={sortBy} onChange={setSortBy} />
                  </div>
                </CardTitle>

                {/* Compact Filters */}
                <div className="space-y-2">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                    <Input
                      placeholder="Search fragrances..."
                      value={filters.search}
                      onChange={(e) => updateFilter("search", e.target.value)}
                      className="pl-7 text-xs h-7 border-copper-300 focus:border-copper-500 bg-white/90"
                    />
                  </div>

                  {/* Filter Row */}
                  <div className="grid grid-cols-2 gap-1">
                    <Select
                      value={filters.gender || "all"}
                      onValueChange={(value) =>
                        updateFilter("gender", value === "all" ? "" : value)
                      }
                    >
                      <SelectTrigger className="text-xs h-6 border-copper-300 bg-white/90">
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All genders</SelectItem>
                        {genders.map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {gender}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={filters.season || "all"}
                      onValueChange={(value) =>
                        updateFilter("season", value === "all" ? "" : value)
                      }
                    >
                      <SelectTrigger className="text-xs h-6 border-copper-300 bg-white/90">
                        <SelectValue placeholder="Season" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All seasons</SelectItem>
                        {seasons.map((season) => (
                          <SelectItem key={season} value={season}>
                            {season}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-1">
                    <Select
                      value={filters.bestTime || "all"}
                      onValueChange={(value) =>
                        updateFilter("bestTime", value === "all" ? "" : value)
                      }
                    >
                      <SelectTrigger className="text-xs h-6 border-copper-300 bg-white/90">
                        <SelectValue placeholder="Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any time</SelectItem>
                        {times.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={filters.mainAccord || "all"}
                      onValueChange={(value) =>
                        updateFilter("mainAccord", value === "all" ? "" : value)
                      }
                    >
                      <SelectTrigger className="text-xs h-6 border-copper-300 bg-white/90">
                        <SelectValue placeholder="Scent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All scents</SelectItem>
                        {generalAccords.map((accord) => (
                          <SelectItem key={accord} value={accord}>
                            {accord}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetFilters}
                      className="w-full border-copper-400 text-copper-800 hover:bg-copper-100 text-xs h-6"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Clear Filters
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-2 sm:p-3 flex-1 overflow-y-auto">
                {!canAddMore ? (
                  <div className="text-center py-8">
                    <Crown className="w-12 h-12 text-copper-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 font-semibold">
                      Maximum 3 fragrances reached
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Remove a fragrance to add more
                    </p>
                  </div>
                ) : filteredAndSortedPerfumes.length === 0 ? (
                  <div className="text-center py-8">
                    <Crown className="w-12 h-12 text-copper-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {hasActiveFilters
                        ? "No fragrances match your filters"
                        : "All fragrances are in your mix"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredAndSortedPerfumes.map((perfume) => (
                      <div key={perfume.id} className="relative">
                        <CompactPerfumeCard
                          perfume={perfume}
                          onClick={() => {
                            // Quick add to mixer (max 3 perfumes)
                            if (ingredients.length >= 3) return;

                            const newIngredient: MixerIngredient = {
                              perfume,
                              percentage: 0,
                              id: Date.now().toString(),
                            };
                            const updatedIngredients = [
                              ...ingredients,
                              newIngredient,
                            ];

                            // Distribute percentages equally to total 100%
                            const equalShare = roundPercentage(
                              100 / updatedIngredients.length,
                            );
                            const balancedIngredients = updatedIngredients.map(
                              (ing, index) => {
                                if (index === updatedIngredients.length - 1) {
                                  // Last ingredient gets remainder to ensure exactly 100%
                                  const remainder =
                                    100 -
                                    equalShare *
                                      (updatedIngredients.length - 1);
                                  return {
                                    ...ing,
                                    percentage: roundPercentage(remainder),
                                  };
                                } else {
                                  return { ...ing, percentage: equalShare };
                                }
                              },
                            );

                            setIngredients(balancedIngredients);
                          }}
                          showCompareButton={false}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
