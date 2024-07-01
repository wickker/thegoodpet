/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0D6326',
        secondary: '#14433D',
        background: '#FFF7E5',
      },
      fontFamily: {
        fredoka: ['"Fredoka"', ...defaultTheme.fontFamily.sans],
        inter: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
