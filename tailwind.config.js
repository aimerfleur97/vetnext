/** @type {import('tailwindcss').Config} */
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: "#3053a3",
      secondary: "#EDBD43",
      lightBlue: '#8f8be8',
      blue: "#4F46E5",
      grayNew: "#e8e8e8",
      gray:{
        50: "#d3d3d3",
        100: "#989898",
        200: "#909090",
        300: "#888888",
        400: "#1F293A",
        500: "#787878",
        600: "#707070",
        700: "#324055",
        800: "#1F293A",
        900: "#0E172B",
      },
      emerald:{
        100: "#ffffff",
        200: "#ffffff",
        300: "#ffffff",
        400: "#ffffff",
        500: "#ffffff",
        600: "#ffffff",
        700: "#ffffff",
        800: "#ffffff",
        900: "#ffffff",
      },
      white:'#ffffff',
      red: {
        100: '#f77e7e',
        200: '#ff5b5b',
        500:'#FF0000'
      },
      green: {
        200: '#5fa54f',
      },
      midnight: "#ffffff",
      black:'#000000',
      light_black:"#333333",
      gray_dark: "#3A3A3A",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
    },
  },
  plugins: ["inline-react-svg"],
};
