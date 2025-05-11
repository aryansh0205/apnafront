import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    
  ],
    theme: {
      screens: {
        pn: '0px',
        vs: '200px',
        ss: '360px',
        pp: '500px',
        sm: '821px',
        md: '1180px',
        lg: '1440px',
        xl: '1536px',
        xxl: '1900px'
      },
    extend: {
      colors: {
        primary: '#1E3A8A',
        secondary: '#F97316',
        accent: '#10B981',
        background: '#F9FAFB',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },

    },
  },
  plugins: [],
} satisfies Config;
