import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown, Scale, Menu, X, Heart, Beaker } from "lucide-react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Quiz", href: "/", icon: Heart },
    { name: "Fragrances", href: "/fragrances", icon: Crown },
    { name: "Compare", href: "/compare", icon: Scale },
  ];

  return (
    <header
      className="sticky top-0 z-50 bg-gradient-to-r from-black-950 via-black-900 to-black-800 border-b-2 border-gold-500 shadow-xl backdrop-blur-sm
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-gold-500/10 before:to-transparent before:translate-x-[-200%] hover:before:animate-shimmer before:transition-transform"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <Crown className="w-8 h-8 text-gold-500 group-hover:text-gold-400 transition-colors" />
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                  Golden Aroma
                </span>
                <span className="text-xs font-semibold text-gold-400 -mt-1">
                  PREMIUM FRAGRANCES
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === location.pathname;

              const base = "flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-all duration-200";
              const classes = isActive
                ? `${base} bg-gold-500 text-black-950 shadow-md`
                : `${base} text-gold-300 hover:bg-gold-600 hover:text-black-950`;

              return (
                <Link key={item.name} to={item.href} className={classes}>
                  <Icon className="w-6 h-6" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gold-400 hover:bg-gold-600"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gold-500 bg-black-900/90 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === location.pathname;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors ${
                      isActive
                        ? "bg-gold-500 text-black-950"
                        : "text-gold-300 hover:bg-gold-600 hover:text-black-950"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
