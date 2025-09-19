import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { X, Heart, Sparkles, Crown } from "lucide-react";
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
}

interface PerfumeQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onPerfumeSelect: (perfume: Perfume) => void;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "lifestyle",
    question: "What best describes your lifestyle?",
    options: [
      {
        id: "active",
        text: "Active and sporty",
        traits: ["Fresh", "Citrus", "Aquatic"],
        weight: 3,
      },
      {
        id: "professional",
        text: "Professional and sophisticated",
        traits: ["Woody", "Amber", "Oriental"],
        weight: 2,
      },
      {
        id: "creative",
        text: "Creative and artistic",
        traits: ["Floral", "Fruity", "Sweet"],
        weight: 2,
      },
      {
        id: "adventurous",
        text: "Adventurous and bold",
        traits: ["Spicy", "Oud", "Smoky"],
        weight: 3,
      },
    ],
  },
  {
    id: "occasion",
    question: "When do you most often wear fragrance?",
    options: [
      {
        id: "daily",
        text: "Every day for work/casual",
        traits: ["Fresh", "Light", "Clean"],
        weight: 2,
      },
      {
        id: "evening",
        text: "Special evenings out",
        traits: ["Oriental", "Amber", "Intense"],
        weight: 3,
      },
      {
        id: "both",
        text: "Both day and night",
        traits: ["Versatile", "Moderate"],
        weight: 1,
      },
      {
        id: "events",
        text: "Special events only",
        traits: ["Luxurious", "Strong", "Memorable"],
        weight: 3,
      },
    ],
  },
  {
    id: "personality",
    question: "How would friends describe your personality?",
    options: [
      {
        id: "warm",
        text: "Warm and approachable",
        traits: ["Vanilla", "Sweet", "Cozy"],
        weight: 2,
      },
      {
        id: "confident",
        text: "Confident and bold",
        traits: ["Strong", "Powerful", "Assertive"],
        weight: 3,
      },
      {
        id: "romantic",
        text: "Romantic and dreamy",
        traits: ["Rose", "Floral", "Soft"],
        weight: 2,
      },
      {
        id: "mysterious",
        text: "Mysterious and intriguing",
        traits: ["Dark", "Complex", "Enigmatic"],
        weight: 3,
      },
    ],
  },
  {
    id: "season",
    question: "What's your favorite season?",
    options: [
      {
        id: "spring",
        text: "Spring - Fresh and blooming",
        traits: ["Floral", "Green", "Fresh"],
        weight: 2,
      },
      {
        id: "summer",
        text: "Summer - Bright and energetic",
        traits: ["Citrus", "Aquatic", "Light"],
        weight: 2,
      },
      {
        id: "autumn",
        text: "Autumn - Warm and cozy",
        traits: ["Woody", "Spicy", "Amber"],
        weight: 2,
      },
      {
        id: "winter",
        text: "Winter - Rich and intense",
        traits: ["Oriental", "Heavy", "Warm"],
        weight: 3,
      },
    ],
  },
  {
    id: "notes",
    question: "Which scent family appeals to you most?",
    options: [
      {
        id: "floral",
        text: "Floral (roses, jasmine, lilies)",
        traits: ["Floral", "Romantic", "Feminine"],
        weight: 3,
      },
      {
        id: "oriental",
        text: "Oriental (vanilla, amber, spices)",
        traits: ["Oriental", "Exotic", "Warm"],
        weight: 3,
      },
      {
        id: "woody",
        text: "Woody (sandalwood, cedar, oud)",
        traits: ["Woody", "Sophisticated", "Grounding"],
        weight: 3,
      },
      {
        id: "fresh",
        text: "Fresh (citrus, marine, green)",
        traits: ["Fresh", "Clean", "Energizing"],
        weight: 3,
      },
    ],
  },
];

export function PerfumeQuiz({
  isOpen,
  onClose,
  onPerfumeSelect,
}: PerfumeQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizOption[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<Perfume[]>([]);

  if (!isOpen) return null;

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

  const calculateRecommendations = (userAnswers: QuizOption[]) => {
    // Collect all traits with weights
    const traitScores: { [key: string]: number } = {};

    userAnswers.forEach((answer) => {
      answer.traits.forEach((trait) => {
        traitScores[trait] = (traitScores[trait] || 0) + answer.weight;
      });
    });

    // Score each perfume based on matching traits
    const perfumeScores = perfumes.map((perfume) => {
      let score = 0;
      const searchableText = [
        perfume.fragranceProfile,
        ...perfume.mainAccords,
        ...perfume.topNotes,
        ...perfume.middleNotes,
        ...perfume.baseNotes,
      ]
        .join(" ")
        .toLowerCase();

      Object.entries(traitScores).forEach(([trait, weight]) => {
        if (searchableText.includes(trait.toLowerCase())) {
          score += weight;
        }
      });

      return { perfume, score };
    });

    // Get top 3 recommendations
    const topRecommendations = perfumeScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.perfume);

    setRecommendations(topRecommendations);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setRecommendations([]);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-black-800 via-black-800 to-black-700 border-2 border-gold-400 relative overflow-hidden
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-200%] before:animate-shimmer before:transition-transform"
      >
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-gold-600" />
              <CardTitle className="text-xl font-bold text-gold-300">
                {showResults
                  ? "Your Perfect Matches"
                  : "Perfume Personality Quiz"}
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gold-300 hover:text-gold-300"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {!showResults && (
            <div className="mt-4">
              <Progress value={progress} className="h-2 bg-black-700" />
              <p className="text-sm text-gold-300 mt-2">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </p>
            </div>
          )}
        </CardHeader>

        <CardContent className="relative z-10">
          {!showResults ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gold-300 mb-4">
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option) => (
                    <Button
                      key={option.id}
                      variant="outline"
                      className="w-full text-left p-4 h-auto border-gold-300 text-gold-300 hover:bg-black-800 hover:text-white hover:border-gold-500 font-medium"
                      onClick={() => handleAnswer(option)}
                    >
                      <div>
                        <div className="font-semibold">{option.text}</div>
                        <div className="text-sm text-gold-300 mt-1">
                          {option.traits.join(", ")}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-gold-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gold-300 mb-2">
                  Based on your answers, here are your perfect matches:
                </h3>
                <p className="text-gold-300">
                  These fragrances align with your personality and preferences
                </p>
              </div>

              <div className="space-y-4">
                {recommendations.map((perfume, index) => (
                  <Card
                    key={perfume.id}
                    className="border-gold-300 bg-gradient-to-r from-black-800 to-black-800 hover:from-black-700 hover:to-black-600 transition-all cursor-pointer"
                    onClick={() => {
                      onPerfumeSelect(perfume);
                      onClose();
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-gold-600 text-white text-xs">
                              #{index + 1} Match
                            </Badge>
                            <Crown className="w-4 h-4 text-gold-600" />
                          </div>

                          <h4 className="font-bold text-gold-300">
                            {perfume.name}
                          </h4>
                          <p className="text-sm font-semibold text-gold-300">
                            {perfume.brand}
                          </p>
                          <p className="text-xs text-gold-300 mb-2">
                            Inspired by {perfume.originalBrand}
                          </p>

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

                          <p className="text-sm text-gold-400">
                            <span className="font-semibold">Profile:</span>{" "}
                            {perfume.fragranceProfile}
                          </p>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-bold text-gold-300">
                            ${perfume.sizes[0].price}
                          </div>
                          <div className="text-xs text-gold-300">
                            from {perfume.sizes[0].size}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={resetQuiz}
                  className="flex-1 border-gold-400 text-gold-300 hover:bg-black-800 hover:text-white font-semibold"
                >
                  Take Quiz Again
                </Button>
                <Button
                  onClick={onClose}
                  className="flex-1 bg-gold-600 hover:bg-gold-700 text-white font-semibold"
                >
                  Explore Collection
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
