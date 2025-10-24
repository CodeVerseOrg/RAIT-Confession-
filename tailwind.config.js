module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(0, 0%, 90%)",
        input: "hsl(0, 0%, 90%)",
        ring: "hsl(220, 85%, 56%)",
        background: "hsl(0, 0%, 98%)",
        foreground: "hsl(220, 15%, 20%)",
        primary: {
          DEFAULT: "hsl(220, 85%, 56%)",
          foreground: "hsl(0, 0%, 98%)",
        },
        secondary: {
          DEFAULT: "hsl(220, 85%, 65%)",
          foreground: "hsl(0, 0%, 10%)",
        },
        tertiary: {
          DEFAULT: "hsl(10, 75%, 65%)",
          foreground: "hsl(0, 0%, 98%)",
        },
        neutral: {
          DEFAULT: "hsl(0, 0%, 98%)",
          foreground: "hsl(220, 15%, 20%)",
        },
        success: "hsl(145, 58%, 46%)",
        warning: "hsl(35, 92%, 58%)",
        destructive: {
          DEFAULT: "hsl(0, 84%, 60%)",
          foreground: "hsl(0, 0%, 98%)",
        },
        muted: {
          DEFAULT: "hsl(0, 0%, 96%)",
          foreground: "hsl(0, 0%, 38%)",
        },
        accent: {
          DEFAULT: "hsl(0, 0%, 96%)",
          foreground: "hsl(220, 15%, 20%)",
        },
        popover: {
          DEFAULT: "hsl(0, 0%, 98%)",
          foreground: "hsl(220, 15%, 20%)",
        },
        card: {
          DEFAULT: "hsl(0, 0%, 98%)",
          foreground: "hsl(220, 15%, 20%)",
        },
        gray: {
          50: "hsl(0, 0%, 99%)",
          100: "hsl(0, 0%, 96%)",
          200: "hsl(0, 0%, 90%)",
          300: "hsl(0, 0%, 80%)",
          400: "hsl(0, 0%, 65%)",
          500: "hsl(0, 0%, 50%)",
          600: "hsl(0, 0%, 38%)",
          700: "hsl(0, 0%, 25%)",
          800: "hsl(0, 0%, 15%)",
          900: "hsl(0, 0%, 8%)",
        },
      },
      fontFamily: {
        sans: ['"Nunito Sans"', 'sans-serif'],
        headline: ['Poppins', 'sans-serif'],
        label: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        lg: "12px",
        md: "10px",
        sm: "8px",
      },
      spacing: {
        '4': '1rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
        '48': '12rem',
        '64': '16rem',
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(135deg, hsl(220, 85%, 56%) 0%, hsl(220, 85%, 65%) 100%)',
        'gradient-2': 'linear-gradient(135deg, hsl(10, 75%, 65%) 0%, hsl(340, 82%, 60%) 100%)',
        'button-border-gradient': 'linear-gradient(90deg, hsla(220, 85%, 56%, 0.8), hsla(10, 75%, 65%, 0.8))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
