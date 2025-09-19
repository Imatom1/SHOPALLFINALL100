import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, Crown, ArrowRight, CheckCircle, Plus } from "lucide-react";
import { Header } from "../components/Header";

export default function CompareIntro() {
  const navigate = useNavigate();

  const features = [
    "Side-by-side detailed comparison table",
    "Compare fragrance profiles and notes",
    "Analyze seasonal preferences and occasions",
    "Compare up to 3 fragrances at once",
    "Shareable comparison links",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-800 via-black-800 to-black-800">
      <Header />

      {/* Page Header */}
      <div
        className="bg-gradient-to-r from-black-800 via-black-700 to-black-600 py-16 relative overflow-hidden
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-200%] before:animate-shimmer before:transition-transform"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Scale className="w-12 h-12 text-gold-700" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gold-800 via-gold-700 to-gold-600 bg-clip-text text-transparent">
                Compare Fragrances
              </h1>
              <Crown className="w-12 h-12 text-gold-700" />
            </div>
            <p className="text-xl text-gold-400 max-w-3xl mx-auto">
              Compare up to 3 fragrances side-by-side to find your perfect match
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - How It Works */}
          <Card
            className="bg-gradient-to-br from-black-800 via-black-800 to-black-700 border-2 border-gold-400 shadow-xl relative overflow-hidden
          before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-200%] before:animate-shimmer before:transition-transform"
          >
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl font-bold text-gold-300 flex items-center gap-2">
                <Crown className="w-6 h-6 text-gold-700" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gold-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gold-300">
                      Select Fragrances
                    </h3>
                    <p className="text-sm text-gold-300">
                      Choose up to 3 fragrances from our collection to compare
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gold-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gold-300">
                      View Detailed Table
                    </h3>
                    <p className="text-sm text-gold-300">
                      See side-by-side comparison of notes, profiles, and
                      characteristics
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gold-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gold-300">
                      Make Your Choice
                    </h3>
                    <p className="text-sm text-gold-300">
                      Analyze differences and find the perfect fragrance for you
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Features */}
          <Card
            className="bg-gradient-to-br from-black-800 via-black-800 to-black-700 border-2 border-gold-400 shadow-xl relative overflow-hidden
          before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-200%] before:animate-shimmer before:transition-transform"
          >
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl font-bold text-gold-300 flex items-center gap-2">
                <Scale className="w-6 h-6 text-gold-700" />
                Comparison Features
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gold-400 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Card
            className="bg-gradient-to-r from-black-700 via-black-600 to-black-500 border-2 border-gold-500 shadow-xl relative overflow-hidden
          before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-200%] before:animate-shimmer before:transition-transform"
          >
            <CardContent className="p-8 relative z-10">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gold-300">
                  Ready to Compare Fragrances?
                </h2>
                <p className="text-lg text-gold-400 max-w-2xl mx-auto">
                  Start comparing fragrances side-by-side to make the perfect
                  choice
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button
                    onClick={() => navigate("/compare")}
                    className="bg-gold-600 hover:bg-gold-700 text-white font-bold text-lg px-8 py-4"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Start Comparing
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="border-gold-600 text-gold-300 hover:bg-black-800 hover:text-white font-semibold text-lg px-8 py-4"
                  >
                    Browse All Fragrances
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
