/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Gilroy', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        'gilroy': ['Gilroy', 'sans-serif'],
        'mazius': ['Mazius Extraitalic', 'serif'],
        'special': ['Mazius Extraitalic', 'serif'],
        'editorial': ['PP Editorial New', 'serif'],
        'playground': ['PP Playground', 'sans-serif'],
        'thunder': ['Thunder', 'sans-serif'],
        'display': ['Thunder', 'sans-serif'],
        'elegant': ['PP Editorial New', 'serif'],
        'modern': ['PP Playground', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
