import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        gold: {
          50: "#fffef7",
          100: "#fefce8",
          200: "#fef7cd",
          300: "#fdf0a7",
          400: "#fce67d",
          500: "#fdd835",
          600: "#f9ca24",
          700: "#f0932b",
          800: "#eb6f47",
          900: "#e55039",
        },
        black: {
          50: "#f7f7f7",
          100: "#e1e1e1",
          200: "#cfcfcf",
          300: "#b1b1b1",
          400: "#9e9e9e",
          500: "#7e7e7e",
          600: "#626262",
          700: "#515151",
          800: "#3b3b3b",
          900: "#222222",
          950: "#0a0a0a",
        },
        cream: {
          50: "#fefdfb",
          100: "#fdf8f6",
          200: "#f7f0ed",
          300: "#f0e6e0",
          400: "#e8d5cc",
          500: "#dfc4b8",
          600: "#d4b3a4",
          700: "#c8a290",
          800: "#bc917c",
          900: "#b08068",
        },
        copper: {
          50: "#fdf6f0",
          100: "#fbebd6",
          200: "#f6d5ae",
          300: "#f0bb7a",
          400: "#ea9c44",
          500: "#e6861f",
          600: "#d97415",
          700: "#b55d13",
          800: "#924a17",
          900: "#773d16",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-200% 0",
          },
          "100%": {
            backgroundPosition: "200% 0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
