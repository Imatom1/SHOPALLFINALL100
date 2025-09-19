import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowUpDown } from "lucide-react";

export type SortOption = "name" | "brand" | "sillage" | "gender" | "popularity";

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <ArrowUpDown className="w-3 h-3 sm:w-4 sm:h-4 text-gold-600" />
      <Label
        htmlFor="sort"
        className="text-sm font-medium text-gold-400 whitespace-nowrap hidden sm:inline"
      >
        Sort:
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id="sort"
          className="w-20 sm:w-32 h-7 sm:h-10 text-xs sm:text-sm border-black-700 focus:border-gold-400"
        >
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
  );
}
