import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  ArrowLeft,
  Crown,
  Sparkles,
  Heart,
  Users,
  Star,
  Award,
} from "lucide-react";
import { Header } from "../components/Header";
import { PerfumeCard } from "../components/PerfumeCard";
import { perfumes, Perfume } from "../data/perfumes";

export default function MostPopular() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "men" | "women" | "unisex"
  >("all");

  // Calculate popularity score based on various factors
  const getPopularityScore = (perfume: Perfume): number => {
    let score = 0;

    // Base score for certain popular accords
    const popularAccords = [
      "Sweet",
      "Woody",
      "Fresh",
      "Floral",
      "Oriental",
      "Citrus",
    ];
    score +=
      perfume.mainAccords.filter((accord) =>
        popularAccords.some((popular) =>
          accord.toLowerCase().includes(popular.toLowerCase()),
        ),
      ).length * 2;

    // Score for versatility (unisex gets bonus)
    if (perfume.gender === "Unisex") score += 3;

    // Score for sillage (moderate to strong gets bonus)
    const sillageScores = {
      Light: 1,
      "Light to Moderate": 2,
      Moderate: 3,
      "Moderate to Strong": 4,
      Strong: 3, // Slightly lower as too strong might be less popular
      "Very Strong": 2,
    };
    score += sillageScores[perfume.sillage as keyof typeof sillageScores] || 0;

    // Score for seasonal versatility
    score += perfume.mainSeasons.length;

    // Bonus for certain popular notes
    const popularNotes = [
      "vanilla",
      "rose",
      "sandalwood",
      "bergamot",
      "jasmine",
    ];
    const allNotes = [
      ...perfume.topNotes,
      ...perfume.middleNotes,
      ...perfume.baseNotes,
    ].map((note) => note.toLowerCase());
    score += popularNotes.filter((note) =>
      allNotes.some((perfumeNote) => perfumeNote.includes(note)),
    ).length;

    // Bonus for well-known inspired brands
    const prestigeBrands = [
      "chanel",
      "dior",
      "tom ford",
      "creed",
      "maison francis kurkdjian",
    ];
    if (
      prestigeBrands.some((brand) =>
        perfume.originalBrand.toLowerCase().includes(brand),
      )
    ) {
      score += 3;
    }

    return score;
  };

  // Get most popular perfumes
  const popularPerfumes = useMemo(() => {
    const filtered = perfumes.filter((perfume) => {
      if (selectedCategory === "all") return true;
      if (selectedCategory === "men")
        return perfume.gender === "Men" || perfume.gender === "Unisex";
      if (selectedCategory === "women")
        return perfume.gender === "Women" || perfume.gender === "Unisex";
      if (selectedCategory === "unisex") return perfume.gender === "Unisex";
      return true;
    });

    return filtered
      .map((perfume) => ({
        ...perfume,
        popularityScore: getPopularityScore(perfume),
      }))
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, 12); // Show top 12
  }, [selectedCategory]);

  const categories = [
    { id: "all" as const, name: "All", icon: Crown },
    { id: "men" as const, name: "Men", icon: Users },
    { id: "women" as const, name: "Women", icon: Heart },
    { id: "unisex" as const, name: "Unisex", icon: Sparkles },
  ];

  const getRankIcon = (index: number) => {
    if (index === 0) return <Award className="w-5 h-5 text-yellow-500" />;
    if (index === 1) return <Award className="w-5 h-5 text-gray-400" />;
    if (index === 2) return <Award className="w-5 h-5 text-gold-600" />;
    return <Star className="w-4 h-4 text-gold-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-800 via-black-800 to-black-800">
      <Header />

      {/* Page Header */}
      <div
        className="bg-gradient-to-r from-black-800 via-black-700 to-black-600 py-6 relative overflow-hidden
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-200%] before:animate-shimmer before:transition-transform"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-gold-700" />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gold-800 via-gold-700 to-gold-600 bg-clip-text text-transparent">
                  Most Popular
                </h1>
                <p className="text-gold-300 mt-1">
                  Discover our bestselling and most loved fragrances
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="border-gold-400 text-gold-300 hover:bg-black-800 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Collection
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? "bg-gold-600 hover:bg-gold-700 text-white"
                      : "border-gold-300 text-gold-300 hover:bg-black-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Stats Card */}
        <Card className="mb-8 bg-gradient-to-r from-black-800 to-black-800 border-black-700">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <TrendingUp className="w-8 h-8 text-gold-600 mb-2" />
                <span className="text-2xl font-bold text-gold-300">
                  {popularPerfumes.length}
                </span>
                <span className="text-gold-600">Top Fragrances</span>
              </div>
              <div className="flex flex-col items-center">
                <Award className="w-8 h-8 text-yellow-500 mb-2" />
                <span className="text-2xl font-bold text-gold-300">
                  {popularPerfumes.filter((p) => p.gender === "Unisex").length}
                </span>
                <span className="text-gold-600">Unisex Options</span>
              </div>
              <div className="flex flex-col items-center">
                <Sparkles className="w-8 h-8 text-gold-600 mb-2" />
                <span className="text-2xl font-bold text-gold-300">
                  {Math.round(
                    popularPerfumes.reduce(
                      (acc, p) => acc + p.popularityScore,
                      0,
                    ) / popularPerfumes.length,
                  )}
                </span>
                <span className="text-gold-600">Avg. Popularity Score</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular Perfumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {popularPerfumes.map((perfume, index) => (
            <div key={perfume.id} className="relative">
              {/* Rank Badge */}
              <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-black-800 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
                {getRankIcon(index)}
                <span className="text-sm font-bold text-gold-300">
                  #{index + 1}
                </span>
              </div>

              {/* Popularity Score Badge */}
              <div className="absolute top-2 right-2 z-10">
                <Badge
                  variant="secondary"
                  className="bg-gold-600 text-white hover:bg-gold-700"
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {perfume.popularityScore}
                </Badge>
              </div>

              <PerfumeCard perfume={perfume} showCompareButton={true} />
            </div>
          ))}
        </div>

        {/* Popular Insights */}
        <Card className="mt-12 bg-gradient-to-r from-black-800 to-black-800 border-black-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gold-300">
              <Sparkles className="w-5 h-5" />
              What Makes These Fragrances Popular?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gold-300 mb-2">
                  Top Characteristics:
                </h4>
                <ul className="text-sm text-gold-300 space-y-1">
                  <li>• Versatile for multiple seasons</li>
                  <li>• Balanced sillage (not too light, not overpowering)</li>
                  <li>• Popular accord combinations</li>
                  <li>• Inspired by prestigious designer brands</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gold-300 mb-2">
                  Most Popular Accords:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {[
                    "Sweet",
                    "Woody",
                    "Fresh",
                    "Floral",
                    "Oriental",
                    "Citrus",
                  ].map((accord) => (
                    <Badge
                      key={accord}
                      variant="outline"
                      className="text-xs border-gold-300 text-gold-300"
                    >
                      {accord}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
