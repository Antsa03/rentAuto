import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: "#154603",
        customGreenOpacity: "#678858",
        customGray: "#E8E8E8",
        customBlue: "#1E2833",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "routes-image": "url('/montagne.jpg')",
      },
      screens: {
        mobile: "360px",
        tablet: "769px",
        laptop: "1025px",
        desktop: "1367px",
        large: "1921px",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
