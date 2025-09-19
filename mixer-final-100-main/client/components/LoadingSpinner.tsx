import { Sparkles } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center">
        <Sparkles className="w-12 h-12 text-gold-500 mx-auto mb-4 animate-spin" />
        <p className="text-gold-300 font-medium">
          Loading your perfect fragrances...
        </p>
      </div>
    </div>
  );
}
