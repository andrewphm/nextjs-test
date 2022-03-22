module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg1: '900px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'blue-btn': '#0095f6',
      },
      keyframes: {
        fade: {
          '0%': { opacity: 1 },
          '10%': { opacity: 0.5 },
          '15%': { opacity: 0 },
          '60%': { opacity: 0 },
          '100%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
