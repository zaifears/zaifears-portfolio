/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(214.3 31.8% 91.4%)",
        input: "hsl(214.3 31.8% 91.4%)",
        ring: "hsl(221.2 83.2% 53.3%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(222.2 84% 4.9%)",
        primary: {
          DEFAULT: "hsl(221.2 83.2% 53.3%)",
          foreground: "hsl(210 40% 98%)",
        },
        secondary: {
          DEFAULT: "hsl(210 40% 96.1%)",
          foreground: "hsl(222.2 47.4% 11.2%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84.2% 60.2%)",
          foreground: "hsl(210 40% 98%)",
        },
        muted: {
          DEFAULT: "hsl(210 40% 96.1%)",
          foreground: "hsl(215.4 16.3% 46.9%)",
        },
        accent: {
          DEFAULT: "hsl(210 40% 96.1%)",
          foreground: "hsl(222.2 47.4% 11.2%)",
        },
        popover: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(222.2 84% 4.9%)",
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(222.2 84% 4.9%)",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      // Custom spacing extensions for Zakat Calculator fixed layout
      minWidth: {
        // min-w-190: 760px - table minimum width for CashBank/Debts/OtherAssets
        // min-w-275: 1100px - table minimum width for GoldSilver with 9 columns
        190: "760px",
        275: "1100px",
      },
      height: {
        // h-4.5: 18px - delete button SVG size
        // h-9.5: 38px - calendar/year selector button height
        "4.5": "18px",
        "9.5": "38px",
      },
      width: {
        // w-4.5: 18px - delete button SVG size
        "4.5": "18px",
      },
      margin: {
        // mt-0.5: 2px - banner icon vertical alignment
        "0.5": "2px",
      },
    },
  },
  plugins: [],
}
