import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Filter, Search } from "lucide-react";
import { seasons, genders, times } from "../data/perfumes";

export interface FilterState {
  search: string;
  gender: string;
  season: string;
  bestTime: string;
  mainAccord: string;
}

interface QuickFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
  resultCount: number;
}

export function QuickFilters({
  filters,
  onFiltersChange,
  onReset,
  resultCount,
}: QuickFiltersProps) {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

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

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <div
      className="bg-gradient-to-r from-copper-100 via-copper-200 to-copper-300 p-2 sm:p-4 border-b-2 border-copper-400 shadow-lg relative overflow-hidden mb-3 sm:mb-6
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-200%] before:animate-shimmer before:transition-transform"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-copper-700" />
            <span className="font-bold text-gold-300 text-sm sm:text-base">
              Filters
            </span>
            {resultCount > 0 && (
              <Badge
                variant="secondary"
                className="bg-copper-200 text-copper-900 border-copper-400 font-semibold shadow-sm text-xs"
              >
                {resultCount} results
              </Badge>
            )}
          </div>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="sm:ml-auto border-copper-400 text-copper-800 hover:bg-copper-100 text-xs sm:text-sm h-8 sm:h-10"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-3">
          {/* Search */}
          <div className="relative sm:col-span-2 xl:col-span-2">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            <Input
              placeholder="Search fragrances..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="pl-8 sm:pl-10 border-copper-300 focus:border-copper-500 bg-black-800 text-sm sm:text-base h-8 sm:h-10"
            />
          </div>

          {/* Gender */}
          <Select
            value={filters.gender || "all"}
            onValueChange={(value) =>
              updateFilter("gender", value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="border-copper-300 focus:border-copper-500 bg-black-800 text-xs sm:text-sm h-8 sm:h-10">
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

          {/* Season */}
          <Select
            value={filters.season || "all"}
            onValueChange={(value) =>
              updateFilter("season", value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="border-copper-300 focus:border-copper-500 bg-black-800 text-xs sm:text-sm h-8 sm:h-10">
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

          {/* Best Time */}
          <Select
            value={filters.bestTime || "all"}
            onValueChange={(value) =>
              updateFilter("bestTime", value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="border-copper-300 focus:border-copper-500 bg-black-800 text-xs sm:text-sm h-8 sm:h-10">
              <SelectValue placeholder="Best Time" />
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

          {/* General Accord */}
          <Select
            value={filters.mainAccord || "all"}
            onValueChange={(value) =>
              updateFilter("mainAccord", value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="border-copper-300 focus:border-copper-500 bg-black-800 text-xs sm:text-sm h-8 sm:h-10">
              <SelectValue placeholder="Scent Type" />
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
      </div>
    </div>
  );
}
