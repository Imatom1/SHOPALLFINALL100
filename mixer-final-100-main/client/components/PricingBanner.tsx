import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag, DollarSign, Crown } from "lucide-react";

export function PricingBanner() {
  return (
    <Card
      className="bg-gradient-to-r from-black-900 via-black-800 to-black-700 border border-gold-500 shadow-md relative overflow-hidden my-3 sm:my-4
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-gold-500/10 before:to-transparent before:translate-x-[-200%] before:animate-shimmer before:transition-transform"
    >
      <CardContent className="p-3 sm:p-4 md:p-5 relative z-10">
        <div className="flex items-center justify-center gap-2 sm:gap-4 text-center">
          <div className="hidden sm:flex items-center gap-1">
            <Crown className="w-4 h-4 text-gold-500" />
            <span className="font-bold text-gold-400 text-sm">Premium</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1">
              <span className="font-medium text-gold-300 text-xs sm:text-sm">
                30ml:
              </span>
              <Badge className="bg-gold-600 text-black-950 font-bold text-xs">
                $34.99
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-gold-300 text-xs sm:text-sm">
                50ml:
              </span>
              <Badge className="bg-gold-600 text-black-950 font-bold text-xs">
                $44.99
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-gold-300 text-xs sm:text-sm">
                100ml:
              </span>
              <Badge className="bg-gold-600 text-black-950 font-bold text-xs">
                $69.99
              </Badge>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1">
            <Tag className="w-4 h-4 text-gold-500" />
            <span className="font-bold text-gold-400 text-sm">Best Value</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
