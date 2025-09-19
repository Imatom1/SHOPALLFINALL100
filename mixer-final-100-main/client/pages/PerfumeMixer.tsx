import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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
  ArrowUp,
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

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

      // Search filter (tokenized, normalized)
      if (filters.search) {
        const normalize = (s: string) =>
          s
            .toLowerCase()
            .replace(/[^\\w\\s]/g, " ")
            .replace(/\\s+/g, " ")
            .trim();

        const tokens = normalize(filters.search).split(" ").filter(Boolean);
        const searchableText = normalize(
          [
            perfume.id,
            perfume.name,
            perfume.brand,
            perfume.originalBrand,
            perfume.fragranceProfile,
            ...perfume.mainAccords,
            ...perfume.topNotes,
            ...perfume.middleNotes,
            ...perfume.baseNotes,
          ].join(" "),
        );

        // require all tokens to be present (AND search)
        const words = searchableText.split(' ');
        const allPresent = tokens.every((t) => searchableText.includes(t) || words.some((w) => w.startsWith(t)));
        if (!allPresent) return false;
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

  const getActiveFilterCount = () => {
    return [
      filters.gender,
      filters.season,
      filters.bestTime,
      filters.mainAccord,
    ].filter((f) => f !== "").length;
  };

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

  const scrollToTop = () => {
    try {
      if (typeof window !== "undefined" && window.scrollTo) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (e) {
      // ignore
    }

    try {
      // Also attempt to scroll documentElement and body for different layouts
      if (document.documentElement && (document.documentElement as any).scrollTo) {
        (document.documentElement as any).scrollTo({ top: 0, behavior: "smooth" });
      }
      if (document.body && (document.body as any).scrollTo) {
        (document.body as any).scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (e) {
      // ignore
    }

    try {
      const appRoot = document.querySelector("#root") as HTMLElement | null;
      if (appRoot && appRoot.scrollTo) {
        appRoot.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-800 via-black-800 to-black-800 flex flex-col">
      <Header />

      {/* Page Header */}
      <div
        className="bg-gradient-to-r from-black-800 via-black-700 to-black-600 py-2 relative overflow-hidden flex-shrink-0
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-200%] before:animate-shimmer before:transition-transform"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-3 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Beaker className="w-4 h-4 text-gold-700" />
              <h1 className="text-sm sm:text-base font-bold bg-gradient-to-r from-gold-800 via-gold-700 to-gold-600 bg-clip-text text-transparent">
                Perfume Mixer
              </h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="border-gold-400 text-gold-300 hover:bg-black-800 hover:text-white text-xs h-6 px-2"
            >
              <ArrowLeft className="w-3 h-3 mr-1" />
              Back
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-1 sm:px-2 md:px-3 py-1 sm:py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-2 md:min-h-[calc(100vh-8rem)] items-stretch">
          {/* Left Panel - Mixer */}
          <div className="flex flex-col md:min-h-[500px] mb-4">
            <Card className="bg-gradient-to-br from-black-800 via-black-800 to-black-700 border border-gold-400 shadow-lg flex flex-col">
              <CardHeader className="p-1.5 sm:p-2 flex-shrink-0">
                <CardTitle className="text-sm sm:text-base font-bold text-gold-300 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Beaker className="w-4 h-4 text-gold-700" />
                    Create Your Blend
                  </span>
                  {ingredients.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearMixer}
                      className="border-red-300 text-red-600 hover:bg-red-800 text-xs h-5 sm:h-6 px-1 sm:px-2"
                    >
                      <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 sm:mr-1" />
                      <span className="hidden sm:inline">Clear</span>
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-1.5 sm:p-2 overflow-y-auto">
                {/* Ingredients List */}
                <div className="space-y-1">
                  {ingredients.length === 0 ? (
                    <div className="text-center py-4">
                      <Beaker className="w-8 h-8 text-gold-400 mx-auto mb-1" />
                      <p className="text-xs text-gold-300">
                        Start by adding perfumes to your mix
                      </p>
                    </div>
                  ) : (
                    ingredients.map((ingredient) => (
                      <Card
                        key={ingredient.id}
                        className="border-black-700 bg-black-800"
                      >
                        <CardContent className="p-1.5">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold text-gold-300 truncate">
                                  {ingredient.perfume.name}
                                </h4>
                                <p className="text-xs text-gold-600">
                                  {ingredient.perfume.brand}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-xs font-bold text-gold-300 min-w-[2.5rem] text-right">
                                  {roundPercentage(ingredient.percentage)}%
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    removeIngredient(ingredient.id)
                                  }
                                  className="border-red-300 text-red-600 hover:bg-red-800 h-5 w-5 p-0"
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
                            <div className="flex items-center justify-between text-xs text-gold-300">
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
                                    className="text-xs border-black-700 text-gold-300 px-1 py-0"
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

                  {/* Result Preview */}
                  {resultProfile && (
                    <Card className="mt-1.5 border-2 border-gold-400 bg-gradient-to-br from-black-800 to-black-800">
                      <CardHeader className="p-1.5">
                        <CardTitle className="text-xs font-bold text-gold-300 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-gold-700" />
                          Predicted Result
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-1.5 space-y-1">
                        <div>
                          <p className="text-xs font-medium text-gold-400 mb-0.5">
                            Main Accords:
                          </p>
                          <div className="flex flex-wrap gap-0.5">
                            {resultProfile.accords.map((accord) => (
                              <Badge
                                key={accord}
                                className="bg-gold-600 text-black-800 text-xs px-1 py-0"
                              >
                                {accord}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gold-400 mb-0.5">
                            Best Seasons:
                          </p>
                          <div className="flex flex-wrap gap-0.5">
                            {resultProfile.seasons.map((season) => (
                              <Badge
                                key={season}
                                variant="outline"
                                className="border-gold-300 text-gold-300 text-xs px-1 py-0"
                              >
                                {season}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Droplets className="w-3 h-3 text-gold-500" />
                          <span className="text-xs font-medium text-gold-400">
                            Sillage:
                          </span>
                          <span className="text-xs text-gold-300">
                            {resultProfile.sillage}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Blend Actions */}
                  {ingredients.length > 0 && (
                    <div className="mt-1.5 space-y-1">
                      {/* Blend Request Text */}
                      <div className="bg-gradient-to-br from-black-900 to-black-800 border border-gold-400 rounded-lg p-3">
                        <p className="text-base sm:text-lg font-semibold text-gold-200 mb-1">
                          Your Blend Request
                        </p>
                        <div
                          role="textbox"
                          aria-label="Blend request text"
                          tabIndex={0}
                          className="bg-black-800 border border-black-700 rounded p-3 text-sm sm:text-base text-gold-100 leading-relaxed whitespace-pre-wrap break-words"
                        >
                          {`Blend: ${ingredients.map((ing) => `${ing.perfume.brand} ${ing.perfume.name} ${roundPercentage(ing.percentage)}%`).join(", ")}`}
                        </div>
                      </div>

                      {/* Copy Formula Button */}
                      <Button
                        onClick={() => {
                          const formulaText = `Blend: ${ingredients.map((ing) => `${ing.perfume.brand} ${ing.perfume.name} ${roundPercentage(ing.percentage)}%`).join(", ")}`;
                          navigator.clipboard
                            .writeText(formulaText)
                            .then(() => {
                              alert("Formula copied to clipboard!");
                            })
                            .catch(() => {
                              // Fallback for browsers that don't support clipboard API
                              const textArea =
                                document.createElement("textarea");
                              textArea.value = formulaText;
                              document.body.appendChild(textArea);
                              textArea.select();
                              document.execCommand("copy");
                              document.body.removeChild(textArea);
                              alert("Formula copied to clipboard!");
                            });
                        }}
                        variant="outline"
                        className="w-full border-gold-400 text-gold-300 hover:bg-black-800 hover:text-white font-semibold text-lg h-10"
                        aria-label="Copy blend request"
                      >
                        <Copy className="w-5 h-5 mr-2" />
                        Copy Blend Request
                      </Button>

                      {/* Instructions */}
                      <div className="bg-black-900 border border-gold-300 rounded-lg p-4 mt-3">
                        <p className="text-lg sm:text-xl font-semibold text-gold-200 mb-3 text-center">
                          How to Use Your Blend Request
                        </p>
                        <ol className="text-sm sm:text-base text-gold-200 space-y-2 list-decimal list-inside max-w-xl mx-auto">
                          <li>Click <strong>Copy Blend Request</strong> to copy the blend text.</li>
                          <li>Paste it into the perfume request form or include it in an email.</li>
                          <li>Add your phone number and any special instructions (concentration, bottle size).</li>
                          <li>Our team will reply with availability and pricing within 48 hours.</li>
                        </ol>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Perfume Browser */}
          <div className="flex flex-col md:min-h-[500px]">
            <Card className="bg-gradient-to-br from-black-800 via-black-700 to-black-600 border border-gold-400 shadow-lg flex flex-col">
              <CardHeader className="p-2 sm:p-3 flex-shrink-0">
                <CardTitle className="text-sm font-bold text-gold-300 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-gold-700" />
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
                      className="pl-10 text-sm h-10 border-gold-300 focus:border-gold-500 bg-black-800"
                    />
                  </div>

                  {/* Nested Filter Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between text-xs h-7 border-gold-300 bg-black-800 hover:bg-black-800"
                      >
                        <span className="flex items-center gap-1">
                          <Filter className="w-3 h-3" />
                          {getActiveFilterCount() > 0
                            ? `Filters (${getActiveFilterCount()})`
                            : "Filter by..."}
                        </span>
                        <Plus className="w-3 h-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-72 p-4" align="start">
                      <div className="space-y-4">
                        {/* Gender Dropdown */}
                        <div>
                          <DropdownMenuLabel className="text-sm font-semibold text-gold-700 px-0 pb-2">
                            Gender
                          </DropdownMenuLabel>
                          <Select
                            value={filters.gender || "all"}
                            onValueChange={(value) =>
                              updateFilter(
                                "gender",
                                value === "all" ? "" : value,
                              )
                            }
                          >
                            <SelectTrigger className="w-full text-sm h-9 border-gold-300 bg-black-800">
                              <SelectValue placeholder="Select gender..." />
                            </SelectTrigger>
                            <SelectContent className="min-w-[200px]">
                              <SelectItem value="all">All genders</SelectItem>
                              {genders.map((gender) => (
                                <SelectItem key={gender} value={gender}>
                                  {gender}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <DropdownMenuSeparator />

                        {/* Season Dropdown */}
                        <div>
                          <DropdownMenuLabel className="text-sm font-semibold text-gold-700 px-0 pb-2">
                            Season
                          </DropdownMenuLabel>
                          <Select
                            value={filters.season || "all"}
                            onValueChange={(value) =>
                              updateFilter(
                                "season",
                                value === "all" ? "" : value,
                              )
                            }
                          >
                            <SelectTrigger className="w-full text-sm h-9 border-gold-300 bg-black-800">
                              <SelectValue placeholder="Select season..." />
                            </SelectTrigger>
                            <SelectContent className="min-w-[200px]">
                              <SelectItem value="all">All seasons</SelectItem>
                              {seasons.map((season) => (
                                <SelectItem key={season} value={season}>
                                  {season}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <DropdownMenuSeparator />

                        {/* Best Time Dropdown */}
                        <div>
                          <DropdownMenuLabel className="text-sm font-semibold text-gold-700 px-0 pb-2">
                            Best Time
                          </DropdownMenuLabel>
                          <Select
                            value={filters.bestTime || "all"}
                            onValueChange={(value) =>
                              updateFilter(
                                "bestTime",
                                value === "all" ? "" : value,
                              )
                            }
                          >
                            <SelectTrigger className="w-full text-sm h-9 border-gold-300 bg-black-800">
                              <SelectValue placeholder="Select time..." />
                            </SelectTrigger>
                            <SelectContent className="min-w-[200px]">
                              <SelectItem value="all">Any time</SelectItem>
                              {times.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <DropdownMenuSeparator />

                        {/* Scent Profile Dropdown */}
                        <div>
                          <DropdownMenuLabel className="text-sm font-semibold text-gold-700 px-0 pb-2">
                            Scent Profile
                          </DropdownMenuLabel>
                          <Select
                            value={filters.mainAccord || "all"}
                            onValueChange={(value) =>
                              updateFilter(
                                "mainAccord",
                                value === "all" ? "" : value,
                              )
                            }
                          >
                            <SelectTrigger className="w-full text-sm h-9 border-gold-300 bg-black-800">
                              <SelectValue placeholder="Select scent..." />
                            </SelectTrigger>
                            <SelectContent className="min-w-[200px]">
                              <SelectItem value="all">All scents</SelectItem>
                              {generalAccords.map((accord) => (
                                <SelectItem key={accord} value={accord}>
                                  {accord}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {hasActiveFilters && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Button
                                variant="outline"
                                onClick={resetFilters}
                                className="w-full border-gold-400 text-gold-300 hover:bg-black-800 hover:text-white text-sm h-8"
                              >
                                <X className="w-4 h-4 mr-2" />
                                Clear All Filters
                              </Button>
                            </DropdownMenuItem>
                          </>
                        )}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetFilters}
                      className="w-full border-gold-400 text-gold-300 hover:bg-black-800 hover:text-white text-xs h-6"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Clear Filters
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-2 sm:p-3">
                {!canAddMore ? (
                  <div className="text-center py-8">
                    <Crown className="w-12 h-12 text-gold-400 mx-auto mb-2" />
                    <p className="text-sm text-gold-300 font-semibold">
                      Maximum 3 fragrances reached
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Remove a fragrance to add more
                    </p>
                  </div>
                ) : filteredAndSortedPerfumes.length === 0 ? (
                  <div className="text-center py-8">
                    <Crown className="w-12 h-12 text-gold-400 mx-auto mb-2" />
                    <p className="text-sm text-gold-300">
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
                            scrollToTop();
                          }}

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
      {showScrollTop && (
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-4 right-4 z-50 border-gold-400 text-gold-300 bg-black-800 hover:bg-black-700"
          variant="outline"
          size="sm"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 mr-1" />
          Top
        </Button>
      )}
    </div>
  );
}
