import { useState, useMemo } from "react";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  Sparkles,
  Crown,
  ArrowLeft,
  RefreshCw,
  Flower2,
  Shield,
  Users,
  Briefcase,
  Home,
  Moon,
  Calendar,
  PartyPopper,
  User,
  Palette,
  Mountain,
  Smile,
  Eye,
  Leaf,
  Flower,
  TreePine,
  Zap,
  Candy,
  Waves,
  Sun,
  Snowflake,
  Volume,
  VolumeX,
  Volume2,
  Clock,
  Brain,
  Target,
  ArrowRight,
  Check,
} from "lucide-react";
import { Header } from "../components/Header";
import { PerfumeDetail } from "../components/PerfumeDetail";
import { CompactPerfumeCard } from "../components/CompactPerfumeCard";
import { SortSelect, SortOption } from "../components/SortSelect";
import { CompactFilters, FilterState } from "../components/CompactFilters";
import { perfumes, Perfume } from "../data/perfumes";

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

interface QuizOption {
  id: string;
  text: string;
  traits: string[];
  weight: number;
  icon: any;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "profile",
    question: "What fragrance profile do you prefer?",
    options: [
      {
        id: "feminine",
        text: "Feminine",
        traits: ["Graceful", "Elegant", "Refined", "Gentle", "Classic"],
        weight: 3,
        icon: Flower2,
      },
      {
        id: "masculine",
        text: "Masculine",
        traits: [
          "Rugged",
          "Confident",
          "Traditional",
          "Powerful",
          "Structured",
        ],
        weight: 3,
        icon: Shield,
      },
      {
        id: "unisex",
        text: "Unisex",
        traits: ["Balanced", "Versatile", "Modern", "Inclusive", "Harmonious"],
        weight: 2,
        icon: Users,
      },
    ],
  },
  {
    id: "occasion",
    question: "When will you primarily wear this fragrance?",
    options: [
      {
        id: "work",
        text: "Work and professional settings",
        traits: ["Professional", "Clean", "Subtle", "Fresh", "Light"],
        weight: 2,
        icon: Briefcase,
      },
      {
        id: "daily",
        text: "Daily casual wear",
        traits: ["Versatile", "Comfortable", "Easy", "Light", "Fresh"],
        weight: 2,
        icon: Home,
      },
      {
        id: "evening",
        text: "Evening events and dates",
        traits: ["Intense", "Seductive", "Rich", "Strong", "Memorable"],
        weight: 3,
        icon: Moon,
      },
      {
        id: "special",
        text: "Special occasions and celebrations",
        traits: ["Luxurious", "Elegant", "Sophisticated", "Premium", "Bold"],
        weight: 3,
        icon: Calendar,
      },
      {
        id: "intimate",
        text: "Intimate settings",
        traits: ["Sensual", "Alluring", "Captivating", "Personal", "Close"],
        weight: 3,
        icon: Heart,
      },
      {
        id: "social",
        text: "Social gatherings and parties",
        traits: ["Fun", "Energetic", "Vibrant", "Playful", "Noticeable"],
        weight: 2,
        icon: PartyPopper,
      },
    ],
  },
  {
    id: "season",
    question: "Which season do you like most?",
    options: [
      {
        id: "spring",
        text: "Spring",
        traits: ["Floral", "Green", "Fresh", "Light", "Blooming"],
        weight: 2,
        icon: Leaf,
      },
      {
        id: "summer",
        text: "Summer",
        traits: ["Citrus", "Aquatic", "Light", "Refreshing", "Bright"],
        weight: 2,
        icon: Sun,
      },
      {
        id: "fall",
        text: "Fall",
        traits: ["Warm", "Spicy", "Amber", "Cozy", "Rich"],
        weight: 2,
        icon: TreePine,
      },
      {
        id: "winter",
        text: "Winter",
        traits: ["Heavy", "Oriental", "Intense", "Warm", "Deep"],
        weight: 3,
        icon: Snowflake,
      },
    ],
  },
  {
    id: "personality",
    question: "Which personality best describes you?",
    options: [
      {
        id: "bold",
        text: "Bold & confident",
        traits: ["Strong", "Powerful", "Assertive", "Daring", "Commanding"],
        weight: 3,
        icon: Mountain,
      },
      {
        id: "artistic",
        text: "Artistic & creative",
        traits: [
          "Imaginative",
          "Inspired",
          "Expressive",
          "Unique",
          "Visionary",
        ],
        weight: 2,
        icon: Palette,
      },
      {
        id: "sophisticated",
        text: "Sophisticated & elegant",
        traits: ["Elegant", "Refined", "Classy", "Luxurious", "Polished"],
        weight: 3,
        icon: Crown,
      },
      {
        id: "playful",
        text: "Playful & energetic",
        traits: ["Fun", "Vibrant", "Youthful", "Fresh", "Lively"],
        weight: 2,
        icon: Smile,
      },
      {
        id: "mysterious",
        text: "Mysterious & intriguing",
        traits: ["Dark", "Complex", "Enigmatic", "Seductive", "Deep"],
        weight: 3,
        icon: Eye,
      },
      {
        id: "calm",
        text: "Calm & peaceful",
        traits: ["Zen", "Peaceful", "Gentle", "Soothing", "Harmonious"],
        weight: 2,
        icon: Leaf,
      },
    ],
  },
  {
    id: "scentfamily",
    question: "Which scent family appeals to you most?",
    options: [
      {
        id: "fresh",
        text: "Fresh & citrus",
        traits: ["Clean", "Energizing", "Bright", "Zesty", "Uplifting"],
        weight: 3,
        icon: Zap,
      },
      {
        id: "floral",
        text: "Floral bouquet",
        traits: ["Rose", "Jasmine", "Peony", "Lily", "Blooming"],
        weight: 3,
        icon: Flower,
      },
      {
        id: "woody",
        text: "Woody & earthy",
        traits: [
          "Sandalwood",
          "Cedar",
          "Grounding",
          "Natural",
          "Sophisticated",
        ],
        weight: 3,
        icon: TreePine,
      },
      {
        id: "oriental",
        text: "Oriental & spicy",
        traits: ["Exotic", "Warm", "Rich", "Mysterious", "Luxurious"],
        weight: 3,
        icon: Sparkles,
      },
      {
        id: "sweet",
        text: "Sweet & gourmand",
        traits: ["Vanilla", "Chocolate", "Honey", "Dessert", "Comforting"],
        weight: 2,
        icon: Candy,
      },
      {
        id: "aquatic",
        text: "Aquatic & marine",
        traits: ["Ocean", "Blue", "Cool", "Refreshing", "Crisp"],
        weight: 2,
        icon: Waves,
      },
    ],
  },
  {
    id: "strength",
    question: "What fragrance strength do you prefer?",
    options: [
      {
        id: "subtle",
        text: "Subtle",
        traits: ["Intimate"],
        weight: 1,
        icon: VolumeX,
      },
      {
        id: "moderate",
        text: "Moderate",
        traits: ["Noticeable"],
        weight: 2,
        icon: Volume,
      },
      {
        id: "strong",
        text: "Strong",
        traits: ["Bold"],
        weight: 3,
        icon: Volume2,
      },
    ],
  },
];

export default function Quiz() {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizOption[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<Perfume[]>([]);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailAnchorY, setDetailAnchorY] = useState<number | null>(null);

  // Check if user came from intro page or has started the quiz
  const hasStartedQuiz = !showIntro && (answers.length > 0 || showResults);

  // Full fragrance section state
  const initialFilters: FilterState = {
    search: "",
    gender: "",
    season: "",
    bestTime: "",
    mainAccord: "",
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortBy, setSortBy] = useState<SortOption>("popularity");

  // Filter and sort perfumes
  const filteredAndSortedPerfumes = useMemo(() => {
    const filtered = perfumes.filter((perfume) => {
      // Search filter (normalized, tokenized)
      if (filters.search) {
        const normalize = (s: string) =>
          s
            .toLowerCase()
            .replace(/[^\w\s]/g, " ")
            .replace(/\s+/g, " ")
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

        // Match if every token exists in searchableText OR matches a word prefix
        const words = searchableText.split(' ');
        const allPresent = tokens.every((t) =>
          searchableText.includes(t) || words.some((w) => w.startsWith(t)),
        );
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
          // Sort by popularity (based on number of main accords + complexity)
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
          return bPopularity - aPopularity; // Higher complexity = more popular
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
  }, [filters, sortBy]);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const startQuiz = () => {
    setShowIntro(false);
  };

  const restartQuiz = () => {
    setShowIntro(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setRecommendations([]);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Remove the last answer when going back
      setAnswers(answers.slice(0, -1));
    } else {
      // If on first question, go back to intro
      setShowIntro(true);
    }
  };

  const handleAnswer = (option: QuizOption) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate recommendations
      calculateRecommendations(newAnswers);
    }
  };

  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const calculateRecommendations = (userAnswers: QuizOption[]) => {
    const scores: Record<string, number> = {};
    perfumes.forEach((p) => (scores[p.id] = 0));

    userAnswers.forEach((answer, idx) => {
      const qId = quizQuestions[idx]?.id || "";
      const weight = answer.weight || 1;
      const keywords = [answer.id, answer.text, ...(answer.traits || [])].map((k) => normalize(k));

      perfumes.forEach((perfume) => {
        const searchable = normalize(
          [
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

        let localScore = 0;

        if (qId === "season") {
          const season = answer.id.toLowerCase();
          const seasons = perfume.mainSeasons.map((s) => s.toLowerCase());
          if (seasons.includes(season)) localScore += weight * 3;
        } else if (qId === "profile") {
          const map: Record<string, string> = { feminine: "women", masculine: "men", unisex: "unisex" };
          const wanted = map[answer.id]?.toLowerCase();
          if (wanted && perfume.gender.toLowerCase() === wanted) localScore += weight * 3;
        } else if (qId === "strength") {
          const strengthMap: Record<string, number> = { subtle: 1, moderate: 3, strong: 5 };
          const target = strengthMap[answer.id] || 3;
          const sillageOrder: Record<string, number> = {
            Light: 1,
            "Light to Moderate": 2,
            Moderate: 3,
            "Moderate to Strong": 4,
            Strong: 5,
            "Very Strong": 6,
          };
          const sVal = sillageOrder[perfume.sillage as keyof typeof sillageOrder] || 3;
          const diff = Math.abs(target - sVal);
          localScore += Math.max(0, (3 - diff)) * weight;
        }

        keywords.forEach((kw) => {
          if (!kw) return;
          if (searchable.includes(kw)) {
            localScore += weight * 1.5;
          }
        });

        scores[perfume.id] += localScore;
      });
    });

    const perfumeScores = perfumes
      .map((p) => ({ perfume: p, score: Math.round((scores[p.id] || 0) * 100) / 100 }))
      .sort((a, b) => b.score - a.score);

    const topRecommendations =
      perfumeScores[0]?.score > 0
        ? perfumeScores.slice(0, 6).map((p) => p.perfume)
        : perfumes
            .slice()
            .sort((a, b) => (b.mainAccords.length + b.topNotes.length) - (a.mainAccords.length + a.topNotes.length))
            .slice(0, 6);

    setRecommendations(topRecommendations);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setShowIntro(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setRecommendations([]);
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

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  // Quiz content component
  const QuizContent = () => {
    if (showIntro) {
      return (
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="relative">
              <Heart className="w-7 h-7 text-gold-700" />
              <Sparkles className="w-3 h-3 text-gold-500 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gold-300">Fragrance Quiz</h1>
          </div>
          <p className="text-sm text-gold-300 mb-3">
            Find your perfect scent in under 3 minutes
          </p>
          <p className="text-xs text-gray-500 leading-relaxed mb-6">
            Our AI analyzes your style, mood preferences, and occasion needs to
            match you with fragrances that truly reflect your personality.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent my-6" />

          {/* What You'll Get */}
          <Card className="bg-gradient-to-b from-black-900 to-black-800 border border-gold-500/10 rounded-2xl shadow-lg mb-5">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-gold-300 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-gold-600" />
                What You'll Get:
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-gold-400 block">
                      6 Personalized Matches
                    </span>
                    <span className="text-xs text-gray-500">
                      Curated specifically for your taste profile
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-gold-400 block">
                      Detailed Explanations
                    </span>
                    <span className="text-xs text-gray-500">
                      Why each fragrance suits your personality
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-gold-400 block">
                      Occasion Recommendations
                    </span>
                    <span className="text-xs text-gray-500">
                      Perfect scents for work, dates, and events
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Facts */}
          <Card className="bg-gradient-to-b from-black-900 to-black-800 border border-gold-500/10 rounded-2xl shadow-lg mb-8">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="space-y-1">
                  <Clock className="w-5 h-5 text-gold-600 mx-auto" />
                  <div className="text-xs font-medium text-gold-400">
                    3 Minutes
                  </div>
                  <div className="text-xs text-gray-500">Quick & Easy</div>
                </div>
                <div className="space-y-1">
                  <Brain className="w-5 h-5 text-gold-600 mx-auto" />
                  <div className="text-xs font-medium text-gold-400">
                    AI Powered
                  </div>
                  <div className="text-xs text-gray-500">Smart Analysis</div>
                </div>
                <div className="space-y-1">
                  <Users className="w-5 h-5 text-gold-600 mx-auto" />
                  <div className="text-xs font-medium text-gold-400">
                    1K+ Users
                  </div>
                  <div className="text-xs text-gray-500">Trusted Results</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="space-y-3">
            <Button
              onClick={startQuiz}
              className="w-full bg-gold-600 hover:bg-gold-700 text-black-950 font-semibold py-5 text-lg shadow-xl ring-2 ring-gold-500/30 transition-transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-gold-500/50"
            >
              <Heart className="w-4 h-4 mr-2" />
              Start Your Fragrance Journey
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <p className="text-xs text-gold-400 text-center">Most users start here</p>

            <Button
              variant="outline"
              onClick={() => navigate("/fragrances")}
              className="w-full border-gold-500/30 text-gold-300 hover:bg-black-900 hover:text-gold-100"
            >
              Browse All Fragrances Instead
            </Button>
          </div>

          {/* Enhanced How It Works */}
          <div className="mt-6 text-center">
            <p className="text-xs font-medium text-gold-300 mb-3">
              How it works:
            </p>
            <div className="space-y-2">
              <div className="flex justify-center items-center gap-2 text-xs text-gold-300">
                <span className="bg-black-900/60 border border-gold-500/10 px-3 py-1.5 rounded-full font-medium">
                  1. Answer 6 Questions
                </span>
                <span className="text-gold-400">→</span>
                <span className="bg-black-900/60 border border-gold-500/10 px-3 py-1.5 rounded-full font-medium">
                  2. AI Analysis
                </span>
              </div>
              <div className="flex justify-center">
                <span className="text-gold-400 text-xs">↓</span>
              </div>
              <div className="flex justify-center">
                <span className="bg-black-900/60 border border-gold-500/10 px-3 py-1.5 rounded-full font-medium text-xs text-gold-400">
                  3. Get Perfect Matches
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4 leading-relaxed">
              Join thousands who've discovered their signature scent through our
              personalized approach to fragrance matching.
            </p>
          </div>
        </div>
      );
    }

    if (showResults) {
      return (
        <div className="space-y-4">
          <div className="text-center">
            <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-gold-600 mx-auto mb-3" />
            <h3 className="text-base sm:text-lg font-semibold text-gold-300 mb-2">
              Your Perfect Fragrance Matches
            </h3>
            <p className="text-sm text-gold-300 max-w-2xl mx-auto px-2">
              Based on your personality and preferences, here are the
              fragrances that align perfectly with who you are
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recommendations.map((perfume, index) => (
              <Card
                key={perfume.id}
                className="border-gold-300 bg-gradient-to-br from-black-800 to-black-800 hover:from-black-700 hover:to-black-600 transition-all cursor-pointer group"
                onClick={(e) => handlePerfumeClick(perfume, e)}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-gold-500 text-black-950 text-xs font-semibold">
                        #{index + 1} Match
                      </Badge>
                      <Crown className="w-4 h-4 text-gold-600" />
                    </div>

                    <div>
                      <h4 className="font-bold text-gold-300 text-sm group-hover:text-gold-300 transition-colors">
                        {perfume.name}
                      </h4>
                      <p className="text-xs font-semibold text-gold-300">
                        {perfume.brand}
                      </p>
                      <p className="text-xs text-gold-300 mb-2">
                        Inspired by {perfume.originalBrand}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {perfume.mainAccords.slice(0, 3).map((accord) => (
                        <Badge
                          key={accord}
                          variant="outline"
                          className="text-xs border-gold-300 text-gold-300 bg-black-800"
                        >
                          {accord}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-black-700">
                      <div className="text-right">
                        <div className="text-sm font-bold text-gold-300">
                          ${perfume.sizes[0].price}
                        </div>
                        <div className="text-xs text-gold-300">
                          from {perfume.sizes[0].size}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="outline"
              onClick={resetQuiz}
              className="flex-1 border-gold-400 text-gold-300 hover:bg-black-800 hover:text-white"
            >
              Take Quiz Again
            </Button>
            <Button
              onClick={() => navigate("/fragrances")}
              className="flex-1 bg-gold-600 hover:bg-gold-700 text-white"
            >
              Explore Full Collection
            </Button>
          </div>
        </div>
      );
    }

    // Quiz questions
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gold-300">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousQuestion}
            className="border-gold-400 text-gold-300 hover:bg-black-800 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {currentQuestion === 0 ? "Back to Intro" : "Back"}
          </Button>
        </div>

        <Progress value={progress} className="h-2 bg-black-700" />
        <p className="text-xs text-gold-300">{Math.round(progress)}% complete</p>

        <div>
          <h3 className="text-lg font-semibold text-gold-300 mb-6 text-center">
            {quizQuestions[currentQuestion].question}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {quizQuestions[currentQuestion].options.map((option) => {
              const IconComponent = option.icon;
              const isStrengthQuestion = quizQuestions[currentQuestion].id === "strength";

              const StrengthIcon = ({ level }: { level: number }) => {
                const bars = [1, 2, 3];
                return (
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    {bars.map((b, i) => {
                      const active = b <= level;
                      const x = 12 + i * 14;
                      const height = 12 + b * 12;
                      const y = 46 - height;
                      return (
                        <rect
                          key={b}
                          x={x}
                          y={y}
                          width="8"
                          height={height}
                          rx="2"
                          fill={active ? "#FDD835" : "#3B3B3B"}
                        />
                      );
                    })}
                  </svg>
                );
              };

              const levelMap: Record<string, number> = { subtle: 1, moderate: 2, strong: 3 };

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleAnswer(option)}
                  className="group relative block w-full rounded-xl border border-gold-400/10 bg-gradient-to-br from-black-900/90 to-black-800/80 hover:from-black-800 hover:to-black-700 transition-all duration-200 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-gold-500/40 overflow-hidden p-4"
                >
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="flex items-center justify-center mb-3">
                      {isStrengthQuestion ? (
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black-800/60 p-1">
                          <StrengthIcon level={levelMap[option.id] || 1} />
                        </div>
                      ) : (
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black-800/40 p-2">
                          <IconComponent strokeWidth={2} className="text-gold-500 w-10 h-10" />
                        </div>
                      )}
                    </div>
                    <div className="font-semibold text-sm text-gold-300">
                      {option.text}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Fragrance section component
  const FragranceSection = () => (
    <div className="bg-gradient-to-b from-black-900 to-black-800 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-gold-600" />
            <h3 className="text-xl font-semibold text-gold-300">All Fragrances</h3>
            <Sparkles className="w-5 h-5 text-gold-600" />
          </div>
          <p className="text-sm text-gold-400">
            Browse our complete collection of {perfumes.length} premium fragrances
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <CompactFilters
            filters={filters}
            onFiltersChange={setFilters}
            onReset={resetFilters}
            resultCount={filteredAndSortedPerfumes.length}
          />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gold-400">
            Fragrances ({filteredAndSortedPerfumes.length})
          </h4>
          <div className="hidden sm:block">
            <SortSelect value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {/* Perfume Grid */}
        <div>
          {filteredAndSortedPerfumes.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="w-12 h-12 text-gold-500 mx-auto mb-4" />
              <h5 className="text-lg font-semibold text-gold-400 mb-2">
                No fragrances found
              </h5>
              <p className="text-sm text-gold-300 mb-4">
                Try adjusting your filters to discover more beautiful scents
              </p>
              <button
                onClick={resetFilters}
                className="text-gold-500 hover:text-gold-400 font-medium text-sm"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
              {filteredAndSortedPerfumes.map((perfume) => (
                <CompactPerfumeCard
                  key={perfume.id}
                  perfume={perfume}
                  onClick={(e) => handlePerfumeClick(perfume, e)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black-900 via-black-900 to-black-800 overflow-hidden">
      <Header />

      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(253,216,53,0.15),transparent)]" />

      <div className="space-y-6">
        {/* Quiz Container */}
        <div className="max-w-4xl mx-auto px-4">
          <Card className="bg-gradient-to-b from-black-900 to-black-800 border border-gold-500/10 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <QuizContent />
            </CardContent>
          </Card>
        </div>

        {/* Full Width Fragrance Section */}
        <div className="w-full">
          <FragranceSection />
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
        anchorY={detailAnchorY}
      />
    </div>
  );
}
