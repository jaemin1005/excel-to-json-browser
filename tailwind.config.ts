import { nextui } from "@nextui-org/theme";
import { transform } from "next/dist/build/swc";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|card|image|popover|progress|spinner|ripple).js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(180deg, rgb(121,9,69) 0%, rgb(104,37,95) 39%, rgb(2,0,36) 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        expandToOriginal: {
          "0%": { transform: "scaleY(0.01)", height: "2px" },
          "100%": { transform: "scaleY(1)", height: "100%" },
        },
        zoomin: {
          "0%": { transform: "scale(.5)" },
          "100%": { transform: "scale(1)" },
        },
        jiggle: {
          "0%": {
            transform: "rotate(-3deg)",
          },
          "50%": {
            transform: "rotate(3deg)",
          },
          "100%": {
            transform: "rotate(-3deg)",
          },
        },
      },
      animation: {
        "expand-to-original": "expandToOriginal 2s ease-in-out forwards",
        "zoom-in": "zoomin 0.6s ease-out",
        jiggle: "jiggle 0.5s ease-in-out",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
