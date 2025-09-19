import { useState } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X, Filter, Search, ChevronDown } from "lucide-react";
import { seasons, genders, times } from "../data/perfumes";

export interface FilterState {
  search: string;
  gender: string;
  season: string;
  bestTime: string;
  mainAccord: string;
}

interface CompactFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
  resultCount: number;
}

export function CompactFilters({
  filters,
  onFiltersChange,
  onReset,
  resultCount,
}: CompactFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

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
  const activeFilterCount = Object.values(filters).filter(
    (value) => value !== "",
  ).length;

  return (
    <div
      className="bg-gradient-to-r from-black-900 via-black-800 to-black-700 p-3 sm:p-4 md:p-5 border-b border-gold-400 shadow-md relative overflow-hidden
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-gold-500/10 before:to-transparent before:translate-x-[-200%] before:animate-shimmer before:transition-transform"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-5">
          {/* Search - Always visible */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gold-400" />
            <Input
              placeholder="Search..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="pl-10 pr-4 h-10 text-sm border-gold-300 focus:border-gold-500 bg-black-800"
            />
          </div>

          {/* Filter Dropdown */}
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-3 text-sm border-gold-400 bg-black-800 hover:bg-black-700 relative"
              >
                <Filter className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">Filters</span>
                {activeFilterCount > 0 && (
                  <Badge className="ml-1 h-4 w-4 p-0 text-xs bg-gold-600 text-black-950 rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </Badge>
                )}
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 sm:w-96 p-4" align="start">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">Filter Options</h4>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onReset}
                      className="h-6 px-2 text-xs text-gold-300 hover:bg-black-800 hover:text-white"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {/* Gender */}
                  <Select
                    value={filters.gender || "all"}
                    onValueChange={(value) =>
                      updateFilter("gender", value === "all" ? "" : value)
                    }
                  >
                    <SelectTrigger className="h-10 text-sm border-gold-300">
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
                    <SelectTrigger className="h-10 text-sm border-gold-300">
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
                    <SelectTrigger className="h-10 text-sm border-gold-300">
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

                  {/* Scent Type */}
                  <Select
                    value={filters.mainAccord || "all"}
                    onValueChange={(value) =>
                      updateFilter("mainAccord", value === "all" ? "" : value)
                    }
                  >
                    <SelectTrigger className="h-10 text-sm border-gold-300">
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
            </PopoverContent>
          </Popover>

          {/* Results count */}
          <Badge
            variant="secondary"
            className="bg-black-700 text-gold-300 border-gold-400 text-xs px-2 py-1"
          >
            {resultCount}
          </Badge>

          {/* Sort - Compact (now visible on small screens and wraps) */}
          <div className="w-full sm:w-auto mt-2 sm:mt-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gold-400 whitespace-nowrap">Sort By:</span>
              <Select defaultValue="name">
                <SelectTrigger className="h-10 w-full sm:w-24 text-sm border-gold-300 bg-black-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">A-Z</SelectItem>
                  <SelectItem value="brand">Brand</SelectItem>
                  <SelectItem value="gender">Gender</SelectItem>
                  <SelectItem value="popularity">Popular</SelectItem>
                  <SelectItem value="sillage">Sillage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
