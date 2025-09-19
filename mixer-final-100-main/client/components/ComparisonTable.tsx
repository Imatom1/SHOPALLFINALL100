import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Eye } from "lucide-react";
import { Perfume } from "../data/perfumes";

interface ComparisonTableProps {
  perfumes: Perfume[];
  onRemove: (perfumeId: string) => void;
  onViewDetails: (perfume: Perfume) => void;
}

export function ComparisonTable({
  perfumes,
  onRemove,
  onViewDetails,
}: ComparisonTableProps) {
  if (perfumes.length === 0) {
    return null;
  }

  const comparisonRows = [
    {
      label: "Name",
      getValue: (p: Perfume) => (
        <div className="space-y-1">
          <div className="font-bold text-gold-300">{p.name}</div>
          <div className="text-sm font-semibold text-gold-300">{p.brand}</div>
          <div className="text-xs font-medium text-gold-400">
            Inspired by {p.originalBrand}
          </div>
        </div>
      ),
    },
    {
      label: "Gender",
      getValue: (p: Perfume) => (
        <Badge className="bg-black-700 text-gold-200 border-gold-400 font-semibold">
          {p.gender}
        </Badge>
      ),
    },
    {
      label: "Fragrance Profile",
      getValue: (p: Perfume) => (
        <div className="text-sm font-semibold text-gold-300">
          {p.fragranceProfile}
        </div>
      ),
    },
    {
      label: "Best Time",
      getValue: (p: Perfume) => (
        <div className="text-sm font-medium text-gold-400">{p.bestTime}</div>
      ),
    },
    {
      label: "Seasons",
      getValue: (p: Perfume) => (
        <div className="text-sm font-medium text-gold-400">
          {p.mainSeasons.join(", ")}
        </div>
      ),
    },
    {
      label: "Sillage",
      getValue: (p: Perfume) => (
        <div className="text-sm font-medium text-gold-400">{p.sillage}</div>
      ),
    },
    {
      label: "Main Accords",
      getValue: (p: Perfume) => (
        <div className="flex flex-wrap gap-1">
          {p.mainAccords.map((accord) => (
            <Badge
              key={accord}
              variant="outline"
              className="text-xs border-gold-300 text-gold-300 bg-black-800 font-medium"
            >
              {accord}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      label: "Top Notes",
      getValue: (p: Perfume) => (
        <div className="text-sm font-medium text-gold-400 space-y-1">
          {p.topNotes.map((note, idx) => (
            <div
              key={idx}
              className="text-xs bg-black-800 px-2 py-1 rounded border border-black-700"
            >
              {note}
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "Middle Notes",
      getValue: (p: Perfume) => (
        <div className="text-sm font-medium text-gold-400 space-y-1">
          {p.middleNotes.map((note, idx) => (
            <div
              key={idx}
              className="text-xs bg-black-800 px-2 py-1 rounded border border-black-700"
            >
              {note}
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "Base Notes",
      getValue: (p: Perfume) => (
        <div className="text-sm font-medium text-gold-400 space-y-1">
          {p.baseNotes.map((note, idx) => (
            <div
              key={idx}
              className="text-xs bg-black-800 px-2 py-1 rounded border border-black-700"
            >
              {note}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Actions Section - Above Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {perfumes.map((perfume, index) => (
          <Card
            key={perfume.id}
            className="bg-gradient-to-br from-black-800 to-black-800 border border-gold-300"
          >
            <CardContent className="p-4">
              <div className="text-center mb-3">
                <h4 className="font-bold text-gold-300 text-sm mb-1">
                  {perfume.name}
                </h4>
                <p className="text-xs text-gold-300">{perfume.brand}</p>
              </div>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails(perfume)}
                  className="border-gold-400 text-gold-300 hover:bg-black-800 hover:text-white font-semibold text-xs"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemove(perfume.id)}
                  className="border-red-300 text-red-600 hover:bg-red-800 text-xs"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <Card
        className="bg-gradient-to-br from-black-800 via-black-800 to-black-700 border-2 border-gold-400 shadow-xl relative overflow-hidden
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-200%] hover:before:animate-shimmer before:transition-transform"
      >
        <CardHeader className="relative z-10">
          <CardTitle className="text-lg sm:text-xl font-bold text-gold-300 flex items-center gap-2">
            Fragrance Comparison Table
          </CardTitle>
          <p className="text-xs text-gold-300 mt-2 sm:hidden">
            Scroll horizontally to see all details
          </p>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="overflow-x-auto -mx-6 px-6">
            <div className="min-w-[600px]">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gold-300">
                    <TableHead className="font-bold text-gold-300 bg-black-700 min-w-[120px] sticky left-0 z-20">
                      Attribute
                    </TableHead>
                    {perfumes.map((perfume, index) => (
                      <TableHead
                        key={perfume.id}
                        className="font-semibold text-gold-400 bg-black-800 text-center min-w-[180px]"
                      >
                        Fragrance {index + 1}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonRows.map((row, rowIndex) => (
                    <TableRow
                      key={row.label}
                      className={`border-b border-black-700 ${rowIndex % 2 === 0 ? "bg-black-800/50" : "bg-black-800/30"}`}
                    >
                      <TableCell className="font-medium text-gold-300 bg-black-800 sticky left-0 z-20 border-r border-black-700 min-w-[120px]">
                        {row.label}
                      </TableCell>
                      {perfumes.map((perfume) => (
                        <TableCell
                          key={perfume.id}
                          className="text-center align-top p-3 min-w-[180px]"
                        >
                          {row.getValue(perfume)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
