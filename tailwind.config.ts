import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#121212",
                surface: "#1E1E1E",
                primary: "#A855F7", // Purple 500
                secondary: "#EC4899", // Pink 500
                accent: "#10B981", // Emerald 500
                text: {
                    primary: "#F3F4F6",
                    secondary: "#9CA3AF",
                    muted: "#6B7280"
                }
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
