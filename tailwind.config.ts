import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        heading: ['Eightgon', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          50: '#ECFFF5',
          100: '#C9FFE3',
          200: '#93FFC8',
          300: '#5BFFAC',
          400: '#2BFA8F',
          500: '#00E06A',
          600: '#00B956',
          700: '#009246',
          800: '#006E37',
          900: '#004F2B',
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--surface))",
          foreground: "hsl(var(--text-primary))",
        },
        destructive: {
          DEFAULT: "hsl(var(--negative))",
          foreground: "hsl(var(--text-primary))",
        },
        muted: {
          DEFAULT: "hsl(var(--surface-2))",
          foreground: "hsl(var(--text-muted))",
        },
        accent: {
          DEFAULT: '#00E06A',
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--surface))",
          foreground: "hsl(var(--text-primary))",
        },
        card: {
          DEFAULT: "hsl(var(--surface))",
          foreground: "hsl(var(--text-primary))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--bg))",
        },
        // Custom semantic tokens
        "text-primary": "hsl(var(--text-primary))",
        "text-secondary": "hsl(var(--text-secondary))",
        "text-muted": "hsl(var(--text-muted))",
        "accent-teal": "hsl(var(--accent-teal))",
        "accent-teal-700": "hsl(var(--accent-teal-700))",
        "surface": "hsl(var(--surface))",
        "surface-2": "hsl(var(--surface-2))",
        positive: "hsl(var(--positive))",
        negative: "hsl(var(--negative))",
      },
      borderRadius: {
        sm: "8px",
        md: "12px", 
        lg: "16px",
        xl: "20px",
        DEFAULT: "16px",
        "2xl": "24px",
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
        "fade-in": {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        "slide-up": {
          from: {
            transform: "translateY(10px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-accent": "linear-gradient(135deg, #00E06A, hsl(217 91% 60%))",
        "gradient-surface": "var(--gradient-surface)",
        "gradient-card": "var(--gradient-card)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
