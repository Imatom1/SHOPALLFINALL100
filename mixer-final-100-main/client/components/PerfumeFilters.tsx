import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Filter, Search } from "lucide-react";
import {
  brands,
  fragranceProfiles,
  seasons,
  genders,
  times,
} from "../data/perfumes";

export interface FilterState {
  search: string;
  brand: string;
  gender: string;
  fragranceProfile: string;
  season: string;
  bestTime: string;
  priceRange: [number, number];
}

interface PerfumeFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
  resultCount: number;
}

export function PerfumeFilters({
  filters,
  onFiltersChange,
  onReset,
  resultCount,
}: PerfumeFiltersProps) {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) =>
      value !== "" && !(Array.isArray(value) && value.every((v) => v === 0)),
  );

  return (
    <Card
      className="bg-gradient-to-br from-black-800 via-black-700 to-black-600 border-2 border-gold-400 shadow-xl relative overflow-hidden
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-200%] hover:before:animate-shimmer before:transition-transform"
    >
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2 text-gold-300">
          <Filter className="w-5 h-5 text-gold-700" />
          <span className="font-bold">Filters</span>
          {resultCount > 0 && (
            <Badge
              variant="secondary"
              className="bg-black-700 text-gold-300 border-gold-400 ml-auto font-semibold shadow-sm"
            >
              {resultCount} results
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-sm font-medium text-gold-400">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Search by name, brand, or notes..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="pl-10 border-black-700 focus:border-gold-400"
            />
          </div>
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gold-400">Brand</Label>
          <Select
            value={filters.brand || "all"}
            onValueChange={(value) =>
              updateFilter("brand", value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="border-black-700 focus:border-gold-400">
              <SelectValue placeholder="All brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gold-400">Gender</Label>
          <Select
            value={filters.gender || "all"}
            onValueChange={(value) =>
              updateFilter("gender", value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="border-black-700 focus:border-gold-400">
              <SelectValue placeholder="All genders" />
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
        </div>

        {/* Fragrance Profile */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gold-400">
            Fragrance Profile
          </Label>
          <Select
            value={filters.fragranceProfile || "all"}
            onValueChange={(value) =>
              updateFilter("fragranceProfile", value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="border-black-700 focus:border-gold-400">
              <SelectValue placeholder="All profiles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All profiles</SelectItem>
              {fragranceProfiles.map((profile) => (
                <SelectItem key={profile} value={profile}>
                  {profile}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Season */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gold-400">Season</Label>
          <Select
            value={filters.season || "all"}
            onValueChange={(value) =>
              updateFilter("season", value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="border-black-700 focus:border-gold-400">
              <SelectValue placeholder="All seasons" />
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

        {/* Best Time */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gold-400">Best Time</Label>
          <Select
            value={filters.bestTime || "all"}
            onValueChange={(value) =>
              updateFilter("bestTime", value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="border-black-700 focus:border-gold-400">
              <SelectValue placeholder="Any time" />
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
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gold-400">
            Price Range
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0] || ""}
              onChange={(e) =>
                updateFilter("priceRange", [
                  Number(e.target.value) || 0,
                  filters.priceRange[1],
                ])
              }
              className="border-black-700 focus:border-gold-400"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1] || ""}
              onChange={(e) =>
                updateFilter("priceRange", [
                  filters.priceRange[0],
                  Number(e.target.value) || 0,
                ])
              }
              className="border-black-700 focus:border-gold-400"
            />
          </div>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={onReset}
            className="w-full border-gold-300 text-gold-300 hover:bg-black-800 hover:text-white"
          >
            <X className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
