import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xsm: '320px',
      sm: '375px',
      gsm: '410px',
      msm: '480px',
      ltm: '570px',
      lsm: '680px',
      md: '740px',
      lmd: '864px',
      dlg: '1024px',
      lg: '1199px',
      xl: '1280px',
      '1xl': '1367px',
      '2xl': '1536px', 
    },
    colors: {
      'pink': '#FF2351',
      'dark-grey': '#848484',
      'light-grey': '#DADADA',
      'light-yellow': '#FDC8444D',
      'bg-color': '#FAFAFA',
      'yellow': '#FDC844',
      'orange': '#FF6323',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
