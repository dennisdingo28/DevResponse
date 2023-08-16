import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend:{
      colors:{
        "darkBlue":"#0a0b19",
        "lightBlue":"#3e77ff",
        "darkishBlue":"#2d66ef",
        "softDarkBlue":"#14173b",
        "darkGray":"#f4f5f5",
        "blackGray":"#e0e0e0"
      },
    },
    fontFamily:{
      'poppins':['Poppins', 'sans-serif'],
      'roboto':['Roboto', 'sans-serif'],
    },
    screens: {
      'xs':'440px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
}
export default config
