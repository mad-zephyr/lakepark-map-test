import localFont from "next/font/local";

export const SanFranciscoPro = localFont({
  variable: "--font-base",
  fallback: ["Helvetica", "Arial", "sans-serif"],
  src: [
    {
      path: "./SF-Pro/SFProText-Light.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "./SF-Pro/SFProText-Regular.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./SF-Pro/SFProText-Medium.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./SF-Pro/SFProText-Semibold.woff",
      weight: "500",
      style: "normal",
    },
  ],
});

export const UnboundedFont = localFont({
  variable: "--font-accent",
  fallback: ["Helvetica", "Arial", "sans-serif"],
  src: [
    {
      path: "./Unbounded/Unbounded-VariableFont_wght.woff2",
      style: "normal",
    },
  ],
});
